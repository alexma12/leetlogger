import * as uuid from "uuid";
import createError from "http-errors";
import validator from "@middy/validator";

import dynamoDB from "../../libs/dynamoDB-lib";
import middleware from "../../libs/middleware";


async function handler(event, context) {
    const {title, revisionDate, difficulty } = event.body;
    
    const params = { 
        TableName: process.env.questionTable,
        Item: {
            userID: "123",
            questionID: uuid.v4(),
            title,
            questionType,
            revisionDate: revisionDate || -1,
            difficulty,
            entryCount: 1
        }
    }

    try {
        await dynamoDB.put(params);
    } catch {
        throw new createError.InternalServerError("Error occured when creating your a question");
    }

    return { 
        status: 201,
        body: params.Item
    }
};

export const main = middleware(handler)