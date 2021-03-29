import createError from "http-errors";

import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamoDB-lib";
import s3 from "../../libs/s3-lib";
import { currentDateString } from "../../libs/timestamp-helpers-lib";

const updateS3Data = async (s3GetParams, entryID, content, currentDate) => {
  const s3Obj = await s3.get(s3GetParams);
  const jsonData = JSON.parse(s3Obj.Body.toString());
  for (let i in jsonData) {
    if (jsonData[i].entryID === entryID) {
      jsonData[i].content = content;
      jsonData[i].lastUpdated = currentDate;
      return jsonData;
    }
  }
  throw new createError.NotFound();
};

async function handler(event, context) {
  const { tags, approxCompletionMins, difficulty, content } = event.body;
  const currentDate = currentDateString();
  const params = {
    TableName: process.env.entryTable,
    Key: {
      userID: "123",
      entryID: event.pathParameters.entryId,
    },
    UpdateExpression:
      "SET approxCompletionMins = :completion, tags = :tags,  difficulty = :difficulty, lastUpdated = :lastUpdated",
    ExpressionAttributeValues: {
      ":tags": tags || [],
      ":completion": approxCompletionMins || 0,
      ":difficulty": difficulty || "",
      ":lastUpdated": Date.now(),
    },
    ReturnValues: "ALL_NEW",
  };
  let updatedEntry;

  try {
    updatedEntry = dynamoDB.update(params);

    const bucketKey = "123" + "-" + event.pathParameters.questionId;

    const s3GetParams = {
      Bucket: process.env.s3BucketName,
      Key: bucketKey,
    };

    const updatedS3Obj = await updateS3Data(
      s3GetParams,
      event.pathParameters.entryId,
      content,
      currentDate
    );

    const s3UploadParams = {
      Bucket: process.env.s3BucketName,
      Key: bucketKey,
      Body: JSON.stringify(updatedS3Obj),
    };
    const upload = s3.upload(s3UploadParams);

    await Promise.all([upload, updatedEntry]);
  } catch {
    throw new createError.InternalServerError(
      "Error occured when updating your entry"
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      updated: true,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
}

export const main = middleware(handler);
