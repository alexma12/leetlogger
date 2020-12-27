import dynamoDB from "../../libs/dynamoDB-lib";
import handler from "../../libs/handler-lib";
import mergeTags  from "../../libs/helpers-lib";

export const main = handler(async (event, context) => {

    const getParams = { 
        TableName: process.env.questionTable
    }
    const params = {
        TableName: process.env.questionTable,
        Key: {
            userID: "123",
            questionID: event.pathParameters.questionId
        },
        UpdateExpression: "SET entryCount = entryCount + :incr, revisionDate = :revision",
        ExpressionAttributeValues: {
            ":incr": 1,
            ":revision": data.revisionDate
        },
        ReturnValues: "ALL_NEW"

    }
    const updatedEntry = await dynamoDB.update(params);
    return updatedEntry;
}); 