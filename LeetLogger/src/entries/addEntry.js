import dynamoDB from "../../libs/dynamoDB-lib";
import s3 from "../../libs/s3-lib";
import handler from "../../libs/handler-lib";
import {convertEntryToDBStruct, generateNoteId} from "../../libs/helpers-lib";
import {currentDateString} from "../../libs/timestamp-helpers-lib"
import * as uuid from "uuid";

export const main = handler(async (event, context) => {
    const data = convertEntryToDBStruct(event.body);
    const noteID = generateNoteId("123", data.title, uuid.v4());
    const entryID = uuid.v4();
    const currentDate = currentDateString();
    
    //generate noteID 
    //currentDateString

    const dbParams = { 
        TableName: process.env.entryTable,
        Item: {
            userID: "123",
            entryID: entryID,
            title: data.title,
            questionType: data.type,
            submittedAt: Date.now(),
            tags: data.tags || [],
            approxCompletionMins: data.approxCompletionMins,
            difficulty: data.difficulty,
            noteTitle: "Entry -  " + currentDate,
            lastUpdated: currentDate,
        }
    }
    await dynamoDB.put(dbParams);

    const s3JsonData = {
        title: data.title,
        content: data.content
    }

    const s3Params = { 
        Bucket: process.env.s3BucketName,
        Key: entryID,
        Body: JSON.stringify(s3JsonData)
    }
    await s3.put(s3Params);
    return {...dbParams.Item} 
});