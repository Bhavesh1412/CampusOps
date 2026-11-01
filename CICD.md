# CampusOps CI/CD Guide

This guide explains how CampusOps uses GitHub Actions and Docker Compose. The workflow currently provides continuous integration: every push to `main`/`master` and every pull request is checked automatically.

## 1. Push the project to GitHub

Create a repository named `CampusOps` under the GitHub account `Bhavesh1412`, then push the project:

```bash
git add .
git commit -m "Add CampusOps CI pipeline"
git branch -M main
git push -u origin main
```

The workflow is stored at `.github/workflows/ci.yml`.

## 2. What the pipeline does

The `CampusOps CI` workflow:

1. Checks out the repository.
2. Installs Node.js 22.
3. Installs root, backend, and frontend dependencies.
4. Checks backend JavaScript syntax.
5. Builds the React frontend.
6. Validates `docker-compose.yml`.
7. Builds the backend and frontend Docker images.

Open the repository's **Actions** tab to see each run. A green check means the commit passed all of these checks.

## 3. Add a GitHub Actions badge

The main README contains this badge:

```md
[![CampusOps CI](https://github.com/Bhavesh1412/CampusOps/actions/workflows/ci.yml/badge.svg)](https://github.com/Bhavesh1412/CampusOps/actions/workflows/ci.yml)
```

After the first successful workflow run, it will show a green `passing` badge. This is the public CI status indicator for the repository.

## 4. Run the same checks locally

```bash
npm ci
npm ci --prefix backend
npm ci --prefix frontend
npm run build --prefix frontend
docker compose config --quiet
docker compose build
```

Docker Desktop must be running for the final two commands.

## 5. Run the local container stack

Create a root `.env` file with a JWT secret:

```env
JWT_SECRET=use-a-long-random-value
```

Start the stack and seed demo data:

```bash
docker compose up --build -d
docker compose exec backend node src/seed.js
```

The frontend is available at `http://localhost:5173`; the API health endpoint is `http://localhost:5000/api/health`.

## 6. CI versus CD

CI is implemented now. It verifies that changes are safe to merge. CD is the next stage: publish the Docker images to a registry and deploy them to a server or cloud environment after a successful `main` build.

Do not put MongoDB passwords, Atlas URLs, JWT secrets, or registry credentials in the repository. Store deployment credentials in GitHub **Settings → Secrets and variables → Actions**.
