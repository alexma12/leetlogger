import createError from "http-errors";

import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamodb-lib";

async function handler(event, context) {

    const {title} = event.queryStringParameters

    const params = {
        TableName: process.env.entryTable,
        IndexName: "userID-title-index",
        KeyConditionExpression: "userID = :userID and title = :title",
        ExpressionAttributeValues: {
           ":userID": "123",
           ":title": decodeURIComponent(title)
        },
    }
    let entries
    try {
        entries = await dynamoDB.query(params);
    } catch {
        throw new createError.InternalServerError("Error occured when querying for your entries");
    }
    return {
        status: 200,
        body: entries.Items
    }
};

export const main = middleware(handler)