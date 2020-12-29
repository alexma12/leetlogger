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
  let question;
  let s3Data;

  try {
    question = await dynamoDB.get(dbParams);

    const s3Params = { 
        Bucket: process.env.s3BucketName,
        Key:"123" + "-" + event.pathParameters.questionId
    }
    s3Data = await s3.get(s3Params)

  } catch(error) {
    throw new createError.InternalServerError(error)
  }

  if(isEmptyObject(question)){
    throw new createError.NotFound()
  }

  return { 
      statusCode: 200,
      body: JSON.stringify({...question.Item, notes: JSON.parse(s3Data.Body.toString())}),
  }
};

export const main = middleware(handler)   