
import dynamoDB from "../../libs/dynamodb-lib";
import handler from "../../libs/handler-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.entryTable,
        KeyConditionExpression: "userID = :userID",
        ExpressionAttributeValues: {
           ":userID": "123"
        },
    }
    const entries = await dynamoDB.query(params);

    return entries.Items;
});