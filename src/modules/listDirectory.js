import fs from "fs/promises";

export const listDirectory = async ( getCurrentWorkingDirectory) => {
  try {
    const contents = await fs.readdir(getCurrentWorkingDirectory());
    const sortedContents = contents.sort();

    for (const item of sortedContents) {
      const itemType = (
        await fs.stat(`${getCurrentWorkingDirectory()}/${item}`)
      ).isDirectory()
        ? "folder"
        : "file";
      console.log(`${item} (${itemType})`);
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
};
