
import dynamodb from "../libs/dynamoDB-lib";

export default async (id, title, tableName) => {
    const params = {
        TableName: tableName,
        IndexName: "userID-title-index",
        KeyConditionExpression: "userID = :userID and title = :title",
        ExpressionAttributeValues: {
            ":userID": id,
            ":title": title
        },

    }
    const question = await dynamodb.query(params);
    
    if(question.Items.length > 0) {
        return question.Items[0]
    } 
    return null
}

