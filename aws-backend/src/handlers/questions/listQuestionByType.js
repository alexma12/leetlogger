import createError from "http-errors";
import validator from "@middy/validator";

import schema from "../../libs/schema/listQuestionByTypeValidator";
import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamodb-lib";

async function handler(event, context) {
  const params = {
    TableName: process.env.questionTable,
    IndexName: "userID-questionType-index",
    KeyConditionExpression: "userID = :userID and questionType = :questionType",
    ExpressionAttributeValues: {
      ":userID": "123",
      ":questionType": event.pathParameters.questionType,
    },
  };
  console.log(event);
  let questions;

  try {
    questions = await dynamoDB.query(params);
  } catch (e) {
    console.log(e);
    throw new createError.InternalServerError(JSON.stringify(e));
  }

  return {
    statusCode: 200,
    body: JSON.stringify(questions.Items),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
}

export const main = middleware(handler);
