import dynamoDB from "../../libs/dynamodb-lib";
import handler from "../../libs/handler-lib";
import s3 from "../../libs/s3-lib"

export const main = handler(async (event, context) => {
    const dbParams = {
        TableName: process.env.questionTable,
        Key: {
           "userID": "123",
           "questionID": event.pathParameters.questionId
        },
    }
    const questions = await dynamoDB.get(dbParams);
  
    if(!event.queryStringParameters || !event.queryStringParameters.title){
      throw new Error("title not in queryStringParameters")
    }
    const expression = "select * from S3Object[*][*] s where s.title = '" + event["queryStringParameters"]["title"] + "'";
    

    const s3Params = {
        Bucket: process.env.s3BucketName,
        Expression: expression,
        ExpressionType: 'SQL',
        Key: "123",
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

    const s3Data = await s3.s3SelectList(s3Params);
        
    return {...questions.Item, s3Data: s3Data }
});