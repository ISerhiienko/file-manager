import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';

export const copyFile = async (sourcePath, destinationPath, currentDir) => {
    try {
        const sourceFullPath = path.join(currentDir, sourcePath);
        const destinationFullPath = path.join(currentDir, destinationPath);

        const sourceStats = await fs.stat(sourceFullPath);

        if (sourceStats.isFile()) {
            const destinationIsDir = (await fs.stat(destinationFullPath)).isDirectory();

            const destinationFinalPath = destinationIsDir
                ? path.join(destinationFullPath, path.basename(sourceFullPath))
                : destinationFullPath;

            const readStream = createReadStream(sourceFullPath);
            const writeStream = createWriteStream(destinationFinalPath);

            await new Promise((resolve, reject) => {
                readStream.pipe(writeStream);

                writeStream.on('close', () => {
                    resolve();
                });

                writeStream.on('error', (error) => {
                    reject(error);
                });
            });

            console.log(`File copied from ${sourceFullPath} to ${destinationFinalPath}`);
        } else {
            console.log('Invalid input: Not a file');
        }
    } catch (error) {
        console.error('Operation failed');
        console.error(error.message);
    }
};