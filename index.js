#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import { Command } from "commander";

const program = new Command();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .name("stacksmith")
  .description("CLI to scaffold fullstack projects")
  .argument("<type>", "frontend | backend | fullstack")
  .option("--with-redux", "Include Redux in frontend")
  .action(async (type, options) => {
    const { folderName } = await inquirer.prompt([
      {
        type: "input",
        name: "folderName",
        message: "Enter your project folder name:",
        default: "my-app",
      },
    ]);

    const spinner = ora("Scaffolding your project...").start();

    let template = "";
    if (type === "frontend") {
      template = options.withRedux ? "frontend-redux" : "frontend";
    } else if (type === "backend") {
      template = "backend";
    } else if (type === "fullstack") {
      template = "fullstack";
    } else {
      spinner.fail("Invalid project type.");
      console.log(chalk.red("Usage: frontend | backend | fullstack"));
      process.exit(1);
    }

    const projectDir = path.join(process.cwd(), folderName);
    const templateDir = path.join(__dirname, "templates", template);

    try {
      await fs.copy(templateDir, projectDir);
      spinner.succeed("Project created successfully!");
      console.log(chalk.green(`✅ ${type} project is ready in "${folderName}"`));

      const installSpinner = ora("Installing dependencies...").start();
      execSync("npm install", { stdio: "inherit", cwd: projectDir });
      installSpinner.succeed("Dependencies installed");

      console.log(chalk.cyan(`👉 cd ${folderName} && start building!`));
    } catch (err) {
      spinner.fail("Error setting up the project:");
      console.error(err);
    }
  });

program.parse();
