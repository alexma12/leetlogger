import createError from "http-errors";
import dynamoDB from "../../libs/dynamoDB-lib";

import middleware from "../../libs/middleware";
import validator from "@middy/validator";
import schema from "../../libs/schema/modifyQuestionRevisionDateValidator";

async function handler(event, context) {
  const { revisionDate } = event.body;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (revisionDate !== -1 && revisionDate < today.getTime())
    throw new createError.Forbidden("Invalid Revision Date");

  const params = {
    TableName: process.env.questionTable,
    Key: {
      userID: "123",
      questionID: event.pathParameters.questionId,
    },
    UpdateExpression: "SET revisionDate = :newRevisionDate",
    ExpressionAttributeValues: {
      ":newRevisionDate": revisionDate,
    },
    ReturnValues: "ALL_NEW",
  };

  let updatedQuestion;

  try {
    updatedQuestion = await dynamoDB.update(params);
  } catch (e) {
    throw new createError.InternalServerError(
      "Error Occured When Updating Your Question's Review Date"
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedQuestion.Attributes),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
}

export const main = middleware(handler).use(validator({ inputSchema: schema }));
