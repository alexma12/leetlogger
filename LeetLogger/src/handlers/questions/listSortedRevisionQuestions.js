import handler from "../../libs/handler-lib"
import dynamoDB from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {

    const params = {
        TableName: process.env.questionTable,
        IndexName: "userID-revisionDate-index",
        KeyConditionExpression: "userID = :userID and revisionDate >= :zero",
        ExpressionAttributeValues: {
            ":userID": "123",
            ":zero": 0
        },
    }
    const questions = await dynamoDB.query(params);

    return questions.Items;
});