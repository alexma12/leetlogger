import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2'
  });

export default {
    get: (params) => dynamoDB.get(params).promise(),
    put: (params) => dynamoDB.put(params).promise(),
    update: (params) => dynamoDB.update(params).promise(),
    delete: (params) => dynamoDB.delete(params).promise(),
    query: (params) => dynamoDB.query(params).promise(),
    batchGet: (params) => dynamoDB.batchGet(params).promise(),
    batchWrite: (params) => dynamoDB.batchWrite(params).promise()

} 