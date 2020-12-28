import createError from "http-errors";

import middleware from "../../libs/middleware"
import dynamoDB from "../../libs/dynamodb-lib";
import s3 from "../../libs/s3-lib"

async function handler(event, context) {
  const dbParams = {
    TableName: process.env.questionTable,
    Key: {
      "userID": "123",
      "questionID": event.pathParameters.questionId
    },
  }
  let questions;
  let s3Data;

  try {
    questions = dynamoDB.get(dbParams);
    const expression = "select * from S3Object[*][*] s where s.title = '" + event["queryStringParameters"]["title"] + "'";


    const s3Params = {
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

    s3Data = s3.s3SelectList(s3Params);
    await Promise.All([s3Data,questions])

  } catch {
    throw new createError.InternalServerError("Unable to get notes or get question")
  }

  return { 
      status: 200,
      body: {...questions.Item, s3Data: s3Data },
  }
};

export const main = middleware(handler)   