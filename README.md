# Cloudshell

<div align="center">
	<img src="./client/public/logo.png">
</div>

## Description

Cloudshell allows users to create `virtual Operating systems` using Docker containers.
Users get a interactive `Terminal` inside their browser to interact with various operating systems.
including **Ubuntu**, **Fedora**, **Arch**, and **Debian**.

## Tech Stack

- **Frontend**: TypeScript, ReactJs, Shadcn
- **Backend**: TypeScript, Node.js, Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Containerization**: Docker

## Features

- Create and manage virtual Operating systems from your browser.
- Support for multiple Linux distributions.
- Lightweight and efficient use of resources through Docker containers.

## Contributing

Contributions are always welcome!

Check out `Issues` or create `new Issues`

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed in your system:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (version 18.x or later)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Clone the Repository

```bash
git clone https://github.com/Rajeshpatel07/cloudshell.git
```

- Go to /client and /server and install dependencies.

```bash
yarn install
```

- For the `.env` checkout the `.env.sample` for the server.

- To run the development server just this command in both /client and /server.

```bash
yarn dev
```

- It will be available on `http://localhost:5173`.
