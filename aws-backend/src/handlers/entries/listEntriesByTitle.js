import createError from "http-errors";

import validator from "@middy/validator";
import schema from "../../libs/schema/listEntriesByTitleValidator";
import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamodb-lib";

async function handler(event, context) {
  const { title } = event.queryStringParameters;

  const params = {
    TableName: process.env.entryTable,
    IndexName: "userID-title-index",
    KeyConditionExpression: "userID = :userID and title = :title",
    ExpressionAttributeValues: {
      ":userID": "123",
      ":title": decodeURIComponent(title),
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

export const main = middleware(handler).use(validator({ inputSchema: schema }));
