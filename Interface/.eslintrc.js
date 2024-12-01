module.exports = {
  // parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Permite el análisis de JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Indica a eslint-plugin-react que detecte automáticamente la versión de React a usar
    },
  },
  extends: [
    'plugin:react/recommended', // Utiliza las reglas recomendadas de @eslint-plugin-react
    'plugin:prettier/recommended', // Habilita eslint-plugin-prettier y eslint-config-prettier. Esto mostrará errores de prettier como errores de ESLint. Asegúrate de que esta sea siempre la última configuración en el array de extends.
  ],
  plugins: ['react', 'react-hooks'],
  rules: {
    // Lugar para especificar reglas de ESLint. Se puede usar para sobrescribir reglas especificadas desde las configuraciones extendidas
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
}
