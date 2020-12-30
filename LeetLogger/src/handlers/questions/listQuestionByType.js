import createError from "http-errors";
import validator from "@middy/validator";

import schema from "../../libs/schema/listQuestionByTypeValidator";
import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamodb-lib";

async function handler(event, context) {
  const params = {
    TableName: process.env.questionTable,
    KeyConditionExpression: "userID = :userID",
    FilterExpression: "contains(questionType, :type)",
    ExpressionAttributeValues: {
      ":userID": "123",
      ":type": event.queryStringParameters.questionType,
    },
  };
  let questions;

  try {
    questions = await dynamoDB.query(params);
  } catch {
    throw new createError.InternalServerError(
      "Error occurred when querying for your questions"
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify(questions.Items),
  };
}

export const main = middleware(handler).use(validator({ inputSchema: schema }));
