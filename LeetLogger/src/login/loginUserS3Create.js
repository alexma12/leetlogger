
import handler from "../../libs/handler-lib";
import s3 from "../../libs/s3-lib";

export const main = handler(async (event, context) => {
    const userID = "123" //event

    const s3Params = { 
        Bucket: process.env.s3BucketName,
        Key: userID,
        Body: "[]"
    }
    await s3.put(s3Params);

    return {
        addedUserS3Bucket: true
    }
   
});