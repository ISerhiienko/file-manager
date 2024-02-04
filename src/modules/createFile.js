import fs from 'fs/promises';
import path from 'path';
import {BLACK, GREEN} from "../index.js";

export const createFile = async (fileName) => {
    try {
        let dir = process.cwd();
        const fullPath = path.join(dir, fileName);

        fs.writeFile(fullPath, '');

        console.log(`${GREEN}You are currently in ${dir}${BLACK}\u001b[0m`);
    } catch (error) {
        console.error('Operation failed');
        console.error(error.message);
    }
};