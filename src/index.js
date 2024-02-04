import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const USERNAME = process.argv
  .slice(2)
  .find((arg) => arg.startsWith("--username="))
  .split("=")[1];

const getCurrentWorkingDirectory = () => process.cwd();

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

rl.on("close", () => {
  printGoodbyeMessage();
  process.exit(0);
});
