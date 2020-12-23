import dynamoDB from "../LeetLogger/libs/dynamoDB-lib";
import handler from "../LeetLogger/libs/handler-lib";
import { convertEntryToDBStruct } from "../LeetLogger/libs/structural-helpers-lib"

export const main = handler(async (event, context) => {
    const data = convertEntryToDBStruct(event.body);
 
    const params = {
        TableName: process.env.questionTable,
        Key: {
            userID: "123",
            questionID: event.pathParameters.questionId,
        },
        UpdateExpression: "SET title = :title, type = :type, revisionDate = :revisionDate, difficulty = :difficulty, entryCount = :entryCount",
        ExpressionAttributeValues: {
            ":title": data.title || null,
            ":type": data.type || null,
            ":revisionDate": data.revisionDate || null,
            ":difficulty": data.difficulty || null,
        },
        ReturnValues: "ALL_NEW"

    }
    const updatedQuestion = await dynamoDB.update(params);
    return updatedQuestion;
}); 