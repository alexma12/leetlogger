import createError from "http-errors"

import middleware from "../../libs/middleware"
import dynamoDB from "../../libs/dynamoDB-lib";

async function handler(event, context) {

    let updateExpression;
    let expressionAttributeValues;

    if (event.body.revisionDate && event.body.revisionDate !== -1) {
        updateExpression = "SET entryCount = entryCount"
        expressionAttributeValues = {
            ":incr": 1
        }
    } else {
        updateExpression = "SET entryCount = entryCount + :incr, revisionDate = :revisionDate"
        expressionAttributeValues = {
            ":incr": 1,
            ":revisionDate": event.body.revisionDate
        }
    }

    const params = {
        TableName: process.env.questionTable,
        Key: {
            userID: "123",
            questionID: event.pathParameters.questionId
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW"
    }

    let updatedEntry

    try {
        updatedEntry = await dynamoDB.update(params);
    } catch {
        throw new createError.InternalServerError("Error occured when updating your question")
    }

    return {
        status: 200,
        body: updatedEntry
    }
};

export const main = middleware(handler)