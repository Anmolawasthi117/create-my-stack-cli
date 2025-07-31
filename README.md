
# @anmol117/stacksmith 🚀

`@anmol117/stacksmith` is a simple CLI tool to scaffold fullstack projects with a pre-configured stack. It supports frontend, backend, and fullstack templates with options like Redux, TailwindCSS, React Router, and Express.js.

## 📦 Features

- ⚡ Create frontend, backend, or fullstack boilerplates
- 🧩 Optional Redux for frontend
- 💨 Tailwind CSS + React Router setup
- 🧱 Express backend setup
- 📁 Auto-create folder structure
- ⚙️ Auto install dependencies
- 🧹 Adds `.gitignore` and `README.md` for you

---

## 🛠️ Installation

```bash
npm install -g @anmol117/stacksmith
````

Or use directly with `npx`:

```bash
npx @anmol117/stacksmith
```

---

## ⚙️ Usage

```bash
@anmol117/stacksmith <type> [options]
```

### Example

```bash
@anmol117/stacksmith frontend --with-redux
```

You’ll be prompted to enter a folder name. The project will be scaffolded and dependencies auto-installed.

---

## 📂 Template Types

* `frontend` → React + Vite + Tailwind + React Router
* `frontend --with-redux` → React + Redux Toolkit + Vite + Tailwind
* `backend` → Node.js + Express + dotenv
* `fullstack` → Combined frontend + backend with folder structure

---

## 👀 Project Structure Example (Fullstack)

```
my-app/
├── client/            # Frontend (React)
└── server/            # Backend (Express)
```

---

## 📄 License

MIT © [Anmol](https://github.com/Anmolawasthi117)


