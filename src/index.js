import readline from "readline";
import { listDirectory } from "./modules/listDirectory.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const USERNAME = process.argv
  .slice(2)
  .find((arg) => arg.startsWith("--username="))
  .split("=")[1];

export const getCurrentWorkingDirectory = () => process.cwd();

const displayWelcomeMessage = () => {
  console.log(
    `Welcome to the File Manager, ${USERNAME}!\nYou are currently in ${getCurrentWorkingDirectory()}`
  );
};

const printCurrentDirectory = async () => {
  console.log(`You are currently in ${getCurrentWorkingDirectory()}`);
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
      await listDirectory(getCurrentWorkingDirectory);
      break;

    default:
      console.log("Invalid input");
  }
};

rl.on("line", async (input) => {
  await processInput(input);
});

rl.on("close", () => {
  printGoodbyeMessage();
  process.exit(0);
});
