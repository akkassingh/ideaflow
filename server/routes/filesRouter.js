import express from 'express';
const router = express.Router();

import validateFile from '../middleware/uploadMiddleware.js';
import { uploadFile, readFile, deleteFile } from '../controllers/fileController.js'; // Import the controller function

router.post('/', validateFile, uploadFile);
router.get('/:key', readFile)
router.delete('/:key', deleteFile)

export default router;
