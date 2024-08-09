import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const fileUpload = {
  storage: diskStorage({
    destination:
      '/Users/tusharsolanki/Documents/api-nestjs-laundry/src/images/product',
    filename: (req, file, cb) => {
      const filename = `${Date.now()}${extname(file.originalname)}`;
      cb(null, filename);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      cb(
        new HttpException(
          'Only image files are allowed!',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    } else {
      cb(null, true);
    }
  },
};
