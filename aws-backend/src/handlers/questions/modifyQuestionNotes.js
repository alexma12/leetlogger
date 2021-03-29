import s3 from "../../libs/s3-lib";
import * as uuid from "uuid";
import middleware from "../../libs/middleware";
import schema from "../../libs/schema/modifyQuestionNotesValidator";
import createError from "http-errors";
import validator from "@middy/validator";

async function handler(event, context) {
  const { title, action, content, noteID, questionID } = event.body;
  const bucketKey = "123" + "-" + questionID;

  const s3GetParams = {
    Bucket: process.env.s3BucketName,
    Key: bucketKey,
  };

  try {
    const s3Obj = await s3.get(s3GetParams);
    const jsonData = JSON.parse(s3Obj.Body.toString());

    let updatedS3Array = [];

    switch (action) {
      case "ADD":
        const s3NoteObject = {
          isQuestionNote: true,
          content,
          title: title,
          submittedAt: Date.now(),
          lastUpdated: -1,
          noteID: uuid.v4(),
        };
        jsonData.push(s3NoteObject);
        updatedS3Array = jsonData;
        break;

      case "UPDATE":
        updatedS3Array = jsonData.map((s3Data) => {
          if (!s3Data) return s3Data;
          if (s3Data.noteID === noteID) {
            if (content) s3Data.content = content;
            s3Data.lastUpdated = Date.now();
            if (title) s3Data.title = title;
          }
          return s3Data;
        });
        break;

      case "DELETE":
        updatedS3Array = jsonData.filter((s3Data) => {
          if (!s3Data || !s3Data.noteID) return true;
          return s3Data.noteID !== noteID;
        });
        break;

      default:
        throw new Error();
    }

    const updatedS3Params = {
      Bucket: process.env.s3BucketName,
      Key: "123" + "-" + questionID,
      Body: JSON.stringify(updatedS3Array),
    };

    await s3.put(updatedS3Params);
  } catch (e) {
    throw new createError.InternalServerError(
      "Error Occured When Modifying Your Question Note"
    );
  }

  return {
    statusCode: 200,
    body: "Question Notes Successfully Updated",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
}
export const main = middleware(handler).use(validator({ inputSchema: schema }));
