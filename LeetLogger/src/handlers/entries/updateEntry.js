import createError from "http-errors";

import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamoDB-lib";
import s3 from "../../libs/s3-lib";
import { convertEntryToDBStruct } from "../../libs/helpers-lib"
import { currentDateString } from "../../libs/timestamp-helpers-lib"



const updateS3Data = async (s3GetParams, s3ObjToUpdate) => {
  const s3Obj = await s3.get(s3GetParams);
  const jsonData = JSON.parse(s3Obj.Body.toString());
  jsonData[s3ObjToUpdate.index] = s3ObjToUpdate
  return jsonData
}

async function handler(event, context) {
  const { tags, approxCompletionMins, difficulty, content } = event.body;
  const currentDate = currentDateString();
  const params = {
    TableName: process.env.entryTable,
    Key: {
      userID: "123",
      entryID: event.pathParameters.entryId,
    },
    UpdateExpression: "SET approxCompletionMins = :completion, tags = :tags,  difficulty = :difficulty, lastUpdated = :lastUpdated",
    ExpressionAttributeValues: {
      ":tags": tags || [],
      ":completion": approxCompletionMins || 0,
      ":difficulty": difficulty || "",
      ":lastUpdated": currentDate
    },
    ReturnValues: "ALL_NEW"
  }
  let updatedEntry;


  try {
    updatedEntry = dynamoDB.update(params);
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
    if(!s3ObjToUpdate){
      throw new Error()
    }
    s3ObjToUpdate[0].content = content;
    s3ObjToUpdate[0].lastUpdated = currentDate;

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
    const upload = s3.upload(s3UploadParams)

    await Promise.all([upload, updatedEntry])
  } catch(error) {
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      updated: true
    })
  }
};

export const main = middleware(handler);

