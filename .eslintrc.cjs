module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
	"no-unused-vars": "off",
	"@typescript-eslint/no-inferrable-types" : "off",
	"@typescript-eslint/no-unused-vars": "off",
    },
    root: true,
};
