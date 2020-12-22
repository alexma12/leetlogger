import handler from "../../libs/handler-lib";


export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.questionTable,
        Key: {
            userID: "123",
            questionID: event.pathParameters.questionId,
        },
        UpdateExpression: "SET revisionDate = :noRevision, onTime = :true",
        ExpressionAttributeValues: {
            ":noRevision": -1,
            ":true": true
        },
        ReturnValues: "ALL_NEW"
    }
    const updatedEntry = await dynamoDB.update(params);
    return updatedEntry;
}); 