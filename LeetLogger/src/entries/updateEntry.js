import dynamoDB from "../../libs/dynamoDB-lib";
import handler from "../../libs/handler-lib";
import s3 from "../../libs/s3-lib";
import { convertEntryToDBStruct } from "../../libs/structural-helpers-lib"

export const main = handler(async (event, context) => {
    const data = convertEntryToDBStruct(event.body);
    const currentDate = Date.now().toDateString();
    const params = {
        TableName: process.env.entryTable,
        Key: {
            userID: "123",
            entryID: event.pathParameters.entryId,
        },
        UpdateExpression: "SET approxCompletionMins = :completion, tags = :tags,  difficulty = :difficult, lastUpdated = :lastUpdated",
        ExpressionAttributeValues: {
            ":tags": data.tags || null,
            ":completion": data.approxCompletionMins || null,
            ":difficulty": data.difficulty || null,
            ":lastUpdated": currentDate
        },
        ReturnValues: "ALL_NEW"
    }
    const updatedEntry = await dynamoDB.update(params);
    const s3Params = { 
        Bucket: process.env.s3BucketName,
        Key: data.noteID,
        Body: {
            content: data.content
        }
    }
    await s3.put(s3Params);
    return updatedEntry;
});