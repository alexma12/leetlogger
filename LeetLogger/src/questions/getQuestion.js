import dynamoDB from "../../libs/dynamodb-lib";
import handler from "../../libs/handler-lib";
import s3 from "../../libs/s3-lib"

export const main = handler(async (event, context) => {
    const dbParams = {
        TableName: process.env.questionTable,
        KeyConditionExpression: "userID = :userID, questionID = :questionID",
        ExpressionAttributeValues: {
           ":userID": "123",
           ":questionID": event.pathParameters.questionID
        },
    }
    const questions = await dynamoDB.get(dbParams);
    let  expression = "select * from s3object s"
    if(event.queryStringParameters && event.queryStringParameters.noteTitle && event.queryStringParameters.noteTitle !== ""){
        expression = "select * from S3Object[*][*] s where s.noteTitle =  '" + event["queryStringParameters"]['noteTitle'] + "'";
    }

    const s3Params = {
        Bucket: process.env.s3BucketName,
        Expression: expression,
        ExpressionType: 'SQL',
        Key: fileName,
        InputSerialization: {
          JSON: {
            Type: 'DOCUMENT',
          }
        },
        OutputSerialization: {
          JSON: {
            RecordDelimiter: ','
          }
        }
    }

    const s3Data = await s3.s3SelectList(params).promise();
        
    return {...questions.Items, ...s3Data }
});