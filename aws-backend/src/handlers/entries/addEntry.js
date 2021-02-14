import * as uuid from "uuid";
import createError from "http-errors";
import validator from "@middy/validator";

import sns from "../../libs/sns-lib";
import schema from "../../libs/schema/addEntryValidator";
import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamoDB-lib";
import { convertEntryToDBStruct } from "../../libs/helpers-lib";

async function handler(event, context) {
  const {
    title,
    questionType,
    tags,
    approxCompletionMins,
    difficulty,
    content,
    revisionDate,
  } = convertEntryToDBStruct(event.body);

  const entryID = uuid.v4();

  const dbParams = {
    TableName: process.env.entryTable,
    Item: {
      userID: "123",
      entryID: entryID,
      title,
      questionType,
      submittedAt: Date.now(),
      tags: tags || [],
      revisionDate,
      approxCompletionMins,
      difficulty,
    },
  };

  try {
    const put = dynamoDB.put(dbParams);

    const snsItem = dbParams.Item;
    snsItem["content"] = content;

    const snsPublish = sns.publish(
      JSON.stringify(snsItem),
      process.env.addEntryTopicArn
    );

    await Promise.all([put, snsPublish]);
  } catch (error) {
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 201,
    body: JSON.stringify(dbParams.Item),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
}

export const main = middleware(handler).use(validator({ inputSchema: schema }));
