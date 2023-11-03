module.exports = {
    "extends": [
        "next/core-web-vitals"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "no-console": "warn",
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
