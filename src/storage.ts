import * as Minio from "minio";
import config from "./config";

const minio = new Minio.Client({
  endPoint: config.MINIO_DOMAIN,
  port: config.MINIO_PORT,
  useSSL: config.MINIO_USE_SSL,
  accessKey: config.MINIO_USER,
  secretKey: config.MINIO_PASSWORD,
});

// Files in /public are read only for everyone
const publicReadPolicy = {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": {
        "AWS": ["*"]
      },
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        `arn:aws:s3:::${config.MINIO_BUCKET}/public/**/*`
      ]
    }
  ]
};

export const setupStorage = async () => {
  const bucketExists = await minio.bucketExists(config.MINIO_BUCKET);

  if (!bucketExists) {
    await minio.makeBucket(config.MINIO_BUCKET);
    await minio.setBucketPolicy(
      config.MINIO_BUCKET,
      JSON.stringify(publicReadPolicy),
    );
  }
};
export type Storage = typeof minio;
export const bucket = config.MINIO_BUCKET;
export default minio;
