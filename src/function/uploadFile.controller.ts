/* eslint-disable prettier/prettier */
import { Injectable, UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class FileUploadService {
  async uploadFile(@UploadedFile() file: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename =
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname);

      const storage = diskStorage({
        destination: './uploads', // Directorio donde se guardarán los archivos subidos
        filename: (req, file, callback) => {
          callback(null, filename);
        },
      });

      storage(file, null, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(filename);
        }
      });
    });
  }
}
