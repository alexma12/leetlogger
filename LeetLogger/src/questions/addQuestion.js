import dynamoDB from "../../libs/dynamoDB-lib";
import handler from "../../libs/handler-lib";
import * as uuid from "uuid";
import { convertEntryToDBStruct } from "../../libs/structural-helpers-lib";

export const main = handler(async (event, context) => {
    const data = convertEntryToDBStruct(event.body);
    
    const params = { 
        TableName: process.env.questionTable,
        Item: {
            userID: "123",
            questionID: uuid.v4(),
            title: data.title,
            type: data.type, //type algorithm 
            revisionDate: data.revisionDate || -1,
            difficulty: data.difficulty,
            entryCount: 1,
            onTime: true,
        }
    }

    await dynamoDB.put(params);
    return params.Item
});