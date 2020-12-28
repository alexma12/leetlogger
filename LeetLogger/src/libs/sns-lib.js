import AWS from "aws-sdk";

const sns = new AWS.SNS();

export default {
    publish: (message, arn) => sns.publish({
        Message: message,
        TopicArn: arn
    }).promise()
}