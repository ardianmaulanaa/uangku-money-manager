# Contributing to Uangku

Thank you for contributing to Uangku.

This document defines the development workflow, coding standards, and quality requirements for the Uangku project.

## 1. Project Setup

### Prerequisites

- Node.js LTS compatible with the installed Next.js version
- npm
- Git
- Visual Studio Code or another compatible editor

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd uangku
```

Install dependencies:

```bash
npm install
```

Configure environment variables when required. Use `.env.example` as the reference if it exists.

Start the development server:

```bash
npm run dev
```

The application runs at `http://localhost:3000` by default.

## 2. Development Workflow

Before starting any development task:

1. Understand the feature requirements.
2. Review the relevant existing implementation.
3. Create a dedicated Git branch.
4. Implement focused changes.
5. Validate functionality and code quality.
6. Review the changes before committing.
7. Open a pull request when collaboration is enabled.

Avoid unnecessary changes to unrelated files.

## 3. Git Branching Convention

Use descriptive branch names.

| Prefix      | Purpose                       |
| ----------- | ----------------------------- |
| `feature/`  | New functionality             |
| `fix/`      | Bug fixes                     |
| `refactor/` | Internal code improvements    |
| `docs/`     | Documentation updates         |
| `chore/`    | Maintenance and configuration |
| `test/`     | Adding or updating tests      |

Examples:

- `feature/dashboard`
- `feature/transaction-management`
- `fix/balance-calculation`
- `refactor/transaction-service`
- `docs/update-readme`

The `main` branch should contain stable code.

## 4. Commit Message Convention

Follow Conventional Commits.

Format:

`type(scope): description`

Examples:

- `feat(dashboard): add financial overview`
- `feat(transaction): implement income form`
- `fix(balance): correct balance calculation`
- `refactor(ui): simplify sidebar component`
- `docs(readme): update setup instructions`
- `chore(config): update eslint configuration`

Write commit messages that clearly describe the change.

## 5. Coding Standards

### TypeScript

- Use TypeScript consistently.
- Avoid `any` whenever possible.
- Define clear interfaces or types.
- Use descriptive names.
- Do not suppress type errors without justification.

### Next.js and React

- Follow Next.js App Router conventions.
- Prefer Server Components by default.
- Use Client Components when interactivity is required.
- Keep components focused and reusable.
- Follow the Rules of React.
- Avoid unnecessary dependencies.

### Styling

- Use Tailwind CSS.
- Maintain consistent spacing and typography.
- Support mobile and desktop layouts.
- Follow accessibility best practices.
- Reuse existing UI components.

### Project Structure

- Keep routes in `src/app`.
- Place shared UI in `src/components`.
- Keep feature-specific logic organized.
- Extract reusable utilities into `src/lib`.
- Avoid unnecessary files and abstractions.

## 6. Code Quality and Validation

Before submitting changes, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Run relevant automated tests when available.

All commands must pass before merging.

Do not bypass linting or TypeScript errors simply to make a build succeed.

## 7. Pull Request Guidelines

Every pull request should include:

### Description

Explain the purpose of the changes.

### Changes

Summarize implemented features, fixes, or refactoring.

### Testing

Describe how the changes were verified.

### Screenshots

Include screenshots for relevant UI changes.

### Checklist

- [ ] Code follows project conventions.
- [ ] Linting passes.
- [ ] TypeScript validation passes.
- [ ] Relevant tests pass.
- [ ] No secrets are included.
- [ ] Documentation is updated when necessary.
- [ ] No unrelated changes are included.

Do not merge changes with unresolved critical issues.

## 8. Security Guidelines

- Never commit passwords, tokens, or API keys.
- Keep sensitive configuration in environment variables.
- Validate untrusted input on the server.
- Protect user-specific financial information.
- Enforce authentication and authorization.
- Avoid exposing sensitive details in logs.
- Never commit `.env.local` or production credentials.
- Do not modify production financial data without explicit authorization.

## 9. AI-Assisted Development

AI coding assistants may be used to support development.

All AI-generated changes must:

- Follow `AGENTS.md`.
- Follow this contributing guide.
- Be reviewed before merging.
- Pass relevant quality checks.
- Avoid introducing unverified dependencies.
- Preserve existing functionality.

Developers remain responsible for reviewing and validating AI-generated code.

## 10. Final Contribution Rules

Before completing a contribution:

1. Confirm the requested functionality works.
2. Check for unintended changes.
3. Run applicable validation commands.
4. Review security implications.
5. Ensure the changes are maintainable.
6. Provide a clear summary of the implementation.

The goal is to maintain a clean, secure, scalable, and reliable Uangku application.
