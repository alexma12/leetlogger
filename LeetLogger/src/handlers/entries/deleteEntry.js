import createError from "http-errors";

import sns from "../../libs/sns-lib"
import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamoDB-lib";
import s3 from "../../libs/s3-lib"
import { isEmptyObject } from "../../libs/helpers-lib"

const deleteObjFromS3Data = async (s3GetParams, index) => {
  const s3Obj = await s3.get(s3GetParams);
  const jsonData = JSON.parse(s3Obj.Body.toString());
  jsonData[index] = null;
  console.log(jsonData);
  return jsonData;
}

async function handler(event, context) {
  const params = {
    TableName: process.env.entryTable,
    Key: {
      userID: "123",
      entryID: event.pathParameters.entryId
    },
    ReturnValues: "ALL_OLD"
  }

  let deletedEntry;
  let s3ObjToDelete
  try {
    deletedEntry = await dynamoDB.delete(params);
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

    s3ObjToDelete = await s3.s3SelectList(s3SelectParams);
    if(!s3ObjToDelete){
      throw new createError.NotFound();
    }
    const s3GetParams = {
      Bucket: process.env.s3BucketName,
      Key: "123"
    }


    const updatedS3Obj = await deleteObjFromS3Data(s3GetParams, s3ObjToDelete[0]["index"]);

    const s3UploadParams = {
      Bucket: process.env.s3BucketName,
      Key: "123",
      Body: JSON.stringify(updatedS3Obj)
    }
    const upload = s3.upload(s3UploadParams)

    await Promise.all([upload,deletedEntry])

    await sns.publish(JSON.stringify(deletedEntry.Attributes), process.env.deleteEntryTopicArn)

  } catch(error) {
    throw new createError.InternalServerError(error);
  }


  if (isEmptyObject(deletedEntry)) {
    throw new createError.NotFound()
  }

  return {
    statusCode: 200,
    body: JSON.stringify(deletedEntry.Attributes)
  }
}

export const main = middleware(handler);

