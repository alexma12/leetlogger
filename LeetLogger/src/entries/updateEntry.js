import dynamoDB from "../../libs/dynamoDB-lib";
import handler from "../../libs/handler-lib";
import { convertEntryToDBStruct } from "../../libs/helpers-lib"

export const main = handler(async (event, context) => {
    const data = convertEntryToDBStruct(event.body);

    const params = {
        TableName: process.env.entryTable,
        Key: {
            userID: "123",
            entryID: event.pathParameters.entryId,
        },
        UpdateExpression: "SET title = :title, type = :type, approxCompletionMins = :completion, difficulty = :difficult, solutionSummary = :solutionSummary",
        ExpressionAttributeValues: {
            ":title": data.title || null,
            ":type": data.type || null,
            ":completion": data.approxCompletionMins || null,
            ":difficulty": data.difficulty || null,
            ":solutionSummary": data.solutionSummary || null
        },
        ReturnValues: "ALL_NEW"

    }
    const updatedEntry = await dynamoDB.update(params);
    return updatedEntry;
});