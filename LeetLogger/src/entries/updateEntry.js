import dynamoDB from "../../libs/dynamoDB-lib";
import handler from "../../libs/handler-lib";
import s3 from "../../libs/s3-lib";
import { convertEntryToDBStruct } from "../../libs/helpers-lib"
import { currentDateString } from "../../libs/timestamp-helpers-lib"
import { parse } from "uuid";

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

    const expression = "select * from S3Object[*][*] s where s.entryID = '" + event["pathParameters"]["entryId"] + "'";

    const s3SelectParams = {
        Bucket: process.env.s3BucketName,
        Expression: expression,
        ExpressionType: 'SQL',
        Key: "123",
        InputSerialization: {
          JSON: {
            Type: 'DOCUMENT',
          }
        },
        OutputSerialization: {
          JSON: {
            RecordDelimiter: ','
          }
        }
    }

    const s3ObjToUpdate = await s3.s3SelectList(s3SelectParams);
    console.log(s3ObjToUpdate)
    s3ObjToUpdate[0].content = data.content;
    s3ObjToUpdate[0].lastUpdated = currentDate;
    console.log(s3ObjToUpdate)

    const s3GetParams = {
        Bucket: process.env.s3BucketName,
        Key: "123"
    }

    const updatedS3Obj = await updateS3Data(s3GetParams, s3ObjToUpdate[0]);

    const s3UploadParams = {
        Bucket: process.env.s3BucketName,
        Key: "123",
        Body: JSON.stringify(updatedS3Obj)
    } 
    await s3.upload(s3UploadParams)
  
    return updatedEntry;
});

const updateS3Data = async (s3GetParams, s3ObjToUpdate) => {
    const s3Obj = await s3.get(s3GetParams);
    const jsonData = JSON.parse(s3Obj.Body.toString());
    jsonData[s3ObjToUpdate.index] = s3ObjToUpdate
    return jsonData
}