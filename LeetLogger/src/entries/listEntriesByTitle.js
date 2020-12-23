import handler from "../../libs/handler-lib"
import dynamoDB from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {

    if(!event.queryStringParameters || !event.queryStringParameters.title){
        throw new Error("No title in queryStringParameters")
    }

    const params = {
        TableName: process.env.entryTable,
        IndexName: "userID-title-index",
        KeyConditionExpression: "userID = :userID and title = :title",
        ExpressionAttributeValues: {
           ":userID": "123",
           ":title": event.queryStringParameters.title
        },
    }
    const entries = await dynamoDB.query(params);

    return entries.Items;
});