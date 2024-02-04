import fs from 'fs/promises';
import path from 'path';

export const renameFile = async (oldPath, newName, currentDir) => {
    try {
        const oldFullPath = path.join(currentDir, oldPath);
        const newFullPath = path.join(currentDir, newName);

        const stats = await fs.stat(oldFullPath);

        if (stats.isFile()) {
            await fs.rename(oldFullPath, newFullPath);
        } else {
            console.log('Invalid input: Not a file');
        }
    } catch (error) {
        console.error('Operation failed');
        console.error(error.message);
    }
};