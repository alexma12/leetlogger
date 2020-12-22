import dynamoDB from "../../libs/dynamoDB-lib";
import handler from "../../libs/handler-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.questionTable,
        IndexName: "userID-title-index",
        Key: {
            userID: "123",
            questionID: event.pathParameters.questionId,
        },
        UpdateExpression: "SET entryCount = entryCount + :incr",
        ExpressionAttributeValues: {
            ":incr": 1
        },
        ReturnValues: "ALL_NEW"

    }
    const updatedEntry = await dynamoDB.update(params);
    return updatedEntry;
}); 