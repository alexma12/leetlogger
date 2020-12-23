import dynamoDB from "../../libs/dynamoDB-lib";
import handler from "../../libs/handler-lib";
import s3 from "../../libs/s3-lib";
import { convertEntryToDBStruct } from "../../libs/helpers-lib"
import { currentDateString } from "../../libs/timestamp-helpers-lib"

export const main = handler(async (event, context) => {
    const data = convertEntryToDBStruct(event.body);
    const currentDate = currentDateString();
    const params = {
        TableName: process.env.entryTable,
        Key: {
            userID: "123",
            entryID: event.pathParameters.entryId,
        },
        UpdateExpression: "SET approxCompletionMins = :completion, tags = :tags,  difficulty = :difficulty, lastUpdated = :lastUpdated",
        ExpressionAttributeValues: {
            ":tags": data.tags || [],
            ":completion": data.approxCompletionMins || 0,
            ":difficulty": data.difficulty || "",
            ":lastUpdated": currentDate
        },
        ReturnValues: "ALL_NEW"
    }
    const updatedEntry = await dynamoDB.update(params);
    const s3JsonData = {
        title: data.title,
        content: data.content
    }
    const s3Params = { 
        Bucket: process.env.s3BucketName,
        Key: event.pathParameters.entryId,
        Body: JSON.stringify(s3JsonData)
    }
    await s3.put(s3Params);
    return updatedEntry;
});