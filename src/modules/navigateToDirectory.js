import fs from 'fs/promises';
import path from 'path';
import {listDirectory} from "./listDirectory.js";
import {BLACK, GREEN} from "../index.js";

export const navigateToDirectory = async (directory) => {
    try {
        if (!directory) {
            console.log('Invalid input: Directory is undefined');
            return;
        }

        const currentDir = process.cwd();
        const targetDirectory = path.resolve(currentDir, directory);
        const targetStats = await fs.stat(targetDirectory);

        if (targetStats.isDirectory()) {
            process.chdir(targetDirectory);

            console.log(`${GREEN}You are currently in ${targetDirectory}${BLACK}\u001b[0m`);
            await listDirectory(targetDirectory);
        } else {
            console.log('Invalid input: Not a directory');
        }
    } catch (error) {
        console.error('Operation failed');
        console.error(error.message);
    }
}