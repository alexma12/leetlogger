import createError from "http-errors";

import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamodb-lib";
import { twoDaysAgo } from "../../libs/timestamp-helpers-lib";

async function handler(event, context) {
  const twoDaysPrior = twoDaysAgo();
  const params = {
    TableName: process.env.entryTable,
    IndexName: "userID-submittedAt-index",
    KeyConditionExpression: "userID = :userID and submittedAt >= :twoDaysPrior",
    ExpressionAttributeValues: {
      ":userID": "123",
      ":twoDaysPrior": twoDaysPrior,
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
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
}

export const main = middleware(handler);
