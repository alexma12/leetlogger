import dynamoDB from "../../libs/dynamoDB-lib";
import handler from "../../libs/handler-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.questionTable,
        Key: {
            userID: "123",
            questionID: event.pathParameters.questionId
        },
        ReturnValues: "ALL_OLD"
    }
    const deletedQuestion = await dynamoDB.delete(params);

    if(!deletedQuestion){
        throw new Error("Item not found")
    }
    return deletedQuestion;
    
});