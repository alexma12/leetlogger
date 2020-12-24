import dynamoDB from "../../libs/dynamoDB-lib";
import handler from "../../libs/handler-lib";
import * as uuid from "uuid";


export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    
    const params = { 
        TableName: process.env.questionTable,
        Item: {
            userID: "123",
            questionID: uuid.v4(),
            title: data.title,
            questionType: data.questionType, 
            revisionDate: data.revisionDate || -1,
            difficulty: data.difficulty,
            entryCount: 1
        }
    }

    await dynamoDB.put(params);
    return params.Item
});