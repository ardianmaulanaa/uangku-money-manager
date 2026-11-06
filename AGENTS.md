# AGENTS.md — Uangku

## 1. Project Overview

Uangku is a personal finance management web application
built with Next.js, TypeScript, and Tailwind CSS.

The application aims to provide a clean, secure,
responsive, and maintainable financial dashboard.

### Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- React Compiler: Enabled
- Cache Components: Disabled
- Package Manager: npm
- Import Alias: @/\*
- Source Directory: src/

Do not assume additional technologies are installed.
Inspect package.json before using new dependencies.

## 2. Agent Responsibilities

For every coding task:

1. Understand the request before modifying code.
2. Inspect relevant existing files and conventions.
3. Prefer small, focused changes.
4. Reuse existing components and utilities.
5. Avoid unnecessary dependencies.
6. Preserve existing working functionality.
7. Explain significant technical decisions.
8. Validate changes before reporting completion.

Do not create unrelated features or refactor unrelated code.

## 3. Project Architecture

Follow this structure when applicable:

src/
app/ - Routes, layouts, loading and error UI
components/ - Reusable UI components
features/ - Feature-specific components and logic
hooks/ - Reusable custom React hooks
lib/ - Utilities and shared services
types/ - Shared TypeScript definitions

Create directories only when needed.

Keep business logic separate from presentation logic.

Avoid putting complex business logic directly
inside page.tsx or layout.tsx.

## 4. Next.js Rules

- Use the App Router.
- Prefer Server Components by default.
- Use Client Components only when necessary.
- Keep "use client" boundaries as small as possible.
- Never expose server secrets to Client Components.
- Use Next.js navigation and routing conventions.
- Use next/image for suitable application images.
- Handle loading, empty, and error states.
- Follow existing data-fetching conventions.

React Compiler is enabled.

Follow the Rules of React.
Do not add unnecessary manual memoization.

Cache Components is disabled.
Do not enable it without explicit approval.

Prioritize fresh data for financial information.

## 5. TypeScript Rules

- Use strict TypeScript conventions.
- Avoid `any` and unsafe type assertions.
- Define clear types for component props.
- Prefer type-safe function parameters.
- Use descriptive variable and function names.
- Avoid unnecessary complexity.
- Use the @/\* import alias.

Do not suppress TypeScript errors without justification.

## 6. UI and Styling Rules

- Use Tailwind CSS for styling.
- Build responsive, mobile-friendly interfaces.
- Maintain consistent spacing and typography.
- Prefer reusable components for repeated UI.
- Use semantic HTML.
- Ensure keyboard accessibility.
- Provide appropriate labels for form inputs.
- Include loading, error, and empty states.
- Keep interfaces clean and easy to understand.

Do not introduce another UI library without approval.

## 7. Financial Data Rules

For financial features:

- Use accurate monetary representations.
- Avoid floating-point arithmetic for money.
- For IDR, prefer integer rupiah amounts.
- Format currency using the Indonesian locale.
- Validate all financial inputs on the server.
- Reject invalid or unauthorized transactions.
- Ensure users can access only their own data.
- Keep financial calculations deterministic.
- Protect transaction integrity.

When a database is introduced, select suitable
integer or decimal types for monetary values.

## 8. Security Rules

- Never hardcode passwords, tokens, or API keys.
- Store secrets in environment variables.
- Never expose sensitive environment variables.
- Validate untrusted input on the server.
- Enforce authorization on protected operations.
- Never trust user IDs supplied by the client.
- Avoid logging sensitive financial information.
- Do not commit .env or credentials.
- Follow secure authentication practices.

## 9. Code Quality

Before completing a code change:

1. Review the affected files.
2. Run npm run lint if the script exists.
3. Run npx tsc --noEmit.
4. Run relevant tests if configured.
5. Run npm run build when appropriate.
6. Fix errors introduced by the change.

Do not claim tests passed unless they were executed.

Do not use `next lint`, which is removed in Next.js 16.

## 10. Git and Change Management

- Do not commit or push without explicit approval.
- Do not delete unrelated files.
- Do not overwrite user changes unnecessarily.
- Avoid large unrelated refactors.
- Never commit sensitive credentials.
- Keep changes easy to review.

## 11. Agent Response Format

After implementing a task, report:

1. Summary of changes.
2. Files created or modified.
3. Validation commands and results.
4. Remaining issues or limitations.
5. Suggested next step, if relevant.

Keep explanations concise and technically accurate.
