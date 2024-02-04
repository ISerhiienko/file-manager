import { createReadStream } from "fs";
import fs from 'fs/promises';
import path from 'path';

export const readFile = async (filePath, currentDir) => {
    try {
        const fullPath = path.join(currentDir, filePath);

        const stats = await fs.stat(fullPath);

        if (stats.isFile()) {
            const readStream = createReadStream(fullPath);
            readStream.pipe(process.stdout);
        } else {
            console.log('Invalid input: Not a file');
        }
    } catch (error) {
        console.error('Operation failed');
        console.error(error.message);
    }
};