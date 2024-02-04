import path from "path";
export const navigateUp = async () => {
    let currentDir = process.cwd();
    const parentDirectory = path.dirname(currentDir);

    try {
        process.chdir(parentDirectory);
        return process.cwd();
    } catch (error) {
        console.error('Error navigating up');
        console.error(error.message);
        return null;
    }
}