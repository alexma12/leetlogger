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

    const s3Params = { 
        Bucket: process.env.s3BucketName,
        Key: event.pathParameters.entryId
    }
    await s3.delete(s3Params);

    return deletedEntry
   
    
});