import File from '../models/FileModel.js';
import {uploadFileToS3, getFileFromS3, deleteFileFromS3 } from '../utils/uploadToS3.js';

const uploadFile = async (req, res) => {
  try {
    const { originalname, size, mimetype, buffer } = req.file;
    const location = await uploadFileToS3(req.file);

    const newFile = new File({
      filename: originalname,
      location,
      size
    });

    await newFile.save();
    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
};

const readFile = async (req, res) => {
  const { key } = req.params;

  try {
    const fileData = await getFileFromS3(key);
    res.status(200).send(fileData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching file from S3' });
  }
};

const deleteFile = async (req, res) => {
  const { key } = req.params;

  try {
    await deleteFileFromS3( key);

    // Remove the record from MongoDB
    const location = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
    const file = await File.findOneAndDelete({ location });

    if (!file) {
      return res.status(404).json({ error: 'File record not found in database' });
    }

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting file from S3 or database' });
  }
};



export { uploadFile, readFile, deleteFile };
