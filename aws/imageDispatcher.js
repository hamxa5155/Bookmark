const AWS = require('aws-sdk');

// Read, Write, Delete - RWD
const getWParams = (bucket, payload) => ({
    Body: payload.imageURI,
    Bucket: bucket,
    Key: payload.imageKey,
    StorageClass: 'STANDARD_IA'
});

const getRDParams = (bucket, payload) => ({
    Bucket: bucket,
    Key: payload.imageKey
})

module.exports = async (actionType, payload) => {
    AWS.config.update({ region: 'us-east-1' });

    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    const bucket = 'bookmarkd-images';

    let params, s3Res;
    switch(actionType) {
        case 'PUT':
            params = getWParams(bucket, payload);
            s3Res = new Promise((resolve, reject) => {
                s3.putObject(params, (err, data) => {
                    if (err) {
                        reject({ err });
                    } else {
                        resolve({ putIsSuccess: true });
                    }
                })
            });
            break;

        case 'GET':
            params = getRDParams(bucket, payload);
            s3Res = new Promise((resolve, reject) => {
                s3.getObject(params, (err, data) => {
                    if (err) {
                        reject({ err });
                    } else {
                        resolve({ imageURI: data.Body.toString() });
                    }
                })
            });
            break;

        case 'DELETE':
            params = getRDParams(bucket, payload);
            s3Res = new Promise((resolve, rject) => {
                s3.deleteObject(params, (err, data) => {
                    if (err) {
                        reject({ err });
                    } else {
                        resolve({ deleteIsSuccess: true });
                    }
                })
            })
            break;
    }

    return s3Res.then((res) => (res), (err) => (err));
}