import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";
import { pipeline } from "stream/promises";

export const compressFile = async (
  inputFilePath,
  outputFilePath,
  currentDir
) => {
  const sourceFullPath = `${currentDir}/${inputFilePath}`;
  const destinationFullPath = `${currentDir}/${outputFilePath}`;

  try {
    const readStream = createReadStream(sourceFullPath);
    const writeStream = createWriteStream(destinationFullPath);
    const compressStream = createBrotliCompress();

    await pipeline(readStream, compressStream, writeStream);
    console.log("File compressed successfully!");
  } catch (error) {
    console.error("Error compressing file:", error.message);
  }
};
