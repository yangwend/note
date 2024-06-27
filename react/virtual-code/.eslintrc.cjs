module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["@pluve/eslint-config-sumire/react"],
  parserOptions: {
    ecmaVersion: 2020,
    project: ["./tsconfig.json"],
  },
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["*.js"],
  rules: {
    complexity: "off",
    "max-params": ["error", 6],
    "lines-between-class-members": ["error", "always"],
    "@typescript-eslint/typedef": [
      "error",
      {
        arrowParameter: false,
        variableDeclaration: false,
        memberVariableDeclaration: false,
        parameter: true,
        propertyDeclaration: false,

        variableDeclarationIgnoreFunction: true,
      },
    ],
    "@typescript-eslint/no-explicit-any":["warn"],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/no-non-null-assertion": ["warn"],
  },
};
