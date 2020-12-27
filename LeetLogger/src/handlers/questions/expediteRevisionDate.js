import createError from "http-errors"
import validator from "@middy/validator";

import schema from "../../libs/schema/revisionDateShiftingValidator";
import middleware from "../../libs/middleware"
import dynamoDB from "../../libs/dynamoDB-lib"
import { calculateExpeditedRevisionDate } from "../../libs/timestamp-helpers-lib";

async function handler(event, context) {
    const {timeDelay, revisionDate} = event.body;

    if (data.revisionDate === -1) {
        throw new createError.Forbidden("This question does not have a revision date set")
    }
    const expeditedDate = calculateExpeditedRevisionDate(timeDelay, revisionDate);
    const params = {
        TableName: process.env.questionTable,
        Key: {
            userID: "123",
            questionID: event.pathParameters.questionId,
        },
        UpdateExpression: "SET revisionDate = :expeditedDate",
        ExpressionAttributeValues: {
            ":expeditedDate": expeditedDate.revisionDate,
        },
    }

    try {
        await dynamoDB.update(params);
    } catch {
        throw new createError.InternalServerError();
    }
    return {
        status: 200,
        body: expeditedDate
    }
};

export const main = middleware(handler)
    .use(validator({inputSchema: schema}))