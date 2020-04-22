# ESLint Reporter for GitHub Actions

[![Test status](https://github.com/jamesacarr/eslint-formatter-github-actions/workflows/tests/badge.svg)](https://github.com/jamesacarr/eslint-formatter-github-actions/actions?query=workflow%3Atests)
[![NPM badge](https://img.shields.io/npm/v/@jamesacarr/eslint-formatter-github-actions.svg)](https://www.npmjs.com/package/@jamesacarr/eslint-formatter-github-actions)

A custom formatter for ESLint that creates annotations when run via GitHub Actions

## Installation

```sh
npm install -D @jamesacarr/eslint-formatter-github-actions
```

Or, event better:

```sh
yarn add -D @jamesacarr/eslint-formatter-github-actions
```

## Usage

To get annotations working in your GitHub Actions runs, you need to run ESLint with the `--format` or `-f` flag. For example:

```sh
eslint -f @jamesacarr/github-actions
```

You can also use this formatter if you're using [XO](https://github.com/xojs/xo):

```sh
xo --reporter @jamesacarr/github-actions
```
