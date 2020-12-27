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
    let question;

    try {
        question = await dynamoDB.query(params);
    } catch {
        throw new createError.InternalServerError("Error occcured when getting all questions")
    }

    return {
        status: 200, 
        body: questions.Items
    }
};

export const main = middleware(handler);