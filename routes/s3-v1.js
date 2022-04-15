import express from 'express';
import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"
import 'dotenv/config'

var router = express.Router();

const randomBytes = promisify(crypto.randomBytes)

const region = process.env.S3_REGION
const bucketName = process.env.S3_BUCKET_NAME
const accessKeyId = process.env.S3_ACCESS_KEY_ID
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function generateUploadURL() {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')
  
    const params = ({
      Bucket: bucketName,
      Key: imageName,
      Expires: 60
    })
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}
  
router.get('/getUploadUrl', async function(req,res,next) {
    try {
        const url = await generateUploadURL()
        res.json({upload_url: url})
    }catch(error) {
        res.status(500)
        res.json({status: 'error', error: error.toString()})
    }
})

export default router;