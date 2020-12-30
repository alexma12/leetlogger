import createError from "http-errors";

import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamodb-lib";

async function handler(event, context) {
  const params = {
    TableName: process.env.entryTable,
    KeyConditionExpression: "userID = :userID",
    ExpressionAttributeValues: {
      ":userID": "123",
    },
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
  };
}

export const main = middleware(handler);
