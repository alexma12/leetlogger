import createError from "http-errors";
import validator from "@middy/validator";

import schema from "../../libs/schema/revisionDateShiftingValidator";
import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamoDB-lib";
import { calculatePostponedRevisionDate } from "../../libs/timestamp-helpers-lib";

async function handler(event, context) {
  const { timeDelay, revisionDate } = event.body;
  if (revisionDate === -1) {
    throw new Error("This question does not have a revision date set");
  }
  const postponedDate = calculatePostponedRevisionDate(timeDelay, revisionDate);

  const params = {
    TableName: process.env.questionTable,
    Key: {
      userID: "123",
      questionID: event.pathParameters.questionId,
    },
    UpdateExpression: "SET revisionDate = :postponedDate",
    ExpressionAttributeValues: {
      ":postponedDate": postponedDate,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await dynamoDB.update(params);
  } catch {
    throw new createError.InternalServerError(
      "Error occurred when updating your question"
    );
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      postponed: timeDelay,
    }),
  };
}

export const main = middleware(handler).use(validator({ inputSchema: schema }));
