import dynamoDB from "../../libs/dynamoDB-lib";
import handler from "../../libs/handler-lib";
import {convertEntryToDBStruct} from "../../libs/helpers-lib";
import * as uuid from "uuid";

export const main = handler(async (event, context) => {
    const data = convertEntryToDBStruct(event.body);

    const params = { 
        TableName: process.env.entryTable,
        Item: {
            userID: "123",
            entryID: uuid.v4(),
            title: data.title,
            type: data.type,
            submittedAt: Date.now(),
            approxCompletionMins: data.approxCompletionMins,
            difficulty: data.difficulty,
            solutionSummary: data.solutionSummary
        }
    }

    await dynamoDB.put(params);
    return params.Item
});