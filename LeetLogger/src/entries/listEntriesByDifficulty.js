import handler from "../../libs/handler-lib"
import dynamoDB from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.entryTable,
        KeyConditionExpression: "userID = :userID and difficulty = :difficulty",
        ExpressionAttributeValues: {
           ":userID": "123",
           ":difficulty": event.pathParameters.difficulty
        },
    }
    const entries = await dynamoDB.query(params);

    return entries.Items;
});