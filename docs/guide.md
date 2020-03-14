# Developer Guide

## File naming convention

### TitleCase

**TitleCase** is only used for React components.

### camelCase

**camelCase** is used for all JavaScript files and json files, including models, utils etc.

Use only singular term for models and utils, for instance, the file name for account model should be named **account.js** instead of accounts.js

## Coding naming convention

### Constants

Use **UPPER_SNAKE_CASE** for constants with value defined at compile time, and use **camelCase** for those with value computed at runtime.

### Variables

Use **camelCase** for all variables.

## Pull Request naming convention

- If it's for a new feature, please name your PR **feature/something**
- If it's for bug fixing, please name your PR **fix/something**
- If it's for code cleaning up or tree shaking, please name your PR **chore/something**
- If it's a major code refactoring, please name your PR **refactor/something**

PRs not using the correct naming convention will not be accepted.

## GitHub project page

I use GitHub to track the development status. Don't worry, it's not a sprint board or anything.
