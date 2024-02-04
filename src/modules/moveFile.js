import fs from 'fs/promises';
import path from 'path';

export const moveFile = async (sourcePath, destinationPath, currentDir) => {
    try {
        const sourceFullPath = path.join(currentDir, sourcePath);
        const destinationFullPath = path.join(currentDir, destinationPath);
        const sourceStats = await fs.stat(sourceFullPath);

        if (sourceStats.isFile()) {
            const destinationIsDir = (await fs.stat(destinationFullPath)).isDirectory();

            const destinationFinalPath = destinationIsDir
                ? path.join(destinationFullPath, path.basename(sourceFullPath))
                : destinationFullPath;

            await fs.rename(sourceFullPath, destinationFinalPath);

            console.log(`File moved from ${sourceFullPath} to ${destinationFinalPath}`);
        } else {
            console.log('Invalid input: Not a file');
        }
    } catch (error) {
        console.error('Operation failed');
        console.error(error.message);
    }
};