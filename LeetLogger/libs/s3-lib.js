import AWS from "aws-sdk";

const s3 = new AWS.S3();

export default {
    get: (params) => s3.getObject(params).promise(),
    put: (params) => s3.putObject(params).promise(),
    s3SelectList: async  (params) => {
        return new Promise((resolve, reject) => {
          s3.selectObjectContent(params, (err, data) => {
            if (err) { reject(err); }
            if (!data) {
              reject('Empty data object');
            }
            const records = []
            data.Payload.on('data', (event) => {
              if (event.Records) {
                records.push(event.Records.Payload);
              }
            })
            .on('error', (err) => {
              reject(err);
            })
            .on('end', () => {
              let dataString = Buffer.concat(records).toString('utf8');
              dataString = dataString.replace(/\,$/, '');
              dataString = `[${planetString}]`;
      
              try {
                const data = JSON.parse(dataString);
                resolve(data);
              } catch (e) {
                reject(new Error(`Unable to convert S3 data to JSON object. S3 Select Query: ${params.Expression}`));
              }
            });
          });
        })
      },
    delete: (params) => s3.deleteObject(params).promise(),

}

