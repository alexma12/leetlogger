import AWS from "aws-sdk";
import {isEmptyObject} from "./helpers-lib"
const s3 = new AWS.S3();

export default {
    get: (params) => s3.getObject(params).promise(),
    put: (params) => s3.putObject(params).promise(),
    upload: (params) => s3.upload(params).promise(),
    delete: (params) => s3.deleteObject(params).promise()

}

