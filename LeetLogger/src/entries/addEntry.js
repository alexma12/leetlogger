import dynamoDB from "../../libs/dynamoDB-lib";
import s3 from "../../libs/s3-lib";
import handler from "../../libs/handler-lib";
import {convertEntryToDBStruct} from "../../libs/helpers-lib";
import {currentDateString} from "../../libs/timestamp-helpers-lib"
import * as uuid from "uuid";

export const main = handler(async (event, context) => {
    const data = convertEntryToDBStruct(event.body);
    const entryID = uuid.v4();
    const currentDate = currentDateString();

    const dbParams = { 
        TableName: process.env.entryTable,
        Item: {
            userID: "123",
            entryID: entryID,
            title: data.title,
            questionType: data.questionType,
            submittedAt: Date.now(),
            tags: data.tags || [],
            approxCompletionMins: data.approxCompletionMins,
            difficulty: data.difficulty,
        }
    }
    await dynamoDB.put(dbParams);


    const s3GetParams = {
        Bucket: process.env.s3BucketName,
        Key: "123"
    }

    const s3JsonData = {
        entryID: entryID,
        noteTitle: "Entry -  " + currentDate,
        lastUpdated: currentDate,
        title: data.title,
        content: data.content
    }

    const addedJsonData = await addToS3JsonData(s3GetParams, s3JsonData); 

    const s3UploadParams = {
        Bucket: process.env.s3BucketName,
        Key: "123",
        Body: JSON.stringify(addedJsonData)
    }
    await s3.upload(s3UploadParams);


    return {...dbParams.Item} 
});


const addToS3JsonData = async (s3GetParams, s3JsonData) => {
    const s3Obj = await s3.get(s3GetParams);
    const jsonData = JSON.parse(s3Obj.Body.toString());
    const index = jsonData.length;
    s3JsonData["index"] = index;
    jsonData.push(s3JsonData);
    return jsonData
}