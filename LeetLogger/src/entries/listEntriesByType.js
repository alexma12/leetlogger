import handler from "../../libs/handler-lib"
import dynamoDB from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {

    const params = {
        TableName: process.env.entryTable,
        KeyConditionExpression: "userID = :userID",
        FilterExpression: "contains(questionType, :type)",
        ExpressionAttributeValues: {
            ":userID": "123",
            ":type": event.pathParameters.type
        },
    }
    const entries = await dynamoDB.query(params);

    return entries.Items;
});