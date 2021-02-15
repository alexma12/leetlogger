import createError from "http-errors";

import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamodb-lib";

async function handler(event, context) {
  const params = {
    TableName: process.env.entryTable,
    IndexName: "userID-submittedAt-index",
    KeyConditionExpression: "userID = :userID",
    ExpressionAttributeValues: {
      ":userID": "123",
    },
    ScanIndexForward: false,
  };
  let entries;
  try {
    entries = await dynamoDB.query(params);
  } catch {
    throw new createError.InternalServerError(
      "Error occured when querying for your entries"
    );
  }
  return {
    statusCode: 200,
    body: JSON.stringify(entries.Items),
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
}

export const main = middleware(handler);
