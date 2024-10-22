import { HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FilePath } from 'src/constants/FilePath';

export const fileUpload = (destination: string) => ({
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
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
      cb(
        new HttpException(
          'Only JPEG, JPG, or PNG image files are allowed!',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    } else {
      cb(null, true);
    }
  },
});

export const logoUploadPath = (req, file, cb) => {
  const uploadPath = path.join(process.cwd(), FilePath.COMPANY_LOGO);
  fs.mkdirSync(uploadPath, { recursive: true });
  cb(null, uploadPath);
};

export const contractDocumentUploadPath = (req, file, cb) => {
  const uploadPath = path.join(process.cwd(), FilePath.CONTRACT_DOCUMENT);
  fs.mkdirSync(uploadPath, { recursive: true });
  cb(null, uploadPath);
};
