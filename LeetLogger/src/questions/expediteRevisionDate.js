import handler from "../../libs/handler-lib";
import {calculateExpeditedRevisionDate} from "../../libs/timestamp-helpers-lib";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const expeditedDate = calculateExpeditedRevisionDate(data.timeDelay, data.revisionDate);
    const params = {
        TableName: process.env.questionTable,
        Key: {
            userID: "123",
            questionID: event.pathParameters.questionId,
        },
        UpdateExpression: "SET revisionDate = :expeditedDate",
        ExpressionAttributeValues: {
            ":expeditedDate": expeditedDate.revisionDate,
        },
    }
    await dynamoDB.update(params);
    return expeditedDate;
}); 