import createError from "http-errors";

import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamodb-lib";

async function handler(event, context){

    const params = {
        TableName: process.env.questionTable,
        IndexName: "userID-revisionDate-index",
        KeyConditionExpression: "userID = :userID and revisionDate >= :zero",
        ExpressionAttributeValues: {
            ":userID": "123",
            ":zero": 0
        },
    }
    let questions;
    try { 
        questions = await dynamoDB.query(params)
    } catch(error) {
        throw new createError.InternalServerError(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(questions.Items)
    }
};

export const main = middleware(handler);