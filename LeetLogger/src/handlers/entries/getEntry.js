import dynamoDB from "../../libs/dynamoDB-lib";
import handler from "../../libs/handler-lib";

export const main = handler(async(event, context) => {
    const params = { 
        TableName: process.env.entryTable,
        Key: {
            userID: "123",
            entryID: event.pathParameters.entryId
        }
    }
    let entry = await dynamoDB.get(params);
    if(!entry.Item){
        throw new Error("Item not found")
    }
    return entry.Item;
});
