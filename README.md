# Greedy algorithms with Vue

## Requirements

- Node 18

### Recommendations

If you have Docker installed and you're using VS Code, one good way is installing the [Dev Containers extension](https://code.visualstudio.com/docs/devcontainers/containers). By using this, you will avoid installations in your laptop and a container will be created for you with all necessary requirements

## Usage

Make sure to install node dependencies first

```sh
npm install
```

Then, spin up dev environment

```sh
npm run dev
```

The above command should print out the URL where you can access the application

## Instructions

### Coin list

- It must be a list of integers separated by comma with no spaces. Example: 1,5,10
- Current implementation assumes that coin list is **sorted ascending**
- No checks have been implemented to verify that coin list is sorted ascending properly

### Change

- Only one integer value

## Test

Just run

```sh
npm run test:unit
```
