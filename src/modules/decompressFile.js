import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";

export const decompressFile = async (
  inputFilePath,
  outputFilePath,
  currentDir
) => {
  const sourceFullPath = `${currentDir}/${inputFilePath}`;
  const destinationFullPath = `${currentDir}/${outputFilePath}`;

  try {
    const readStream = createReadStream(sourceFullPath);
    const writeStream = createWriteStream(destinationFullPath);
    const compressStream = createBrotliDecompress();

    await pipeline(readStream, compressStream, writeStream);
    console.log("File decompressed successfully!");
  } catch (error) {
    console.error("Error decompressing file:", error.message);
  }
};
