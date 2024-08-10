# Event Sourcing in Node.js

[![Build Workflow](https://github.com/jdevelop-io/event-sourcing-node/actions/workflows/build.yml/badge.svg)](https://github.com/jdevelop-io/event-sourcing-node/actions/workflows/build.yml)
[![Tests Workflow](https://github.com/jdevelop-io/event-sourcing-node/actions/workflows/tests.yml/badge.svg)](https://github.com/jdevelop-io/event-sourcing-node/actions/workflows/tests.yml)
[![License](https://img.shields.io/github/license/jdevelop-io/event-sourcing-node)](/LICENSE)
[![WakaTime](https://wakatime.com/badge/user/b5dd94a4-c0ea-4c12-9cb2-41f984e74fdc/project/47c69695-3734-473d-acd7-56443d4e9e3e.svg)](https://wakatime.com/badge/user/b5dd94a4-c0ea-4c12-9cb2-41f984e74fdc/project/47c69695-3734-473d-acd7-56443d4e9e3e)

This repository is a Node.js project created to demonstrate homemade event sourcing patterns for educational purposes. The project implements basic event sourcing concepts like event storage, replay, and eventual consistency without relying on external libraries. It's designed to help you understand the fundamentals of event sourcing in a practical, hands-on way.

## To Do

- [x] Create an abstract Aggregate class.
- [x] Create an abstract DomainEvent class.
- [x] Implement the ability to record events in an Aggregate.
- [x] Implement the ability to replay events in an Aggregate.
- [x] Create the EventStore interface.
- [x] Implement an in-memory EventStore.
- [x] Implement the ability to store events in an EventStore.
- [x] Implement the ability to replay events from an EventStore for a specific Aggregate.
- [ ] Implement the ability to replay events from an EventStore for all Aggregates ?
- [x] Create the Command interface.
- [x] Create the CommandHandler interface.
- [x] Create the CommandBus interface.
- [x] Implement an in-memory CommandBus.
- [x] Implement the ability to dispatch a command to a CommandBus.
- [x] Implement the ability to handle a command in a CommandHandler.
- [x] Create the QueryBus interface.
- [x] Implement an in-memory QueryBus.
- [x] Implement the ability to dispatch a query to a QueryBus.
- [x] Implement the ability to handle a query in a QueryHandler.
- [x] Create the EventBus interface.
- [x] Implement an in-memory EventBus.
- [x] Implement the ability to publish events to an EventBus.
- [x] Implement the ability to subscribe to events from an EventBus.

## Getting Started

### Prerequisites

Make sure you have Node.js and Bun installed on your machine before running the project.

- [Node.js](https://nodejs.org/) (v22.5.1 or later)
- [Bun](https://bun.sh/) (v1.1.17 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone --depth 1 https://github.com/jdevelop-io/event-sourcing-node.git
   cd event-sourcing-node
   ```

2. Remove the `.git` directory to start with a clean git history:

   ```bash
   rm -rf .git
   ```

3. Initialize a new git repository:

   ```bash
   git init
   ```

4. Install the dependencies:
   ```bash
   bun install
   ```

### Scripts

- `bun run build` : Build the project.
- `bun run test` : Run the tests.
- `bun run test:watch` : Run the tests in watch mode.
- `bun run test:coverage` : Run the tests with coverage.
- `bun run test:coverage:watch`: Run the tests with coverage in watch mode.
- `bun run lint` : Lint the code and fix linting errors.
- `bun run lint:check` : Check the code for linting errors.
- `bun run format` : Format the code and fix formatting errors.
- `bun run format:check` : Check the code for formatting errors.

### Project Structure

```plaintext
event-sourcing-node
├── .github
│   ├── workflows
│   │   ├── build.yml
│   │   └── tests.yml
├── node_modules
├── coverage
├── build
├── src
├── README.md
├── LICENSE
├── commitlint.config.mjs
├── eslint.config.mjs
├── jest.config.ts
├── lint-staged.config.mjs
├── prettier.config.mjs
├── tsconfig.json
├── bun.lockb
└── package.json
```

### Contributing

Contributions are welcome! If you have any ideas, suggestions, or issues, feel free to open an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
