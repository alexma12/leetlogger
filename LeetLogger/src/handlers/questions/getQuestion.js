import createError from "http-errors";

import middleware from "../../libs/middleware"
import dynamoDB from "../../libs/dynamodb-lib";
import s3 from "../../libs/s3-lib";
import {isEmptyObject} from "../../libs/helpers-lib"

async function handler(event, context) {
  const dbParams = {
    TableName: process.env.questionTable,
    Key: {
      "userID": "123",
      "questionID": event.pathParameters.questionId
    },
  }
  const title =  decodeURIComponent(event.queryStringParameters.title)
  let question;
  let s3Data;

  try {
    question = await dynamoDB.get(dbParams);
    const expression = "select * from S3Object[*][*] s where s.title = '" + title + "'";


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

    s3Data = await s3.s3SelectList(s3Params);

  } catch(error) {
    throw new createError.InternalServerError(error)
  }

  if(isEmptyObject(question)){
    throw new createError.NotFound()
  }

  return { 
      statusCode: 200,
      body: JSON.stringify({...question, note: s3Data}),
  }
};

export const main = middleware(handler)   