import AWS from "aws-sdk";

const sns = new AWS.SNS({
    region: 'us-west-2'
  });

export default {
    publish: (message, arn) => sns.publish({
        Message: message,
        TopicArn: arn
    }).promise()
}