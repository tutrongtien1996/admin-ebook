const fs = require('fs');
const dotenv = require('dotenv').config();
const AWS = require('aws-sdk')
// const { DeleteObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const s3 = new AWS.S3({
  accessKeyId:  dotenv.parsed.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey:  dotenv.parsed.AWS_S3_SECRET_ACCESS_KEY,
})
// const client = new S3Client({});


const FileService = {
    save: async (file_name, blob) => {
        const uploadedImage = await s3.upload({
        Bucket: dotenv.parsed.AWS_S3_BUCKET_NAME,
        Key: `nameBook/${file_name}.png`,
        Body: blob,
        }).promise()
        return uploadedImage  
    },
    // delete: async () => {
    //   const command = new DeleteObjectCommand({
    //     Bucket: dotenv.parsed.AWS_S3_BUCKET_NAME,
    //     Key: 'nameBook/vo-chong-a-phu-1684145611302.png'
    //   });
    //   try {
    //     const response = await client.send(command);
    //     console.log(response);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
}

module.exports = {FileService}
