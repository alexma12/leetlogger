import createError from "http-errors";

import middleware from "../../libs/middleware";
import s3 from "../../libs/s3-lib";

async function handler(event, context) {
  const userID = "123"; //event

  const s3Params = {
    Bucket: process.env.s3BucketName,
    Key: userID,
    Body: "[]",
  };

  try {
    await s3.put(s3Params);
  } catch {
    throw new createError.InternalServerError(
      "Error occured when creating your a question"
    );
  }

  return {
    status: 201,
    addedUserS3BucketFile: true,
  };
}

export const main = middleware(handler);
