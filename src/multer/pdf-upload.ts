import { HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

export const pdfUpload = (destination: string) => ({
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), destination);
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const filename = `${Date.now()}${path.extname(file.originalname)}`;
      cb(null, filename);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(pdf)$/)) {
      cb(
        new HttpException(
          'Only PDF files are allowed!',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    } else {
      cb(null, true);
    }
  },
});
