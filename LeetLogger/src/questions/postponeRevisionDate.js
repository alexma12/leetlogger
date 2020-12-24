import handler from "../../libs/handler-lib";
import dynamoDB from "../../libs/dynamoDB-lib"
import {calculatePostponedRevisionDate} from "../../libs/timestamp-helpers-lib"

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    if(data.revisionDate === -1){
        throw new Error("This question does not have a revision date set")
    }
    const postponedDate = calculatePostponedRevisionDate(data.timeDelay, data.revisionDate)
    const params = {
        TableName: process.env.questionTable,
        Key: {
            userID: "123",
            questionID: event.pathParameters.questionId,
        },
        UpdateExpression: "SET revisionDate = :postponedDate",
        ExpressionAttributeValues: {
            ":postponedDate": postponedDate
        },
        ReturnValues: "ALL_NEW"
    }
    const updatedQuestion = await dynamoDB.update(params);
    return updatedQuestion;
}); 