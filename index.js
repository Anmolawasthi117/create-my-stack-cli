#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import chalk from "chalk";
import ora from "ora";
import { program } from "commander";
import prompts from "prompts";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .name("create-my-stack")
  .description("CLI to scaffold fullstack projects")
  .argument("<type>", "frontend | backend | fullstack")
  .option("--with-redux", "Include Redux in frontend")
  .action(async (type, options) => {
    const response = await prompts({
      type: "text",
      name: "folderName",
      message: "Enter your project folder name:",
      initial: "my-app"
    });

    const folderName = response.folderName.trim();
    const projectDir = path.join(process.cwd(), folderName);
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

    const templateDir = path.join(__dirname, "templates", template);

    try {
      await fs.copy(templateDir, projectDir);

      // Install dependencies
      execSync("npm install", { cwd: projectDir, stdio: "inherit" });

      spinner.succeed("Project created and dependencies installed!");

      console.log(chalk.green("✅ All set!"));
      console.log(chalk.cyan(`👉 cd ${folderName}`));
    } catch (err) {
      spinner.fail("Error setting up the project:");
      console.error(err);
    }
  });

program.parse();
