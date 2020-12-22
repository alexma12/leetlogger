import handler from "../../libs/handler-lib"
import dynamoDB from "../../libs/dynamodb-lib";
import {twoDaysAgo} from "../../libs/timestamp-helpers-lib";

export const main = handler(async (event, context) => {
    const twoDaysPrior = twoDaysAgo();
    const params = {
        TableName: process.env.entryTable,
        IndexName: "userID-submittedAt-index",
        KeyConditionExpression: "userID = :userID and submittedAt >= :twoDaysPrior",
        ExpressionAttributeValues: {
           ":userID": "123",
           ":twoDaysPrior": twoDaysPrior
        },
    }
    const entries = await dynamoDB.query(params);

    return entries.Items;
});