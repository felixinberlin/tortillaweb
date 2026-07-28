# React + TypeScript + Vite + Tailwind CSS Project

This project is a modern web application built with **React**, **TypeScript**, and **Vite**, configured for optimal development experience and high performance.

## Tech Stack

The project utilizes the following key technologies and libraries:

- **Framework**: [React](https://react.dev/) (v19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **UI Components**:
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Base UI](https://mui.com/base-ui/)
- **Animations**: [Motion](https://motion.dev/) & [tw-animate-css](https://github.com/tonik/tw-animate-css)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Internationalization**: [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)
- **Linting**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode using Vite.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Lints the codebase using **Oxlint** for ultra-fast performance.

### `npm run preview`

Boot up a local static web server that serves the files from `dist` to preview the production build locally.

## Project Structure

- `src/` - Contains the main application source code.
  - `app/` - App-wide configurations and providers.
  - `assets/` - Static assets like images and fonts.
  - `components/` - Reusable React components.
  - `i18n/` - Internationalization configuration and translation files.
  - `lib/` - Utility functions and libraries.
  - `pages/` - Page components for routing.

## Development Setup

This template provides a minimal setup to get React working in Vite with HMR and Oxlint rules.
The project uses standard configuration files such as `vite.config.ts`, `tailwind.config.js` (or inline Tailwind config), and `tsconfig.json`.
