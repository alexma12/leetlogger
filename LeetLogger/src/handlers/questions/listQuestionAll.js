import createError from "http-errors";

import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamodb-lib";

async function handler(event, context) {
    const params = {
        TableName: process.env.questionTable,
        KeyConditionExpression: "userID = :userID",
        ExpressionAttributeValues: {
            ":userID": "123"
        },
    }
    let questions;

    try {
        questions = await dynamoDB.query(params);
    } catch {
        throw new createError.InternalServerError("Error occcured when getting all questions")
    }

    return {
        statusCode: 200, 
        body: JSON.stringify(questions.Items)
    }
};

export const main = middleware(handler);