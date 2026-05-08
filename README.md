
# Project info

This is the personal projects website of Hugo Dettner Källander.

## Steps to run the project locally

```sh
# Step 1: Install the necessary dependencies.
npm i

# Step 2: Start the development server.
npm run dev
```

## Technologies used for this project

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## GitHub Pages deployment setup (beginner step-by-step)

This repository uses GitHub Actions to build and deploy:

- **Production deploy**: only from `main`
- **Preview deploy**: from pull requests

### 1) Confirm Pages source is GitHub Actions

1. Open the repository on GitHub.
2. Click **Settings**.
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment**:
   - Set **Source** to **GitHub Actions**.
5. Click **Save** if shown.

### 2) Configure production environment protection

1. Go to **Settings** → **Environments**.
2. Open environment **github-pages** (create it if it does not exist).
3. In deployment branch rules:
   - Allow only branch **main**.
4. (Recommended) Add required reviewers for production deployments.
5. Save the environment.

### 3) Configure preview behavior

PR preview deployments are created from pull request branches, not from `main`.

To avoid branch-rule conflicts, this workflow does not assign an environment to the preview deployment job. Keep production protections on `github-pages` and let preview deploy from pull requests.

### 4) Understand workflow behavior in this repository

The workflow is in `.github/workflows/deploy.yml`.

- `push` on `main`:
  - `build` runs
  - `deploy-production` runs (production deploy)
- `pull_request`:
  - `build` runs
  - `deploy-preview` runs (preview deploy)

### 5) Local validation before pushing changes

From the repository root:

```sh
npm ci
npm run lint
npm run build
```

### 6) Daily development flow

1. Pull latest `main`.
2. Create a feature branch.
3. Make your changes.
4. Run local validation (`npm run lint` and `npm run build`).
5. Push branch and open a pull request.
6. Wait for CI checks to finish.
7. Open the preview deployment URL and verify behavior.
8. Merge when everything looks correct.
9. Confirm production deploy after merge to `main`.

### 7) How to verify preview deploy

1. Open the pull request.
2. Open the **Checks** tab.
3. Open the **Deploy to GitHub Pages** workflow run.
4. Confirm:
   - `build` job passed
   - `deploy-preview` job passed
5. Open the deployment URL from the workflow/deployment details.

### 8) How to verify production deploy

1. Merge PR to `main`.
2. Open **Actions**.
3. Open latest **Deploy to GitHub Pages** run for `main`.
4. Confirm:
   - `build` job passed
   - `deploy-production` job passed
5. Open the live site and verify the latest change is visible.

### 9) Troubleshooting quick map

- **Lint/build fails**: run locally with `npm ci`, `npm run lint`, `npm run build` and fix reported errors.
- **Artifact upload fails**: check that build output path is `dist`.
- **Preview deploy blocked**: check repository/organization deployment policies and ensure PR deployments are allowed.
- **Production deploy blocked**: check `github-pages` environment branch rules, approvals, and permissions.

### 10) Maintenance checklist

Monthly or quarterly:

1. Review workflow action versions in `.github/workflows/deploy.yml`.
2. Update to supported major versions when needed.
3. Test updates in a pull request before merging.
