import handler from "../../libs/handler-lib"
import dynamoDB from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {

    const params = {
        TableName: process.env.questionTable,
        KeyConditionExpression: "userID = :userID",
        FilterExpression: "contains(questionType, :type)",
        ExpressionAttributeValues: {
            ":userID": "123",
            ":type": event.pathParameters.type
        },
    }
    const questions = await dynamoDB.query(params);

    return questions.Items;
});