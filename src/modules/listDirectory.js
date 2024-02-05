import fs from "fs/promises";
import path from 'path';

export const listDirectory = async (currentDir) => {
  try {
    const contents = await fs.readdir(currentDir);
    const sortedContents = contents.sort();

    console.log("┌───────┬──────────────────────────┬───────┐");
    console.log("│ index │           name           │ type  │");
    console.log("├───────┼──────────────────────────┼───────┤");

    for (let i = 0; i < sortedContents.length; i++) {
      const item = sortedContents[i];
      const itemType = (
          await fs.stat(path.join(currentDir, item))
      ).isDirectory()
          ? "folder"
          : "file";

      console.log(
          `│ ${i + 1}\t│ ${item.padEnd(25)}│ ${itemType.padEnd(5)}│`
      );
    }

    console.log("└───────┴──────────────────────────┴───────┘");
  } catch (error) {
    console.error("Error:", error.message);
  }
};