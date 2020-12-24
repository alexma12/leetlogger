import dynamoDB from "../../libs/dynamoDB-lib";
import handler from "../../libs/handler-lib";
import s3 from "../../libs/s3-lib"
import {isEmptyObject} from "../../libs/helpers-lib"

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.entryTable,
        Key: {
            userID: "123",
            entryID: event.pathParameters.entryId
        },
        ReturnValues: "ALL_OLD"
    }
    const deletedEntry = await dynamoDB.delete(params);
    if(isEmptyObject(deletedEntry)){
        throw new Error("Item not found")
    }

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

    const s3ObjToDelete = await s3.s3SelectList(s3SelectParams);
    const s3GetParams = {
        Bucket: process.env.s3BucketName,
        Key: "123"
    }

    const updatedS3Obj = await deleteObjFromS3Data(s3GetParams, s3ObjToDelete.index);

    const s3UploadParams = {
        Bucket: process.env.s3BucketName,
        Key: "123",
        Body: JSON.stringify(updatedS3Obj)
    } 
    await s3.upload(s3UploadParams)


    // const s3Params = { 
    //     Bucket: process.env.s3BucketName,
    //     Key: event.pathParameters.entryId
    // }
    // await s3.delete(s3Params);

    return deletedEntry
    
});

const deleteObjFromS3Data = async (s3GetParams, index) => {
    const s3Obj = await s3.get(s3GetParams);
    const jsonData = JSON.parse(s3Obj.Body.toString());
    jsonData.splice(index,1);
    return jsonData;
}