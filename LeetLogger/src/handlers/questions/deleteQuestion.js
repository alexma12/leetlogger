import createError from "http-errors"

import middleware from "../../libs/middleware"
import dynamoDB from "../../libs/dynamoDB-lib";

async function handler(event, context) {
    const params = {
        TableName: process.env.questionTable,
        Key: {
            userID: "123",
            questionID: event.pathParameters.questionId
        },
        ReturnValues: "ALL_OLD"
    }
    let deletedQuestion 
    
    try {    
        await dynamoDB.delete(params);
    } catch { 
        throw new createError.InternalServerError();
    }

    if(!deletedQuestion){
        throw new createError.NotFound();
    }

    return {
        status: 200,
        body: deletedQuestion
    }
    
};

export const main = middleware(handler);


