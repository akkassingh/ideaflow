import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

// Configure AWS SDK with credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
//TO DO: add projectname/filename as the key instead of ${uuidv4()}-${originalname}.

export const uploadFileToS3 = async (file) => {
  const { originalname, buffer, mimetype } = file;

  const Key = `${uuidv4()}-${originalname}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    Body: buffer,
    ContentType: mimetype
  };

  const data = await s3.upload(params).promise();
  return data.Location;
};

export const getFileFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    return data.Body;
  } catch (error) {
    console.error('Error reading file from S3:', error);
    throw error;
  }
};

export const deleteFileFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
    console.log(`File ${key} deleted successfully`);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw error;
  }
};
