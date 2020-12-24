import dynamoDB from "../../libs/dynamoDB-lib";
import handler from "../../libs/handler-lib";

export const main = handler(async (event, context) => {

    const params = {
        TableName: process.env.questionTable,
        Key: {
            userID: "123",
            questionID: event.pathParameters.questionId
        },
        UpdateExpression: "SET entryCount = entryCount - :decr",
        ExpressionAttributeValues: {
            ":decr": 1
        },
        ReturnValues: "ALL_NEW"

    }
    const updatedEntry = await dynamoDB.update(params);
    return updatedEntry
}); 