import createError from "http-errors"

import queryQuestionByTitle from "../../libs/queryQuestionByTitle"
import middleware from "../../libs/middleware"
import dynamoDB from "../../libs/dynamoDB-lib";

async function handler(event, context) {
    const deletedEntry = event.Records[0].Sns.Message
    const {title} = JSON.parse(deletedEntry);

    try {
        const question = await queryQuestionByTitle("123", title, process.env.questionTable)
        if (!question) {
            throw new createError.NotFound();
        }


        if (question.entryCount !== 1) {
            const params = {
                TableName: process.env.questionTable,
                Key: {
                    userID: "123",
                    questionID: question.questionID
                },
                UpdateExpression: "SET entryCount = entryCount - :decr",
                ExpressionAttributeValues: {
                    ":decr": 1
                },
            }
            await dynamoDB.update(params);

        } else {
            const params = {
                TableName: process.env.questionTable,
                Key: {
                    userID: "123",
                    questionID: question.questionID
                },
                ReturnValues: "ALL_OLD"
            }

            await dynamoDB.delete(params);
        }
    } catch(error) {
        throw new createError.InternalServerError(error);
    }

    return true

};

export const main = middleware(handler);


