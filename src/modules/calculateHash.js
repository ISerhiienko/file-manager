import { createReadStream } from 'fs';
import { createHash } from 'crypto';

export const calculateHash = async (file, currentDir) => {
    let filePath = `${currentDir}/${file}`;

    try {
        const hash = createHash('sha256');
        const stream = createReadStream(filePath);

        return new Promise((resolve, reject) => {
            stream.on('data', (data) => {
                hash.update(data);
            });

            stream.on('end', () => {
                const fileHash = hash.digest('hex');
                console.log(`Hash for ${filePath}: ${fileHash}`);
                resolve(fileHash);
            });

            stream.on('error', (error) => {
                reject(error);
            });
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
};