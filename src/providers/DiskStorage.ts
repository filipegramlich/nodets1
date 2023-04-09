import path from 'path'
import fs from 'fs/promises'
import { AppError } from '../utils/AppError'
import { UPLOAD_FOLDER, TMP_FOLDER } from '../configs/upload'

export class DiskStorage {
    async saveFile(file: any) {
        try {
            await fs.rename(
                path.resolve(TMP_FOLDER, file),
                path.resolve(UPLOAD_FOLDER, file)
            )

            return file;
        }
        catch (error) {
            throw new AppError('Salvar o arquivo falhou!');
        }
    }

    async deleteFile(file: any) {
        try {

            const filePath = path.resolve(UPLOAD_FOLDER, file);

            fs.stat(filePath);

            await fs.unlink(filePath);

        }
        catch (error) {
            throw new AppError('Deletar o arquivo falhou!');
        }
    }
}