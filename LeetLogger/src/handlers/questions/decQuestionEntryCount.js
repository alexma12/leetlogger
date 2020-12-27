import createError from "http-errors";

import middleware from "../../libs/middleware"
import dynamoDB from "../../libs/dynamoDB-lib";

async function handler(event, context) {

    const params = {
        TableName: process.env.questionTable,
        Key: {
            userID: "123",
            questionID: event.pathParameters.questionId
        },
        UpdateExpression: "SET entryCount = entryCount - :decr",
        ExpressionAttributeValues: {
            ":decr": 1
        },
        ReturnValues: "ALL_NEW"

    }
    let updatedEntry;

    try {
    updatedEntry = await dynamoDB.update(params);
    } catch {
        throw new createError.InternalServerError("Error occured when creating your a question");
    }
    return {
        status: 200,
        body: updatedEntry
    }
}; 

export const main = middleware(handler)