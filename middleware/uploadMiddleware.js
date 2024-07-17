import multer from 'multer';
import { validationResult } from 'express-validator';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FORMATS = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (ALLOWED_FORMATS.includes(file.mimetype)) {
    if (!/\s/.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Filename contains spaces or breaks'), false);
    }
  } else {
    cb(new Error('Invalid file format'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

const validateFile = [
  upload.single('file'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateFile;
