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
        await dynamoDB.query(params)
    } catch {
        throw new createError.InternalServerError("Error occured when querying for your revision questions")
    }

    return {
        status: 200,
        body: questions.Items
    }
};

export const main = middleware(handler);