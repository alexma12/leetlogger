import * as uuid from "uuid";
import createError from "http-errors";
import validator from "@middy/validator"

import sns from "../../libs/sns-lib"
import schema from "../../libs/schema/addEntryValidator";
import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamoDB-lib";
import s3 from "../../libs/s3-lib";
import { convertEntryToDBStruct } from "../../libs/helpers-lib";
import { currentDateString } from "../../libs/timestamp-helpers-lib"


const addToS3JsonData = async (s3GetParams, s3JsonData) => {
    const s3Obj = await s3.get(s3GetParams);
    const jsonData = JSON.parse(s3Obj.Body.toString());
    const index = jsonData.length;
    s3JsonData["index"] = index;
    jsonData.push(s3JsonData);
    return jsonData
}


async function handler(event, context) {
    const { title, questionType, tags, approxCompletionMins, difficulty, content, revisionDate} = convertEntryToDBStruct(event.body);
    const entryID = uuid.v4();
    const currentDate = currentDateString();

    const dbParams = {
        TableName: process.env.entryTable,
        Item: {
            userID: "123",
            entryID: entryID,
            title,
            questionType,
            submittedAt: Date.now(),
            tags: tags || [],
            revisionDate,
            approxCompletionMins,
            difficulty,
        }
    }

    try {
        const put =  dynamoDB.put(dbParams);
        const s3GetParams = {
            Bucket: process.env.s3BucketName,
            Key: "123"
        }

        const s3JsonData = {
            entryID: entryID,
            noteTitle: "Entry -  " + currentDate,
            lastUpdated: currentDate,
            title,
            content
        }

        const addedJsonData = await addToS3JsonData(s3GetParams, s3JsonData);

        const s3UploadParams = {
            Bucket: process.env.s3BucketName,
            Key: "123",
            Body: JSON.stringify(addedJsonData)
        }
        const update = s3.upload(s3UploadParams);

        const snsPublish = sns.publish(JSON.stringify(dbParams.Item), process.env.addEntryTopicArn)
        
        await Promise.all([update, put, snsPublish])

    } catch(error) {
        throw new createError.InternalServerError(error);
    }
    return {
        statusCode: 201,
        body: JSON.stringify(dbParams.Item),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          }
    }
};

export const main = middleware(handler)
.use(validator({inputSchema: schema}))