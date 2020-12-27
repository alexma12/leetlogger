import createError from "http-errors";

import middleware from "@middy/validator";
import dynamoDB from "../../libs/dynamoDB-lib";


async function handler(event, context) {
    const params = {
        TableName: process.env.entryTable,
        Key: {
            userID: "123",
            entryID: event.pathParameters.entryId
        }
    }
    let entry

    try {
        entry = await dynamoDB.get(params);
    } catch {
        throw new createError.InternalServerError("Error occured when getting your entry");
    }
    if (!entry.Item) {
        throw new createError.NotFound()
    }
    return {
        status: 200,
        body: entry.Item
    }
};

export const main = middleware(handler);
