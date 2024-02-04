import fs from "fs/promises";

export const listDirectory = async (currentDir) => {
  try {
    const contents = await fs.readdir(currentDir);
    const sortedContents = contents.sort();

    for (const item of sortedContents) {
      const itemType = (
        await fs.stat(`${currentDir}/${item}`)
      ).isDirectory()
        ? "folder"
        : "file";
      console.log(`${item} (${itemType})`);
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
};
