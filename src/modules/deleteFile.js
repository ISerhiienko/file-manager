import fs from 'fs/promises';
import path from 'path';

export const deleteFile = async (filePath, currentDir) => {
    try {
        const fullPath = path.join(currentDir, filePath);
        const stats = await fs.stat(fullPath);

        if (stats.isFile()) {
            await fs.unlink(fullPath);
            console.log(`File deleted: ${fullPath}`);
        } else {
            console.log('Invalid input: Not a file');
        }
    } catch (error) {
        console.error('Operation failed');
        console.error(error.message);
    }
};