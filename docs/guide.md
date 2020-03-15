# Developer Guide

### 1. Naming convention

#### 1.1 Files

- **TitleCase**

  **TitleCase** is only used for React components.

- **camelCase**

  **camelCase** is used for all JavaScript files and json files, including models, utils etc.

      Use only singular term for models and utils, for instance,
      the file name for account model should be named account.js instead of accounts.js

#### 1.2 Codebase

- **Constants**

  Use **UPPER_SNAKE_CASE** for constants with value defined at compile time, and use **camelCase** for those with value computed at runtime.

- **Variables**

  Use **camelCase** for all variables.

### 2. How to work on a new feature, bug fixing or refactoring?

2.1. [Optional] Move your card on GitHub project page to **In Progress** if you'll be working on a planned feature.

2.2. Always branch out from the **master branch** and follow the naming convention:

- If it's for a new feature, please name your branch **feature/something**
- If it's for bug fixing, please name your branch **fix/something**
- If it's for code cleaning up or tree shaking, please name your branch **chore/something**
- If it's a major code refactoring, please name your branch **refactor/something**

**_PRs not using the correct naming convention will not be accepted._**

2.3. Your PR will need code owner's approval to be merged to the master branch.

     Rebase is prohibited. There are many articles about merging vs rebasing,
     and we use only merging for this project.

2.4. Delete your branch after it's merged.

2.5. [Optional] Move your card to **Done** if your PR is merged to the master branch

### 3. GitHub project page

I use GitHub project page to manage the development tasks. Don't worry, it's not like a sprint board or anything.
