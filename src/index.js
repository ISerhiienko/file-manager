import readline from "readline";
import { listDirectory } from "./modules/listDirectory.js";
import { navigateUp } from "./modules/navigateUp.js";
import { navigateToDirectory } from "./modules/navigateToDirectory.js";
import { readFile } from "./modules/readFile.js";
import { createFile } from "./modules/createFile.js";
import { renameFile } from "./modules/renameFile.js";
import { copyFile } from "./modules/copyFile.js";
import { moveFile } from "./modules/moveFile.js";
import { deleteFile } from "./modules/deleteFile.js";
import { showOsInfo } from "./modules/showOsInfo.js";
import { calculateHash } from "./modules/calculateHash.js";
import { compressFile } from "./modules/compressFile.js";
import { decompressFile } from "./modules/decompressFile.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const USERNAME = process.argv
  .slice(2)
  .find((arg) => arg.startsWith("--username="))
  .split("=")[1];

export const currentDir = process.cwd();

export const BLUE = "\u001b[34m";
export const GREEN = "\u001b[32m";
export const BLACK = "\u001b[40m";

const displayWelcomeMessage = () => {
  console.log(`${BLUE}Welcome to the File Manager, * ${USERNAME}! *
You are currently in:
${GREEN}⇨ ${currentDir}${BLACK}\u001b[0m
`);
};

export const printCurrentDirectory = async () => {
  console.log(`${GREEN}You are currently in ${currentDir}${BLACK}\u001b[0m`);
};

const printGoodbyeMessage = () => {
  console.log(`Thank you for using File Manager, ${USERNAME}, goodbye!`);
};

displayWelcomeMessage();

const processInput = async (input) => {
  const [command, ...args] = input.split(" ");

  switch (command) {
    case "ls":
      await printCurrentDirectory();
      await listDirectory(currentDir);
      break;

    case "up":
      await navigateUp();
      await printCurrentDirectory();
      await listDirectory(currentDir);
      break;

    case "cd":
      await navigateToDirectory(args[0]);
      break;

    case "cat":
      await readFile(args[0], currentDir);
      break;

    case "add":
      await createFile(args[0]);
      break;

    case "rn":
      await renameFile(args[0], args[1], currentDir);
      await printCurrentDirectory();
      break;

    case "cp":
      await copyFile(args[0], args[1], currentDir);
      await printCurrentDirectory();
      break;

    case "mv":
      await moveFile(args[0], args[1], currentDir);
      await printCurrentDirectory();
      break;

    case "rm":
      await deleteFile(args[0], currentDir);
      await printCurrentDirectory();
      break;
    case "os":
      await showOsInfo(args[0]);
      break;
    case "hash":
      await calculateHash([args[0]], currentDir);
      break;
    case "compress":
      await compressFile(args[0], args[1], currentDir);
      await printCurrentDirectory();
      break;
    case "decompress":
      await decompressFile(args[0], args[1], currentDir);
      await printCurrentDirectory();
      break;

    default:
      console.log(`Invalid input`);
  }
};

rl.on("line", async (input) => {
  await processInput(input);
});

rl.on("close", () => {
  printGoodbyeMessage();
  process.exit(0);
});
