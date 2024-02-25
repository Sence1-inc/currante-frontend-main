# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
# currante-frontend-main

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```
   git clone git@github.com:Sence1-inc/currante-frontend-main.git
   ```

2. Navigate to the project directory:

   ```
   cd currante-frontend-main
   ```

3. Install dependencies:

   ```
   npm install
   ```

### Development

To start the development server, run:

```
npm run dev
```

This will start the development server and open your default web browser to display the application.

### Building for Production

To build the application for production, run:

```
npm run build
```

This will generate a production-ready build in the `dist` directory.

## Additional Configuration

### Import without File Extension

In this project, you can import TypeScript and TypeScript React files without specifying the file extension (`.ts` or `.tsx`). Vite is configured to resolve these file types automatically.

For example:

```
import MyComponent from './components/MyComponent';
```

### Backend API

To use the APIs in this project, you need to run the `currante-backend-main` backend server. Please refer to the backend documentation for instructions on setting up and running the backend server.

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
