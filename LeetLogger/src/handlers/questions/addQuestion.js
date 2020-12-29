import * as uuid from "uuid";
import createError from "http-errors";

import { convertArrayToString } from "../../libs/helpers-lib"
import queryQuestionByTitle from "../../libs/queryQuestionByTitle"
import dynamoDB from "../../libs/dynamoDB-lib";
import middleware from "../../libs/middleware";
import { currentDateString } from "../../libs/timestamp-helpers-lib"
import s3 from "../../libs/s3-lib";



const addToS3JsonData = async (s3GetParams, s3JsonData) => {
    const s3Obj = await s3.get(s3GetParams);
    const jsonData = JSON.parse(s3Obj.Body.toString());
    jsonData.push(s3JsonData);
    return jsonData
}


async function handler(event, context) {

    const entry = event.Records[0].Sns.Message;
    const { title, revisionDate, questionType, difficulty, entryID, content } = JSON.parse(entry)
    try {
        const question = await queryQuestionByTitle("123", title, process.env.questionTable)
        if (question !== null) {
            const { questionID } = question;
            const bucketKey = "123" + "-" + questionID
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

            const dbUpdate = dynamoDB.update(params);

            const s3GetParams = {
                Bucket: process.env.s3BucketName,
                Key: bucketKey
            }

            const s3JsonData = {
                entryID,
                title: title + " -  " + currentDateString(),
                content,
                lastUpdated: currentDateString()
            }

            const addedJsonData = await addToS3JsonData(s3GetParams, s3JsonData);

            const s3UploadParams = {
                Bucket: process.env.s3BucketName,
                Key: bucketKey,
                Body: JSON.stringify(addedJsonData)
            }
            const s3Update = s3.upload(s3UploadParams);
            
            await Promise.all([dbUpdate,s3Update])

        } else {

            const questionID = uuid.v4()

            const params = {
                TableName: process.env.questionTable,
                Item: {
                    userID: "123",
                    questionID,
                    title,
                    questionType: convertArrayToString(questionType),
                    revisionDate: revisionDate || -1,
                    difficulty,
                    entryCount: 1
                }
            }

            const dbPut = dynamoDB.put(params);
            const s3Object = {
                entryID,
                title: title + " -  " + currentDateString(),
                content,
                lastUpdated: -1
            }
            const s3Params = {
                Bucket: process.env.s3BucketName,
                Key: "123" + "-" + questionID,
                Body: JSON.stringify([s3Object])
            }

            const s3Put = s3.put(s3Params);

            await Promise.all([s3Put, dbPut])

        }
    } catch (error) {
        throw new createError.InternalServerError(error);
    }

    return true;
};

export const main = middleware(handler)