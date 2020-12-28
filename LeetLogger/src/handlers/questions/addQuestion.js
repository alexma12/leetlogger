import * as uuid from "uuid";
import createError from "http-errors";

import {convertArrayToString} from "../../libs/helpers-lib"
import queryQuestionByTitle from "../../libs/queryQuestionByTitle"
import dynamoDB from "../../libs/dynamoDB-lib";
import middleware from "../../libs/middleware";


async function handler(event, context) {

    const entry  = event.Records[0].Sns.Message;
    const {title, revisionDate, questionType, difficulty} = JSON.parse(entry)
    let question;
    try {
         question = await queryQuestionByTitle("123", title , process.env.questionTable)
        if (question !== null) {
            const { questionID } = question;
            let updateExpression; 
            let expressionAttributeValues;

            if (!revisionDate && revisionDate !== -1) {
                updateExpression = "SET entryCount = entryCount + :incr"
                expressionAttributeValues = {
                    ":incr": 1
                }
            } else {
                updateExpression = "SET entryCount = entryCount + :incr, revisionDate = :revisionDate"
                expressionAttributeValues = {
                    ":incr": 1,
                    ":revisionDate": revisionDate
                }
            }

            const params = {
                TableName: process.env.questionTable,
                Key: {
                    userID: "123",
                    questionID: questionID
                },
                UpdateExpression: updateExpression,
                ExpressionAttributeValues: expressionAttributeValues,
            }

            await dynamoDB.update(params);
        } else {

            const params = {
                TableName: process.env.questionTable,
                Item: {
                    userID: "123",
                    questionID: uuid.v4(),
                    title,
                    questionType: convertArrayToString(questionType),
                    revisionDate: revisionDate || -1,
                    difficulty,
                    entryCount: 1
                }
            }

            await dynamoDB.put(params);
        
        }
    } catch(error) {
        throw new createError.InternalServerError(error);
    }

    return true;
};

export const main = middleware(handler)