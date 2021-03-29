import createError from "http-errors";

import queryQuestionByTitle from "../../libs/queryQuestionByTitle";
import middleware from "../../libs/middleware";
import dynamoDB from "../../libs/dynamoDB-lib";
import s3 from "../../libs/s3-lib";

const deleteObjFromS3Data = async (s3GetParams, entryID) => {
  const s3Obj = await s3.get(s3GetParams);
  let jsonData = JSON.parse(s3Obj.Body.toString());
  const originalLength = jsonData.length;
  jsonData = jsonData.filter((entryNote) => {
    return entryNote.entryID !== entryID;
  });
  if (jsonData.length === originalLength) {
    throw new createError.NotFound();
  }
  return jsonData;
};

async function handler(event, context) {
  const deletedEntry = event.Records[0].Sns.Message;
  const { title, entryID } = JSON.parse(deletedEntry);

  try {
    const question = await queryQuestionByTitle(
      "123",
      title,
      process.env.questionTable
    );
    if (!question) {
      throw new createError.NotFound();
    }

    if (question.entryCount !== 1) {
      const bucketKey = "123" + "-" + question.questionID;
      const params = {
        TableName: process.env.questionTable,
        Key: {
          userID: "123",
          questionID: question.questionID,
        },
        UpdateExpression: "SET entryCount = entryCount - :decr",
        ExpressionAttributeValues: {
          ":decr": 1,
        },
      };

      const update = dynamoDB.update(params);

      const s3GetParams = {
        Bucket: process.env.s3BucketName,
        Key: bucketKey,
      };

      const updatedS3Obj = await deleteObjFromS3Data(s3GetParams, entryID);

      const s3UploadParams = {
        Bucket: process.env.s3BucketName,
        Key: bucketKey,
        Body: JSON.stringify(updatedS3Obj),
      };
      const upload = s3.upload(s3UploadParams);

      await Promise.all([upload, update]);
    } else {
      const params = {
        TableName: process.env.questionTable,
        Key: {
          userID: "123",
          questionID: question.questionID,
        },
        ReturnValues: "ALL_OLD",
      };

      const dbDelete = dynamoDB.delete(params);

      const s3Params = {
        Bucket: process.env.s3BucketName,
        Key: "123" + "-" + question.questionID,
      };

      const s3Delete = s3.delete(s3Params);

      await Promise.all([dbDelete, s3Delete]);
    }
  } catch (error) {
    throw new createError.InternalServerError(error);
  }

  return {
    status: 200,
    body: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
}

export const main = middleware(handler);
