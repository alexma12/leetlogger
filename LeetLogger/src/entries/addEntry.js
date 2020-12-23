import dynamoDB from "../../libs/dynamoDB-lib";
import s3 from "../../libs/s3-lib";
import handler from "../../libs/handler-lib";
import {convertEntryToDBStruct} from "../../libs/structural-helpers-lib";
import * as uuid from "uuid";

export const main = handler(async (event, context) => {
    const data = convertEntryToDBStruct(event.body);
    const noteID = "123-" + data.title;
    const currentDate = Date.now().toDateString();
    const entryID = uuid.v4();

    const dbParams = { 
        TableName: process.env.entryTable,
        Item: {
            userID: "123",
            entryID: entryID,
            title: data.title,
            questionType: data.type,
            submittedAt: Date.now(),
            tags: data.tags,
            approxCompletionMins: data.approxCompletionMins,
            difficulty: data.difficulty,
            noteID: noteID,
            noteTitle: "Entry -  " + currentDate,
            lastUpdated: currentDate,
        }
    }
    await dynamoDB.put(dbParams);
    const s3Params = { 
        Bucket: process.env.s3BucketName,
        Key: noteID,
        Body: {
            entryID: entryID,
            content: data.content,
        }
    }
    await s3.put(s3Params);
    return {...dbParams.Item, ...s3Params.Body} 
});