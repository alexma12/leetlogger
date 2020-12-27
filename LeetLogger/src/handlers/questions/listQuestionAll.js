import dynamoDB from "../../libs/dynamodb-lib";
import handler from "../../libs/handler-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.questionTable,
        KeyConditionExpression: "userID = :userID",
        ExpressionAttributeValues: {
           ":userID": "123"
        },
    }
    const questions = await dynamoDB.query(params);

    return questions.Items;
});