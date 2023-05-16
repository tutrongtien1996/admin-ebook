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
    delete: async (file_name) => {
      const deleteImage = await s3.deleteObject({
        Bucket: dotenv.parsed.AWS_S3_BUCKET_NAME,
        Key: `nameBook${file_name}`
      }).promise();
      return deleteImage
    }
}

module.exports = {FileService}
