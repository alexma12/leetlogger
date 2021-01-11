import createError from "http-errors";

import sns from "../../libs/sns-lib";
import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamoDB-lib";
import { isEmptyObject } from "../../libs/helpers-lib";

async function handler(event, context) {
  const params = {
    TableName: process.env.entryTable,
    Key: {
      userID: "123",
      entryID: event.pathParameters.entryId,
    },
    ReturnValues: "ALL_OLD",
  };

  let deletedEntry;

  try {
    deletedEntry = await dynamoDB.delete(params);

    await sns.publish(
      JSON.stringify(deletedEntry.Attributes),
      process.env.deleteEntryTopicArn
    );
  } catch (error) {
    throw new createError.InternalServerError(error);
  }

  if (isEmptyObject(deletedEntry.Attributes)) {
    throw new createError.NotFound();
  }

  return {
    statusCode: 200,
    body: JSON.stringify(deletedEntry.Attributes),
  };
}

export const main = middleware(handler);
