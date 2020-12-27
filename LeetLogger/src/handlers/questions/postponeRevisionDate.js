import createError from "http-errors";

import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamoDB-lib"
import {calculatePostponedRevisionDate} from "../../libs/timestamp-helpers-lib"

async function handler(event, context) {
    const {timeDelay, revisionDate} = event.body;
    if(data.revisionDate === -1){
        throw new Error("This question does not have a revision date set")
    }
    const postponedDate = calculatePostponedRevisionDate(timeDelay, revisionDate)
    const params = {
        TableName: process.env.questionTable,
        Key: {
            userID: "123",
            questionID: event.pathParameters.questionId,
        },
        UpdateExpression: "SET revisionDate = :postponedDate",
        ExpressionAttributeValues: {
            ":postponedDate": postponedDate
        },
        ReturnValues: "ALL_NEW"
    }
    let updatedQuestion; 
    try {
        updateQuestion =  await dynamoDB.update(params)
    } catch {
        throw new createError.InternalServerError("Error occured when updating your question");
    }
    return {
        status: 200,
        body: updatedQuestion
    }
}; 

export const main = middleware(handler)
