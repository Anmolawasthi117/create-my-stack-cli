#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import prompts from "prompts";
import { execSync } from "child_process";
import ora from "ora";
import chalk from "chalk";
import { Command } from "commander";

const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesDir = path.join(__dirname, "templates");

program
  .name("stacksmith")
  .description("CLI to scaffold fullstack apps with Vite + Tailwind + backend")
  .argument("<template>", "template to use (frontend | backend | fullstack)")
  .action(async (template) => {
    const validTemplates = ["frontend", "backend", "fullstack"];
    if (!validTemplates.includes(template)) {
      console.error(chalk.red(`❌ Invalid template: ${template}`));
      console.log(`Available templates: ${validTemplates.join(", ")}`);
      process.exit(1);
    }

    const response = await prompts({
      type: "text",
      name: "folder",
      message: "Enter your project folder name:",
      validate: (val) => (val ? true : "Folder name cannot be empty"),
    });

    const projectPath = path.resolve(process.cwd(), response.folder);

    if (fs.existsSync(projectPath)) {
      console.error(chalk.red("❌ Folder already exists!"));
      process.exit(1);
    }

    const spinner = ora("Scaffolding your project...").start();

    try {
      await fs.copy(path.join(templatesDir, template), projectPath);
      spinner.succeed("Project created successfully!");
      console.log(chalk.green(`✅ ${template} project is ready in "${response.folder}"`));

      // Handle dependency installs
      if (template === "fullstack") {
        const clientPath = path.join(projectPath, "client");
        const serverPath = path.join(projectPath, "server");

        if (fs.existsSync(clientPath)) {
          console.log("📦 Installing frontend dependencies...");
          execSync("npm install", { cwd: clientPath, stdio: "inherit" });
        }

        if (fs.existsSync(serverPath)) {
          console.log("📦 Installing backend dependencies...");
          execSync("npm install", { cwd: serverPath, stdio: "inherit" });
        }
      } else {
        execSync("npm install", { cwd: projectPath, stdio: "inherit" });
      }

      console.log(chalk.green("🚀 All set! Happy hacking."));
    } catch (err) {
      spinner.fail("❌ Failed to setup project.");
      console.error(err);
    }
  });

program.parse(process.argv);
