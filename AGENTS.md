# Project AGENTS.md Guide

This document provides comprehensive guidance for AI agents (such as OpenAI Codex, GitHub Copilot, and others) interacting with this codebase. Its purpose is to help these agents understand the project structure, coding conventions, development practices, and other important aspects to ensure they can assist effectively and generate code that aligns with the project's standards.

## Project Overview

**Qobouli Education** is a comprehensive web platform designed to assist students in Egypt with AI-powered major recommendations, educational resources, and career guidance. Built with **React 18**, **Vite**, **TypeScript**, and **shadcn/ui**, it provides a modern, high-performance, and accessible Single Page Application (SPA).

The primary goal of this project is to help students make informed decisions about their academic and career paths. The platform features:

*   **AI Major Recommender (v3.0):** An intelligent 25-question quiz that analyzes student preferences, grades, interests, and skills to recommend suitable academic majors from an offline catalog of Egyptian university programs.
*   **Bilingual Support (Arabic & English):** Full internationalization (i18n) support using react-i18next, with comprehensive translations and RTL (Right-to-Left) layout support for Arabic.
*   **Resource Toolbox:** Curated collection of helpful links, tools, and materials for students.
*   **Educational Roadmap:** Guidance and milestones for various academic and career paths.
*   **FAQ Section:** Answers to common questions about studies and career prospects.
*   **WhatsApp Integration:** Direct contact option for personalized guidance.

This platform combines modern web development best practices with domain-specific educational content to create a valuable resource for Egyptian students navigating their educational choices.

## Tech Stack

This project leverages a range of modern technologies and tools to ensure an efficient development experience and a high-quality end product. AI agents should be familiar with these technologies.

*   **Core Frontend:**
    *   **React 18:** For building dynamic user interfaces.
    *   **TypeScript:** For static typing and improved code quality.
    *   **Vite:** Next-generation frontend tooling for fast development and optimized builds (using SWC for compilation).
    *   **React Router v6:** For client-side routing and navigation.

*   **UI Components & Styling:**
    *   **shadcn/ui:** A collection of beautifully designed, accessible, and customizable UI components built on Radix UI and Tailwind CSS.
    *   **Radix UI:** Provides unstyled, accessible primitives for building high-quality design systems.
    *   **Lucide React:** A comprehensive library of simply beautiful SVG icons.
    *   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
    *   **PostCSS & Autoprefixer:** For CSS transformations and vendor prefixing.

*   **State Management:**
    *   **React Hook Form:** For managing form state and validation efficiently.
    *   **TanStack React Query (React Query):** For server-state management, including data fetching, caching, and synchronization.
    *   _(Note: For complex global client-side state, consider integrating libraries like **Zustand** or **Redux Toolkit** if the need arises.)_

*   **HTTP Client:**
    *   **Native `fetch` API:** Primarily used for making HTTP requests.
    *   _(Note: **Axios** can be integrated if more advanced features like request/response interception or cancellation are required.)_

*   **Testing:**
    *   **Jest:** A delightful JavaScript Testing Framework with a focus on simplicity.
    *   **React Testing Library:** For testing React components in a way that resembles how users interact with them.

*   **Build & Code Quality:**
    *   **Vite:** As the primary build tool.
    *   **ESLint:** For identifying and reporting on patterns in JavaScript and TypeScript code.
    *   **Prettier (Recommended):** While not explicitly enforced by a script, using Prettier for code formatting is highly recommended for consistency.

*   **Internationalization (i18n):**
    *   **i18next & react-i18next:** For managing translations and language switching.
    *   **eslint-plugin-i18next:** Enforces proper usage of translation keys and prevents hardcoded strings.
    *   **RTL Support:** Automatic right-to-left layout for Arabic language.

*   **Backend/Database Integration:**
    *   **Supabase (`@supabase/supabase-js`):** Primary backend service for:
        *   Storing quiz sessions in `quiz_sessions` table
        *   Logging analytics events in `analytics_events` table
        *   Managing user data and interactions
    *   **Offline Data Catalog:** JSON-based program data generated from CSV files

*   **Other Key Libraries & Tools:**
    *   **`class-variance-authority` (CVA) & `clsx`:** For creating and managing utility variants with Tailwind CSS.
    *   **`tailwind-merge`:** For intelligently merging Tailwind CSS classes.
    *   **`sonner`:** For displaying toasts and notifications.
    *   **`recharts`:** For creating charts and visualizations.
    *   **`date-fns`:** Modern JavaScript date utility library.
    *   **`zod`:** TypeScript-first schema declaration and validation library.
    *   **`canvas`:** For server-side image generation (OG images).
    *   **`csvtojson`:** For converting CSV data to JSON format.
    *   **`puppeteer`:** For pre-rendering pages for SEO.

*   **Code Quality & Development Tools:**
    *   **Husky:** Git hooks for enforcing code quality checks before commits.
    *   **ESLint:** With custom configuration including i18n rules.
    *   **TypeScript:** Strict typing for better code quality.
    *   **Jest & React Testing Library:** For unit and integration testing.

*   **Deployment & SEO:**
    *   **Vite Build:** Optimized production builds.
    *   **Sitemap Generation:** Automated via `scripts/gen-sitemap.mjs`.
    *   **Pre-rendering:** SSG-like pre-rendering for better SEO using Puppeteer.
    *   **Dynamic OG Images:** Custom API endpoint for social media previews.

## Project Structure

Understanding the project's directory structure is crucial for navigation and for placing new files correctly. This project follows a feature-oriented and domain-driven approach where feasible. The `@` alias is configured to point to the `src/` directory.

```
qobouli-explore-guide/
├── .github/                # GitHub specific files (workflows for CI/CD if needed)
├── .husky/                 # Husky git hooks configuration
├── .Jules/                 # Internal AI agent workspace (not for production)
├── api/                    # Backend API endpoints
│   ├── fonts/              # Font files for OG image generation (Amiri-Regular.ttf)
│   ├── og-image.ts         # Dynamic Open Graph image generator
│   └── server.ts           # Express server for API endpoints
├── dist/                   # Output directory for production builds (generated)
├── docs/                   # Additional project documentation
│   └── AI_RECOMMENDATION_EXPLANATION.md
├── migrations/             # Database migration SQL files
│   └── 001_add_index_and_grant_select.sql
├── public/                 # Static assets accessible from web root
│   ├── favicon.ico         # Application favicon
│   ├── lovable-uploads/    # User uploads directory
│   └── sitemap.xml         # Generated sitemap (by gen-sitemap.mjs)
├── scripts/                # Build and utility scripts
│   ├── gen-programs-json.cjs   # Converts CSV to JSON for program catalog
│   ├── gen-sitemap.mjs         # Generates sitemap.xml
│   └── prerender.mjs           # Pre-renders pages for SEO
├── src/                    # Main source code
│   ├── components/         # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── AIMajorRecommender.tsx  # Main quiz component
│   │   ├── QuizContent.tsx         # Quiz logic and state management
│   │   ├── QuestionRenderer.tsx    # Question display logic
│   │   ├── UserInfoForm.tsx        # User information collection
│   │   ├── FAQSection.tsx          # FAQ component
│   │   ├── ResourceToolbox.tsx     # Resources component
│   │   ├── Roadmap.tsx             # Educational roadmap
│   │   ├── LanguageSwitch.tsx      # Language switcher
│   │   ├── WhatsAppButton.tsx      # WhatsApp contact button
│   │   └── ...                     # Other components
│   │
│   ├── configs/            # Configuration files
│   │   ├── BadgeMap.ts             # Major badge definitions and metadata
│   │   ├── questions.json          # Legacy question configuration
│   │   └── scorer_questions.json   # v3.0 scoring configuration (25 questions)
│   │
│   ├── contexts/           # React Context providers
│   │   ├── LanguageContext.tsx # Language and translation context
│   │   └── SessionContext.tsx  # Quiz session context
│   │
│   ├── data/               # Static data files
│   │   ├── programs_names.csv  # Source program data
│   │   ├── programs.json       # Generated program catalog
│   │   └── announcements.ts    # Site announcements
│   │
│   ├── hooks/              # Custom React Hooks
│   │   ├── useMajorScorer.ts       # v3.0 scoring algorithm
│   │   ├── useMajorScorer.test.ts  # Scorer unit tests
│   │   ├── use-mobile.tsx          # Mobile detection hook
│   │   ├── use-toast.ts            # Toast notifications
│   │   └── ...                     # Other hooks
│   │
│   ├── lib/                # Utility libraries
│   │   ├── programCatalog.ts   # Program catalog search/filter logic
│   │   ├── supabaseClient.ts   # Supabase client initialization
│   │   └── utils.ts            # General utilities (cn, etc.)
│   │
│   ├── locales/            # Internationalization files
│   │   ├── en.json         # English translations (~995 lines)
│   │   └── ar.json         # Arabic translations (~1010 lines)
│   │
│   ├── pages/              # Page-level components
│   │   ├── Index.tsx       # Home/landing page
│   │   └── NotFound.tsx    # 404 page
│   │
│   ├── utils/              # Utility functions
│   │   └── explanationPhrases.ts  # Localized reason phrases for recommendations
│   │
│   ├── App.tsx             # Root component with routing
│   ├── main.tsx            # Application entry point
│   ├── i18n.ts             # i18next configuration
│   ├── index.css           # Global CSS with Tailwind imports
│   └── setupTests.ts       # Jest test configuration
│
├── supabase/               # Supabase configuration (if using local dev)
├── .env                    # Environment variables (gitignored)
├── .env.example            # Example environment variables template
├── .gitignore              # Git ignore rules
├── AGENTS.md               # This file - AI agent documentation
├── README.md               # User-facing project documentation
├── CHANGELOG.md            # Version history
├── components.json         # shadcn/ui configuration
├── eslint.config.js        # ESLint configuration with i18n rules
├── index.html              # Main HTML entry point
├── jest.config.json        # Jest testing configuration
├── package.json            # Dependencies and npm scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # Root TypeScript configuration
├── tsconfig.app.json       # App-specific TypeScript config
├── tsconfig.api.json       # API-specific TypeScript config
├── tsconfig.node.json      # Node scripts TypeScript config
└── vite.config.ts          # Vite build configuration
```

**Key Directory Guidance for AI Agents:**

*   **`src/components/`**: UI components, both general and feature-specific.
    *   `src/components/ui/`: shadcn/ui components. Modify only when customizing.
    *   Feature components like `AIMajorRecommender.tsx`, `QuizContent.tsx` are in the root components directory.
    
*   **`src/configs/`**: Critical configuration files:
    *   `BadgeMap.ts`: Maps major slugs to badge metadata (emoji, labels in multiple languages).
    *   `scorer_questions.json`: The 25-question quiz configuration with scoring weights (v3.0).
    
*   **`src/data/`**: Static and generated data:
    *   `programs_names.csv`: Source data for programs (manually maintained).
    *   `programs.json`: Auto-generated from CSV via `scripts/gen-programs-json.cjs`.
    
*   **`src/locales/`**: Translation files for i18n:
    *   **CRITICAL:** All UI strings MUST be added here, not hardcoded. ESLint will enforce this.
    *   `en.json` and `ar.json` must be kept in sync.
    
*   **`src/hooks/useMajorScorer.ts`**: The core algorithm for quiz scoring (v3.0):
    *   Processes 25 questions with various types (rank, single, scale).
    *   Applies grade band rules.
    *   Generates personalized explanations.
    *   Returns top major slug, confidence, and reasons.
    
*   **`src/lib/programCatalog.ts`**: Program search and filtering logic.
    
*   **`api/`**: Backend API endpoints:
    *   `og-image.ts`: Dynamic OG image generation using Canvas.
    *   `server.ts`: Express server for local development.
    
*   **`scripts/`**: Build automation:
    *   `gen-programs-json.cjs`: Run during build to convert CSV → JSON.
    *   `gen-sitemap.mjs`: Generates `sitemap.xml` for SEO.
    *   `prerender.mjs`: Pre-renders pages using Puppeteer.
    
*   **Adding New Routes/Pages:**
    1. Create page component in `src/pages/`.
    2. Add route in `src/App.tsx`.
    3. Add path to `scripts/gen-sitemap.mjs` routes array.
    4. Add translations for page content in `src/locales/en.json` and `ar.json`.
    
*   **Testing:**
    *   Tests are co-located with components (e.g., `useMajorScorer.test.ts`).
    *   Use Jest and React Testing Library.
    *   Run with `npm test`.

## Development Guidelines & Coding Conventions

To maintain code consistency, readability, and quality, all contributors (including AI agents) must adhere to the following guidelines.

### General Code Style & Quality

*   **ESLint:** Code must adhere to the ESLint rules defined in `.eslint.config.js`. Run `npm run lint` to check for violations.
*   **Prettier (Recommended):** While not automatically enforced via a pre-commit hook yet, using Prettier for code formatting is highly recommended. Configure your IDE to format on save using Prettier, or run it manually.
*   **TypeScript Best Practices:**
    *   Write strong-typed code. Avoid `any` where possible. (Note: `noImplicitAny` is currently `false` in `tsconfig.json`, but aim for explicit typing).
    *   Use utility types (e.g., `Partial`, `Pick`, `Omit`) where appropriate.
*   **Readability:**
    *   Write clean, concise, and readable code.
    *   Add comments for complex logic, business rules, or non-obvious decisions. JSDoc style comments are preferred for functions and components.
    *   Keep functions and components focused and relatively small.
*   **Modularity:** Break down complex features into smaller, reusable modules, components, or functions.

### Naming Conventions

*   **Files:**
    *   React Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`, `Button.tsx`). The file name should match the component name.
    *   Other TypeScript files (hooks, utils, services, types): `camelCase.ts` (e.g., `useAuth.ts`, `apiClient.ts`) or `kebab-case.ts` (e.g., `validation-schemas.ts`). Prefer `camelCase.ts` for consistency if no strong convention exists.
    *   Test files: `ComponentName.test.tsx` or `functionName.test.ts`.
*   **Variables & Functions:**
    *   `camelCase` (e.g., `userData`, `calculateTotalAmount`).
    *   For boolean variables, consider prefixes like `is`, `has`, `should` (e.g., `isLoading`, `hasPermission`).
*   **Classes & Interfaces/Types:**
    *   `PascalCase` (e.g., `class UserSession {}`, `interface UserProfile {}`, `type AuthState = {}`).
*   **Constants:**
    *   `UPPER_SNAKE_CASE` for global or widely used constants (e.g., `MAX_ITEMS_PER_PAGE`).
    *   `camelCase` or `PascalCase` for local constants if appropriate.

### React Component Development

*   **Functional Components & Hooks:** Exclusively use functional components with React Hooks. Avoid class components.
*   **Single Responsibility Principle (SRP):** Components should be small, focused, and ideally do one thing well.
*   **Props:**
    *   Define TypeScript interfaces or types for all component props.
    *   Use descriptive prop names.
    *   Destructure props in the function signature.
    *   Provide default values for optional props where sensible.
    ```typescript
    // Example: src/components/common/Button.tsx
    interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      variant?: 'primary' | 'secondary' | 'danger'; // From CVA or similar
      size?: 'small' | 'medium' | 'large';
      // children is implicitly part of ButtonHTMLAttributes
    }

    export const Button: React.FC<ButtonProps> = ({
      variant = 'primary',
      size = 'medium',
      children,
      ...props // Pass through other standard button attributes
    }) => {
      // Use CVA or clsx to apply dynamic classes based on variant and size
      return (
        <button className={`btn btn-${variant} btn-${size}`} {...props}>
          {children}
        </button>
      );
    };
    ```
*   **State Management:**
    *   Use `useState` for simple component-local state.
    *   Use `useReducer` for more complex component-local state logic.
    *   Use React Context (`src/contexts/`) for state that needs to be shared across multiple components but isn't global application state.
    *   Use TanStack React Query (`@tanstack/react-query`) for managing server state (fetching, caching, async operations).
*   **Memoization:** Use `React.memo`, `useMemo`, and `useCallback` judiciously to optimize performance, especially for components that re-render frequently with the same props or for expensive computations.

### CSS & Styling

*   **Tailwind CSS:** This is the primary styling approach. Leverage utility classes as much as possible.
*   **Utility-First:** Embrace the utility-first methodology of Tailwind CSS.
*   **Custom CSS:** Minimize custom CSS. If absolutely necessary:
    *   For component-specific styles that cannot be achieved with Tailwind, consider CSS Modules or styled-components (if the project decides to adopt it).
    *   Global styles are in `src/index.css` (mainiy for Tailwind imports and base styles) and potentially `src/App.css`.
*   **`cn` Utility:** Use the `cn` utility function (from `src/lib/utils.ts`, which typically combines `clsx` and `tailwind-merge`) for conditionally applying and merging Tailwind classes in components.
    ```typescript
    import { cn } from "@/lib/utils";

    // In a component
    <div className={cn("p-4", { "bg-red-500": hasError }, computedStyles)} />
    ```

### TypeScript Usage

*   **Type Everything:** Strive to type all variables, function parameters, and return values.
*   **Interfaces vs. Types:**
    *   Use `interface` for defining the shape of objects and for class contracts.
    *   Use `type` for primitive aliases, union types, intersection types, or more complex types.
*   **Path Aliases:** Use the `@/*` path alias for imports from the `src/` directory (e.g., `import { MyComponent } from "@/components/MyComponent";`).
*   **Non-Null Assertion Operator (`!`):** Avoid using the non-null assertion operator (`!`) unless you are absolutely certain that a value will not be null or undefined. Prefer explicit checks or type guards.
*   **`tsconfig.json` Awareness:** Be aware of the settings in `tsconfig.json` and `tsconfig.app.json`. While some strict checks are currently disabled (e.g., `noImplicitAny: false`, `strictNullChecks: false`), the goal should be to write code that could pass stricter checks in the future.

### Imports

*   Organize imports at the top of the file.
*   Group imports: React imports, external library imports, internal absolute imports (`@/`), relative imports.
*   Avoid default exports for utility functions and constants to encourage named imports, which are better for tree-shaking and refactoring. Default exports are fine for page components or main component exports from a file.

## Internationalization (i18n) - CRITICAL RULES

This project has **strict internationalization requirements** that are automatically enforced by ESLint and pre-commit hooks.

### Core Rules

1.  **NO HARDCODED STRINGS:** All user-facing strings MUST use translation keys from `src/locales/en.json` and `src/locales/ar.json`.
2.  **ESLint Enforcement:** The `eslint-plugin-i18next` plugin will flag any hardcoded strings in:
    *   React components (`.tsx`, `.jsx`)
    *   TypeScript/JavaScript files (`.ts`, `.js`)
    *   Exception: Config files and scripts are exempt (see `eslint.config.js`).
3.  **Pre-commit Hook:** Husky will run `npm run lint` before every commit. Commits with i18n violations will be **blocked**.

### Adding New UI Strings - Required Process

```typescript
// ❌ WRONG - This will fail ESLint
const Welcome = () => <h1>Welcome to Qobouli</h1>;

// ✅ CORRECT - Use translation keys
import { useLanguage } from '@/contexts/LanguageContext';

const Welcome = () => {
  const { t } = useLanguage();
  return <h1>{t('welcome.title')}</h1>;
};
```

**Step-by-Step Process:**

1.  **Add to English locale** (`src/locales/en.json`):
    ```json
    {
      "welcome": {
        "title": "Welcome to Qobouli",
        "subtitle": "Find Your Perfect Major"
      }
    }
    ```

2.  **Add to Arabic locale** (`src/locales/ar.json`):
    ```json
    {
      "welcome": {
        "title": "مرحباً بك في قبولي",
        "subtitle": "اكتشف تخصصك المثالي"
      }
    }
    ```

3.  **Use in component**:
    ```tsx
    import { useLanguage } from '@/contexts/LanguageContext';
    
    const MyComponent = () => {
      const { t } = useLanguage();
      return (
        <div>
          <h1>{t('welcome.title')}</h1>
          <p>{t('welcome.subtitle')}</p>
        </div>
      );
    };
    ```

4.  **Verify with linter**:
    ```bash
    npm run lint
    ```

### Special Cases

*   **Dynamic content with interpolation**:
    ```json
    {
      "quiz": {
        "progress": "Question {{current}} of {{total}}"
      }
    }
    ```
    ```tsx
    {t('quiz.progress', { current: 5, total: 25 })}
    ```

*   **Pluralization**:
    ```json
    {
      "results": {
        "program_one": "{{count}} program found",
        "program_other": "{{count}} programs found"
      }
    }
    ```
    ```tsx
    {t('results.program', { count: programCount })}
    ```

*   **Numbers, dates, technical terms**: While generally should be translated, some technical terms or numbers might not need translation. If absolutely necessary to use a literal, add an ESLint disable comment with justification:
    ```tsx
    {/* eslint-disable-next-line i18next/no-literal-string */}
    <div>HTTP 404</div>
    ```

### RTL (Right-to-Left) Support

*   The app automatically switches to RTL layout when Arabic is selected.
*   Tailwind CSS handles most RTL transformations automatically.
*   Use logical properties where needed: `ms-` (margin-start) instead of `ml-` (margin-left).
*   Test all UI changes in both English and Arabic.

### Configuration Files Exception

Files in these locations are exempt from i18n rules (see `eslint.config.js`):
*   `tailwind.config.ts`
*   `postcss.config.js`
*   `vite.config.ts`
*   `scripts/`
*   Test files (`*.test.ts`, `*.test.tsx`)

These files contain configuration, not user-facing content.

```

## Git Workflow

A consistent Git workflow is essential for collaboration and maintaining a clean project history. AI agents should follow these guidelines when assisting with version control tasks.

### Branching Strategy

*   **`main` (or `master`):** This branch represents the production-ready code. Direct pushes to `main` are typically restricted. Merges to `main` are usually done via Pull Requests from release branches or hotfix branches.
*   **`develop` (Optional but Recommended):** This branch serves as an integration branch for new features. Nightly builds or staging deployments might be triggered from `develop`. If not using a dedicated `develop` branch, feature branches will target `main` directly.
*   **Feature Branches:**
    *   Create a new branch for every new feature, improvement, or task.
    *   Branch off from `develop` (if used) or `main`.
    *   Naming convention:
        *   `feature/<feature-name>` (e.g., `feature/user-authentication`)
        *   `bugfix/<issue-id>-<short-description>` (e.g., `bugfix/123-fix-login-button`)
        *   `chore/<task-description>` (e.g., `chore/update-dependencies`)
        *   `docs/<documentation-update>` (e.g., `docs/readme-improvements`)
*   **Hotfix Branches:**
    *   For urgent fixes in production, branch off from `main`.
    *   Naming convention: `hotfix/<issue-id>-<short-description>` (e.g., `hotfix/456-critical-payment-bug`).
    *   Once tested, merge back into `main` and also into `develop` (if used).

### Commit Messages

*   **Conventional Commits:** Follow the [Conventional Commits specification](https://www.conventionalcommits.org/).
    *   Format: `<type>[optional scope]: <description>`
    *   Common types for this project:
        *   `feat`: New feature (e.g., `feat(quiz): add new question type`)
        *   `fix`: Bug fix (e.g., `fix(scorer): correct grade band calculation`)
        *   `docs`: Documentation (e.g., `docs: update AGENTS.md with i18n rules`)
        *   `i18n`: Translation updates (e.g., `i18n: add Arabic translations for new feature`)
        *   `style`: Code style, formatting (e.g., `style: fix ESLint violations`)
        *   `refactor`: Code refactoring (e.g., `refactor(quiz): extract answer logic`)
        *   `test`: Adding or updating tests (e.g., `test(scorer): add test for tie-breaking`)
        *   `chore`: Build, dependencies, scripts (e.g., `chore: update dependencies`)
        *   `perf`: Performance improvements
    *   Example:
        ```
        feat(quiz): add confidence warning for close results

        - Display alert when top 2 majors have <15% gap
        - Add translations for warning message
        - Update useMajorScorer to calculate confidence

        Closes #42
        ```
*   **Clarity:** Subject line ≤50 chars, body wraps at 72 chars.
*   **i18n Changes:** If adding/modifying translations, mention it in commit message.
*   **Pre-commit Check:** Remember Husky will run `npm run lint` automatically.

### Pull Requests (PRs) / Merge Requests (MRs)

*   **Create PRs:** Once a feature or bugfix is complete on its branch, create a Pull Request to merge it into `develop` (or `main`).
*   **PR Template (if available):** Fill out the PR template with all required information. If no template exists, ensure the PR description is detailed.
*   **Description:**
    *   Clearly describe the purpose of the PR and the changes made.
    *   Reference any related issue numbers (e.g., "Closes #123", "Fixes #456").
*   **Testing:**
    *   Ensure all tests pass (`npm run test`).
    *   Perform manual testing for the changes.
*   **Code Review:**
    *   Assign at least one reviewer (if applicable for the team setup).
    *   Address any feedback or comments from the review.
*   **Screenshots/GIFs:** For UI changes, include screenshots or GIFs in the PR description to demonstrate the changes.
*   **Keep PRs Focused:** A PR should ideally address a single concern or feature. Large PRs are harder to review.
*   **Resolve Conflicts:** If there are merge conflicts with the target branch, rebase your feature branch on the latest target branch and resolve conflicts locally before pushing again.
*   **Squash and Merge (Optional):** Depending on the project's policy, commits on the feature branch might be squashed into a single commit when merging to keep the main branch history clean. AI agents should be prepared for this.

### General Practices

*   **Pull Frequently:** Regularly pull the latest changes from the remote `develop` (or `main`) branch to your local feature branches to avoid large merge conflicts:
    ```bash
    git checkout develop
    git pull origin develop
    git checkout your-feature-branch
    git rebase develop
    ```
*   **Push Frequently:** Push your local commits to the remote feature branch regularly, especially at the end of the day.
*   **Do Not Force Push to Shared Branches:** Avoid force pushing (`git push --force`) to `main`, `develop`, or any other shared branches. Force pushing should only be done on your own feature branches if you need to rebase and clean up your commit history (and you are the only one working on that branch).
```

## Environment Setup

This section guides developers and AI agents on how to set up the development environment for this project.

### Development Requirements

*   **Node.js:** Version `18.x` or higher recommended (LTS). Check with `node -v`.
*   **Package Manager:** **npm** is the standard for this project.
    *   Version `8.x` or higher recommended. Check with `npm -v`.
    *   Both `package-lock.json` and `bun.lockb` exist, but **npm is preferred** for consistency.

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/mohamed-arabi16/qobouli-explore-guide.git
    cd qobouli-explore-guide
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**
    
    Create a `.env` file in the project root (copy from `.env.example` if it exists):
    
    ```env
    # Supabase Configuration (REQUIRED)
    VITE_SUPABASE_URL=https://your-project.supabase.co
    VITE_SUPABASE_ANON_KEY=your-anon-key-here
    
    # Optional: WhatsApp contact number
    VITE_WHATSAPP_NUMBER=+20xxxxxxxxxx
    
    # Optional: Analytics or other services
    VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
    ```
    
    **CRITICAL:** 
    *   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are **required** for the app to function.
    *   Get these from your Supabase project settings.
    *   **Never commit `.env` to Git.** It's in `.gitignore`.

4.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    Opens at `http://127.0.0.1:5173` (or port shown in terminal).

5.  **(Optional) Start API Server for OG Images:**
    ```bash
    npm run dev:api
    ```
    Runs on `http://localhost:3001/api/og-image`.

### Running Linters and Type Checkers

*   **Linting (ESLint with i18n rules):**
    ```bash
    npm run lint
    ```
    **Must pass before commits** due to Husky pre-commit hook.

*   **Type Checking:**
    ```bash
    npx tsc --noEmit
    ```
    Vite also does type checking during build.

### Build Commands

*   **Development Build:**
    ```bash
    npm run build:dev
    ```

*   **Production Build:**
    ```bash
    npm run build
    ```
    This automatically:
    1. Runs `build:programs` (CSV → JSON conversion)
    2. Compiles TypeScript
    3. Optimizes assets
    4. Outputs to `dist/`

*   **Full Deployment Build:**
    ```bash
    npm run deploy
    ```
    This runs:
    1. `npm run build`
    2. `scripts/gen-sitemap.mjs` (generates sitemap.xml)
    3. `scripts/prerender.mjs` (pre-renders pages with Puppeteer)

### Testing

*   **Run all tests:**
    ```bash
    npm test
    ```
    Uses Jest with React Testing Library.

*   **Run specific test file:**
    ```bash
    npm test -- useMajorScorer.test.ts
    ```

*   **Run tests in watch mode:**
    ```bash
    npm test -- --watch
    ```

*   **Generate coverage report:**
    ```bash
    npm test -- --coverage
    ```

### Git Hooks (Husky)

*   **Pre-commit:** Automatically runs `npm run lint`.
    *   Commits will **fail** if linting errors exist.
    *   Ensures no hardcoded strings violate i18n rules.
    *   Fix errors before committing:
        ```bash
        npm run lint  # See errors
        # Fix issues
        git add .
        git commit -m "fix: resolve linting errors"
        ```

### IDE Configuration (Recommended)

*   **VSCode:**
    *   Install extensions:
        *   ESLint
        *   Prettier (optional but recommended)
        *   Tailwind CSS IntelliSense
        *   i18n Ally (for translation management)
    *   Settings:
        ```json
        {
          "editor.formatOnSave": true,
          "editor.defaultFormatter": "esbenp.prettier-vscode",
          "eslint.validate": ["javascript", "typescript", "javascriptreact", "typescriptreact"]
        }
        ```

*   **WebStorm/IntelliJ:**
    *   Enable ESLint integration.
    *   Enable Tailwind CSS support.
    *   Configure i18next support for translation keys.

```

## Core Feature Implementation

This section details the implementation approach for Qobouli Education's main features. AI agents must understand these patterns to contribute effectively.

### General Approach

*   **Component-Based Architecture:** Features are built as composable React components.
*   **Service Layer:** API interactions abstracted in `src/lib/` (e.g., `supabaseClient.ts`, `programCatalog.ts`).
*   **State Management:** 
    *   TanStack React Query for server state (if needed).
    *   React hooks and Context API for client state.
    *   Session storage for quiz progress persistence.
*   **Modularity:** Complex features broken into focused, reusable components.
*   **Offline-First Data:** Program catalog is static JSON, generated at build time from CSV.

### Feature 1: AI Major Recommender (v3.0)

**Description:** The core feature - a 25-question quiz that recommends academic majors based on student preferences, grades, and interests.

**Architecture:**

```
AIMajorRecommender (Container)
├── UserInfoForm (Lead collection)
├── QuizContent (Quiz orchestration)
│   ├── QuestionRenderer (Display logic)
│   │   └── Various input components (Radio, Checkbox, Slider)
│   └── Results Display
│       ├── Badge Hero (Major badge with emoji)
│       ├── Confidence Alert (if low confidence)
│       ├── Reason Chips (Personalized explanations)
│       └── Program Cards (3 recommended programs)
└── WhatsAppButton (CTA)
```

**Key Components:**

*   **`src/components/AIMajorRecommender.tsx`**: Main container component.
    *   Manages user info form display.
    *   Passes user data to QuizContent.
    *   Handles quiz reset functionality.

*   **`src/components/QuizContent.tsx`**: Quiz state management.
    *   Loads questions from `src/configs/scorer_questions.json`.
    *   Tracks answers in component state and session storage.
    *   Calls `useMajorScorer` hook to calculate results.
    *   Fetches program recommendations from `programCatalog`.
    *   Logs data to Supabase (`quiz_sessions` and `analytics_events` tables).

*   **`src/components/QuestionRenderer.tsx`**: Renders questions based on type.
    *   Supports: `rank`, `single`, `scale` question types.
    *   Handles special input modes (love/ok/no, yes/no, slider).

**Scoring Algorithm (`src/hooks/useMajorScorer.ts` - v3.0):**

```typescript
interface ScorerResult {
  topMajorSlug: string;        // e.g., 'cs_ai', 'medicine'
  confidence: number;          // 0-1, based on score gap
  reasons: string[];           // Localized explanation phrases
  sortedScores: Array<{        // All majors ranked
    slug: string;
    score: number;
  }>;
}
```

**How it works:**

1.  **Question Processing**: 25 questions with weighted answers.
    *   **rank**: Ranks 3 choices (3pts, 2pts, 1pt) × weights.
    *   **single**: Single selection × weight or yes_weight.
    *   **scale**: Slider value (0-100) × scale_weight.

2.  **Grade Band Rules**:
    ```typescript
    if (gradeBand === 'lt70') {
      medicine -= 5, dentistry -= 4, engineering -= 2
    }
    if (gradeBand === 'gt85') {
      medicine +1, cs_ai +1, engineering +1
    }
    ```

3.  **Score Flooring**: All negative scores → 0.

4.  **Tie-Breaking**: Priority order: `cs_ai` > ... > `aviation` (last).

5.  **Explanation Generation** (`buildExplanation()`):
    *   Identifies "boosters" (high-impact answers, ≥2 score effect).
    *   Maps boosters to creative phrases from `src/utils/explanationPhrases.ts`.
    *   Returns up to 4 localized reason strings.

6.  **Confidence Calculation**:
    ```typescript
    confidence = topScore / (topScore + secondScore)
    ```
    *   If `confidence < 0.55`: Show warning alert to user.

**Program Selection (`src/lib/programCatalog.ts`):**

```typescript
function pickPrograms(
  majorSlugs: string[],  // From sortedScores
  lang: 'en' | 'ar',
  limit: number = 3
): ProgramItem[]
```

*   Searches `src/data/programs.json` by keywords for each major slug.
*   Returns up to `limit` programs.
*   Fallback: If first slug has <1 result, tries next slugs.

**Data Flow:**

```mermaid
User completes quiz
    ↓
useMajorScorer calculates results
    ↓
QuizContent saves to Supabase quiz_sessions
    ↓
SessionContext stores sessionId
    ↓
pickPrograms fetches from programs.json
    ↓
Display results + analytics events
    ↓
User clicks WhatsApp/Share → log to analytics_events
```

**Supabase Integration:**

Tables used:
*   **`quiz_sessions`**: Stores completed quiz data.
    *   Columns: `id`, `full_name`, `phone_number`, `answers` (jsonb), `grade_band`, `top_major_slug`, `badge_slug`, `created_at`.
    
*   **`analytics_events`**: Tracks user interactions.
    *   Columns: `id`, `session_id` (FK), `event_type`, `event_meta` (jsonb), `created_at`.
    *   Event types: `whatsapp_click`, `share`, `restart`.

**Testing:**

*   Unit tests: `src/hooks/useMajorScorer.test.ts`
*   Integration tests should mock Supabase calls.

**Code Example:**

```tsx
// In QuizContent.tsx
import { useMajorScorer } from '@/hooks/useMajorScorer';
import { pickPrograms } from '@/lib/programCatalog';

const QuizContent = ({ userName, userPhone }) => {
  const [answers, setAnswers] = useState({});
  const { t, language } = useLanguage();
  
  // Calculate results when quiz is complete
  const scorerResult = useMajorScorer(answers, gradeBand);
  
  // Fetch programs
  useEffect(() => {
    if (scorerResult) {
      const slugs = scorerResult.sortedScores.map(s => s.slug);
      const programs = pickPrograms(slugs, language, 3);
      setRecommendedPrograms(programs);
    }
  }, [scorerResult, language]);
  
  // Save to Supabase
  useEffect(() => {
    if (scorerResult && userName) {
      const saveSession = async () => {
        const { data } = await supabase.from('quiz_sessions').insert({
          full_name: userName,
          phone_number: userPhone,
          answers: answers,
          grade_band: gradeBand,
          top_major_slug: scorerResult.topMajorSlug,
          badge_slug: scorerResult.topMajorSlug // Same as top major
        }).select();
        
        if (data?.[0]) {
          setSessionId(data[0].id);
        }
      };
      saveSession();
    }
  }, [scorerResult, userName, userPhone]);
  
  // ... rest of component
};
```

### Feature 2: Badge System

**Description:** Visual badges for each major, displayed on quiz results and used in OG images.

**Implementation:**

*   **`src/configs/BadgeMap.ts`**: Central registry of all major badges.
    ```typescript
    export interface BadgeDetail {
      emoji: string;
      label_en: string;
      label_ar: string;
      slug: string;
    }
    
    export function getBadgeForMajor(slug: string): BadgeDetail;
    ```

*   **Usage in Components:**
    ```tsx
    import { getBadgeForMajor } from '@/configs/BadgeMap';
    
    const badge = getBadgeForMajor(topMajorSlug);
    <div>
      <span>{badge.emoji}</span>
      <span>{language === 'ar' ? badge.label_ar : badge.label_en}</span>
    </div>
    ```

*   **Consistency Check:** `useMajorScorer.ts` logs a warning if a slug is missing from BadgeMap.

### Feature 3: Dynamic OG Image Generation

**Description:** Server-side API endpoint that generates Open Graph images for social media sharing.

**Implementation:**

*   **Endpoint:** `/api/og-image?slug=cs_ai&lang=en`
*   **Location:** `api/og-image.ts`
*   **Technology:** Node.js Canvas library + Express server.

**How it works:**

1.  Receives `slug` and `lang` query parameters.
2.  Calls `getBadgeForMajor(slug)` to get badge data.
3.  Creates 1200×630 PNG image with:
    *   Badge emoji (large, centered)
    *   Major label (Amiri font for Arabic support)
    *   Branded background
4.  Returns image as `image/png` response.

**Local Development:**

```bash
npm run dev:api      # Builds and starts API server on port 3001
npm run build:api    # Compiles TypeScript and copies fonts
npm run start:api    # Starts compiled server
```

**Font Requirement:**
*   Requires `api/fonts/Amiri-Regular.ttf` for Arabic text rendering.
*   Build script copies fonts to `dist/api/fonts/`.

**Usage in Share Feature:**

```tsx
const handleShare = () => {
  const ogUrl = `${window.location.origin}/api/og-image?slug=${topMajorSlug}&lang=${language}`;
  
  // Log share event
  supabase.from('analytics_events').insert({
    session_id: sessionId,
    event_type: 'share',
    event_meta: { method: 'web_share', og_url: ogUrl }
  });
  
  // Trigger Web Share API or clipboard copy
};
```

### Feature 4: Internationalization (i18n)

**Description:** Full bilingual support with RTL for Arabic.

**Key Files:**

*   `src/i18n.ts`: i18next configuration.
*   `src/locales/en.json`: English translations (~995 lines).
*   `src/locales/ar.json`: Arabic translations (~1010 lines).
*   `src/contexts/LanguageContext.tsx`: Provides `t()` function and current language.

**Usage Pattern:**

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

const MyComponent = () => {
  const { t, language, changeLanguage } = useLanguage();
  
  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1>{t('page.title')}</h1>
      <button onClick={() => changeLanguage(language === 'ar' ? 'en' : 'ar')}>
        {t('common.switchLanguage')}
      </button>
    </div>
  );
};
```

**ESLint Integration:**
*   `eslint-plugin-i18next` enforces i18n usage.
*   See "Internationalization (i18n) - CRITICAL RULES" section above.

### API Service Standards

**Supabase Integration:**

*   **Client Initialization:** `src/lib/supabaseClient.ts`
    ```typescript
    import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase URL or Anon Key is missing. Check your .env file.");
    }

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);
    ```

*   **Usage Pattern:**
    ```typescript
    import { supabase } from '@/lib/supabaseClient';
    
    // Insert data
    const { data, error } = await supabase
      .from('quiz_sessions')
      .insert({ full_name: 'Ahmed', answers: {...} })
      .select();
    
    // Query data
    const { data: programs } = await supabase
      .from('programs_view')
      .select('*')
      .in('major_slug', ['cs_ai', 'medicine'])
      .limit(3);
    ```

*   **Error Handling:** Always check for `error` in Supabase responses.
*   **Type Safety:** Define TypeScript interfaces for table schemas.

**Offline Data Catalog:**

*   **Program Catalog:** `src/lib/programCatalog.ts`
    ```typescript
    import programsData from '@/data/programs.json';
    
    export function pickPrograms(
      majorSlugs: string[],
      lang: 'en' | 'ar',
      limit: number = 3
    ): ProgramItem[] {
      // Keyword-based search in programs.json
      // Returns matching programs for given major slugs
    }
    ```

*   **Data Source:** `src/data/programs.json` (auto-generated from `programs_names.csv`)
*   **Build Process:** 
    ```bash
    npm run build:programs  # Regenerates programs.json from CSV
    npm run build           # Automatically runs build:programs
    ```

**No External REST APIs:** All data is either in Supabase or offline JSON files.

### State Management Patterns

*   **Server State (Supabase):**
    *   Direct Supabase client calls (not using React Query in current implementation).
    *   Insert operations for quiz sessions and analytics.
    *   Select operations for program catalog (when needed).
    
*   **Client State:**
    *   **Session Storage:** Quiz answers persistence across page refreshes.
        ```typescript
        sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
        const saved = JSON.parse(sessionStorage.getItem('quizAnswers') || '{}');
        ```
    *   **React Context:**
        *   `LanguageContext`: Current language, translation function `t()`.
        *   `SessionContext`: Current quiz session ID from Supabase.
    *   **Component State:** `useState` for local UI state, form inputs, etc.
    
*   **No Global State Library:** Project uses React's built-in state management. If complexity increases, consider Zustand.

```

## Testing Strategy

A robust testing strategy is crucial for ensuring code quality, preventing regressions, and enabling confident refactoring. AI agents are expected to write and maintain tests for any code they generate or modify.

### Philosophy

*   Follow the "Testing Trophy" or "Testing Pyramid" principles, emphasizing a good balance of unit, integration, and end-to-end tests.
*   Write tests that are readable, maintainable, and fast.
*   Test behavior, not implementation details.

### Unit Testing

*   **Framework:** **Jest** (`jest`) along with **React Testing Library** (`@testing-library/react`).
*   **Scope:** Test individual components, functions, or modules in isolation.
*   **What to Test:**
    *   Component rendering based on different props.
    *   User interactions (e.g., button clicks, form submissions).
    *   Helper/utility functions with various inputs.
    *   Custom hook logic.
*   **File Organization:**
    *   Test files should be co-located with the source files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory). This is the current pattern seen with `src/components/Announcement.test.tsx`.
    *   Alternatively, a global `tests/` directory mirroring the `src/` structure can be used if preferred for larger projects.
*   **Coverage:** Aim for a reasonable level of test coverage. While a specific percentage isn't strictly enforced yet, critical parts of the application should be well-tested. Use `npm test -- --coverage` to generate coverage reports.
*   **Example Unit Test (React Component):**
    ```tsx
    // src/components/ui/Button.test.tsx (Assuming a Button component exists)
    import { render, screen, fireEvent } from '@testing-library/react';
    import '@testing-library/jest-dom'; // For extended matchers like .toBeInTheDocument()
    import { Button } from './button'; // Adjust path to your Button component

    describe('Button Component', () => {
      test('renders button with children text', () => {
        render(<Button variant="default">Click Me</Button>);
        const buttonElement = screen.getByText(/Click Me/i);
        expect(buttonElement).toBeInTheDocument();
      });

      test('applies correct variant class (example)', () => {
        // This test is more of an implementation detail test if variant simply maps to a class.
        // Better to test the visual outcome or behavior if possible.
        // For shadcn/ui, these are often pre-tested, focus on your usage.
        render(<Button variant="destructive">Delete</Button>);
        const buttonElement = screen.getByText(/Delete/i);
        // Example: expect(buttonElement).toHaveClass('bg-destructive');
        // (Actual class might be different, check component's implementation or use visual regression testing for styles)
      });

      test('calls onClick handler when clicked', () => {
        const handleClickMock = jest.fn();
        render(<Button onClick={handleClickMock}>Submit</Button>);
        const buttonElement = screen.getByText(/Submit/i);
        fireEvent.click(buttonElement);
        expect(handleClickMock).toHaveBeenCalledTimes(1);
      });

      test('is disabled when disabled prop is true', () => {
        render(<Button disabled>Disabled Button</Button>);
        const buttonElement = screen.getByText(/Disabled Button/i);
        expect(buttonElement).toBeDisabled();
      });
    });
    ```

### Integration Testing

*   **Framework:** Also uses **Jest** and **React Testing Library**.
*   **Scope:** Test the interaction between several components or modules. For example:
    *   A form component interacting with a validation service.
    *   Multiple components working together to fulfill a user flow (e.g., selecting items and adding to a cart).
    *   Components fetching data via a service mock.
*   **What to Test:**
    *   Data flow between components.
    *   State changes affecting multiple parts of the UI.
    *   Interactions with mocked API services.
*   **Example:**
    ```tsx
    // src/components/UserProfile.integration.test.tsx (Example)
    // Assume UserProfile fetches data and displays it using UserInfoCard
    // import { render, screen, waitFor } from '@testing-library/react';
    // import '@testing-library/jest-dom';
    // import UserProfile from './UserProfile'; // Your component
    // import { mockUserService } from '../services/mocks/userService.mock'; // Your mock

    // jest.mock('../services/userService', () => mockUserService); // Mock the actual service

    // describe('UserProfile Integration', () => {
    //   test('fetches and displays user data correctly', async () => {
    //     mockUserService.getUser.mockResolvedValue({ name: 'Jane Doe', email: 'jane@example.com' });
    //     render(<UserProfile userId="123" />);

    //     expect(screen.getByText(/Loading user profile.../i)).toBeInTheDocument(); // Initial loading state

    //     await waitFor(() => {
    //       expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    //       expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();
    //     });
    //   });
    // });
    ```
    *(Note: The above integration test example is commented out as it requires setting up mock services and specific component implementations. AI agents should adapt this pattern.)*

### End-to-End (E2E) Testing

*   **Framework (Not Yet Implemented - Consider):** **Playwright** or **Cypress**.
*   **Scope:** Test complete user flows through the application, interacting with the UI as a real user would in a browser.
*   **What to Test:**
    *   Critical user journeys (e.g., registration, login, core feature usage, checkout).
    *   Navigation and routing.
*   **Guidance for AI Agents:** While E2E tests are not currently set up, if asked to implement them, AI agents should:
    *   Inquire about the preferred E2E testing framework.
    *   Write clear, resilient tests that focus on user interactions.
    *   Use descriptive selectors (e.g., `data-testid` attributes).

### Running Tests

*   **Run all tests:**
    ```bash
    npm test
    # or
    bun test
    ```
*   **Run specific test file (Jest CLI option):**
    ```bash
    npm test -- path/to/your/test-file.test.tsx
    # or
    bun test -- path/to/your/test-file.test.tsx
    # (Note: Bun might have different CLI syntax for specific files, `bun test <filename>` often works)
    ```
*   **Run tests in watch mode (Jest CLI option):**
    ```bash
    npm test -- --watch
    # or
    bun test --watch
    ```
*   **Generate test coverage report (Jest CLI option):**
    ```bash
    npm test -- --coverage
    # or
    bun test --coverage
    ```
    The report will typically be generated in a `coverage/` directory.

AI agents should ensure that any new code includes appropriate tests and that all tests pass before considering a task complete.

## Data Management & Build Scripts

### Program Catalog System

**Source Data:** `src/data/programs_names.csv`

*   CSV format with program titles in English and Arabic.
*   Manually maintained list of Egyptian university programs.
*   Each row represents one program.

**Generated Data:** `src/data/programs.json`

*   Auto-generated JSON file consumed by the application.
*   Created by `scripts/gen-programs-json.cjs`.
*   **NEVER edit this file manually** - always edit the CSV and regenerate.

**Regeneration Process:**

```bash
# Manual regeneration
npm run build:programs

# Automatic during build
npm run build  # Includes build:programs step
```

**Script Details:** `scripts/gen-programs-json.cjs`

```javascript
// Uses csvtojson library
// Reads programs_names.csv
// Converts to JSON array
// Writes to programs.json
```

### Sitemap Generation

**Purpose:** SEO optimization - tells search engines about site structure.

**Output:** `public/sitemap.xml`

**Script:** `scripts/gen-sitemap.mjs`

```javascript
import { SitemapStream, streamToPromise } from 'sitemap';

const routes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/ar', changefreq: 'weekly', priority: 1.0 },
  // Add new routes here when creating new pages
];
```

**When to Update:**
*   Every time you add a new page/route to the application.
*   Add both English and Arabic versions if applicable.
*   Run `npm run deploy` to regenerate sitemap.

**Regeneration:**

```bash
node scripts/gen-sitemap.mjs  # Manual
npm run deploy                # Includes sitemap generation
```

### Pre-rendering for SEO

**Purpose:** Generate static HTML snapshots for better SEO and social media previews.

**Script:** `scripts/prerender.mjs`

*   Uses Puppeteer to visit pages and capture rendered HTML.
*   Creates static HTML files in `dist/`.
*   Improves initial page load and SEO.

**Process:**

```bash
npm run prerender  # Requires npm run preview to be running
npm run deploy     # Full build + sitemap + prerender workflow
```

### Database Migrations

**Location:** `migrations/`

**Purpose:** Track Supabase database schema changes.

**Current Migrations:**
*   `001_add_index_and_grant_select.sql`: Indexes and permissions.

**Usage:**
*   Apply via Supabase Dashboard SQL editor.
*   Or use Supabase CLI: `supabase db push`.

**Creating New Migrations:**

1. Create file: `migrations/00X_description.sql`
2. Write SQL DDL commands
3. Test in Supabase staging environment
4. Document in migration file
5. Apply to production
6. Update AGENTS.md or README if schema changes affect code

### Build Workflow Summary

```bash
# Full production deployment
npm run deploy
  ├─ npm run build
  │   ├─ node scripts/gen-programs-json.cjs  # CSV → JSON
  │   └─ vite build                          # Compile & bundle
  ├─ node scripts/gen-sitemap.mjs            # Generate sitemap.xml
  └─ npm run prerender                       # Pre-render pages

# Development
npm run dev              # Frontend dev server
npm run dev:api          # API dev server (OG images)

# Testing
npm test                 # Run Jest tests
npm run lint             # Check code quality (pre-commit)
```

```

## Agent Contributions Log

This section documents significant contributions made by AI agents to the Qobouli Education project. It serves as a historical record and helps future agents understand the evolution of key features.

### Jules - Major-Matcher-v2 Initiative (Historical)

The following contributions were made by the AI agent "Jules" during the Major-Matcher-v2 development phase:

**Phase 1: Core Infrastructure (Initial Implementation)**

*   **Supabase Integration for Quiz Data:**
    *   Created `src/lib/supabaseClient.ts` to initialize the Supabase client using environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
    *   Implemented logic in `src/components/AIMajorRecommender.tsx` to insert completed quiz session data into the `quiz_sessions` table in Supabase. This includes user details, answers, top major, confidence, and badge slug.
    *   Created React context `src/contexts/SessionContext.tsx` to store and provide the `sessionId` returned from the `quiz_sessions` insert.

*   **Analytics Event Logging:**
    *   Implemented a `logCtaEvent` function in `src/components/AIMajorRecommender.tsx` to send analytics data to the `analytics_events` table in Supabase.
    *   Logged CTA events for 'whatsapp_click', 'share' (new button), and 'restart' actions on the quiz results page, associating them with the `sessionId`.

*   **Badge Hero Integration:**
    *   Integrated a "Badge Hero" section in the results view of `src/components/AIMajorRecommender.tsx`. This section displays the user's earned badge (emoji and localized label) based on their top major.
    *   Created `src/configs/BadgeMap.ts` as the central registry for all major badges.

**Phase 2: Dynamic OG Images & Sharing**

*   **Dynamic OG Image Generation:**
    *   Created API endpoint `api/og-image.ts` to dynamically generate Open Graph images.
    *   Implemented image generation using the `canvas` library to create 1200×630 PNG images featuring the badge emoji and label corresponding to a major `slug` and `lang` passed as query parameters.
    *   Set up Express server (`api/server.ts`) and npm scripts (`dev:api`, `build:api`) to run this endpoint locally and prepare it for serverless deployment.
    *   Integrated Amiri font (`api/fonts/Amiri-Regular.ttf`) for proper Arabic text rendering.
    *   Updated the `handleShare` function in `AIMajorRecommender.tsx` to construct the `ogUrl` and log it as part of the 'share' event metadata.

*   **Share Functionality:**
    *   Added a "Share" button to the quiz results page in `AIMajorRecommender.tsx`.
    *   Implemented Web Share API with clipboard fallback.
    *   Triggers a 'share' event log to `analytics_events` with metadata including the share method and the generated OG image URL.

**Phase 3: Scorer v2.2 Enhancement**

*   **Major Scorer v2.2 & Explanation Enhancement:**
    *   Refined scoring logic in `src/hooks/useMajorScorer.ts` (v2.2) to improve major ranking accuracy, particularly for STEM vs. Media majors.
    *   Updated `src/configs/questions.json` with new weights and capped weights for art/media options to prevent them from outranking STEM fields inappropriately.
    *   Implemented grade band rules:
        *   Grade <70% (-5 to `medicine`, -4 to `dentistry`, -2 to engineering fields).
        *   Grade >85% (+1 to `medicine`, `computer`, `engineering`).
    *   Added tie-breaker rule using a predefined priority list.
    *   Revised confidence calculation to be `TopMajorScore / (TopMajorScore + SecondMajorScore)`.
    *   Implemented `buildExplanation()` to generate personalized reasons for the top major recommendation based on impactful answer contributions (score effect ≥ 2).
    *   Expanded `src/configs/BadgeMap.ts` with new badge definitions to ensure better coverage.
    *   Updated results UI to show confidence warning alert if gap between top two majors is less than 15%.
    *   Added new unit tests for `useMajorScorer.ts` covering the new logic.

**Phase 4: Bug Fixes & Refinements**

*   **Blank Results Page Fix:**
    *   Diagnosed and fixed a `ReferenceError` in `AIMajorRecommender.tsx` due to an undefined `majorCategories` variable.
    *   Fix: Modified the results rendering logic to use `getBadgeForMajor(slug)` from `BadgeMap.ts` to retrieve localized major names.
    *   Added diagnostic logging to the results view.
    *   Corrected UI option ID mismatch for "Computer & Technology" subject.
    *   Updated `useEffect` dependencies in Supabase submission to prevent stale closure issues.

*   **Follow-Up Debug & Enhancement:**
    *   **Supabase Schema Error Fix:** Resolved `Could not find the 'language' column of 'quiz_sessions'` error by removing the orphaned `language` property from the insert payload.
    *   **Program Card Rendering:** Added diagnostic logging to trace budget filter effects on program list generation.
    *   **Creative Reason Strings:** Confirmed that `buildExplanation()` uses `phraseMap` from `src/utils/explanationPhrases.ts` to generate human-readable explanations.
    *   **Slug Alias & DB Coverage Procedure:** Documented procedure for ensuring `major_slug` entries in `programs_view` align with scorer-generated slugs.

**Phase 5: Testing Infrastructure**

*   **Regression Tests:**
    *   Added unit test suite for `useMajorScorer` in `src/hooks/useMajorScorer.test.ts` using JSON fixtures to validate `topMajorSlug`, `confidence`, and `reasons`.
    *   Added integration tests for `AIMajorRecommender` to simulate full quiz flow, mock Supabase program fetching, and assert program card rendering.

*   **Consistency Guard in Scorer:**
    *   Added check in `src/hooks/useMajorScorer.ts` to ensure that the `topMajorSlug` produced by the scorer is present in `src/configs/BadgeMap.ts`. A warning is logged if a slug is missing.

### Evolution to v3.0 (Current Version)

After Jules's contributions, the project evolved to the current v3.0 architecture:

*   **25-Question Quiz System:** Migrated from legacy questions to `scorer_questions.json` with 25 carefully designed questions.
*   **Offline Program Catalog:** Replaced Supabase program queries with offline JSON catalog generated from CSV.
*   **Simplified Scoring:** Refined algorithm with clear question types (rank, single, scale) and improved grade band rules.
*   **Enhanced i18n:** Implemented strict ESLint rules for translation enforcement.
*   **Build Automation:** Added comprehensive build scripts for data generation, sitemap, and pre-rendering.

### Contributing as an AI Agent

When making significant contributions to this project:

1.  Document your changes in this log with:
    *   Agent name/identifier
    *   Date of contribution
    *   Feature or issue addressed
    *   Technical details of implementation
    *   Files created or modified
    *   Testing added

2.  Update relevant sections of this AGENTS.md document if you introduce new patterns or change existing conventions.

3.  Ensure all changes follow the coding conventions and i18n rules documented above.

4.  Add tests for new functionality and ensure existing tests pass.

---

**Last Updated:** 2026-01-14  
**Document Version:** 2.0 (Comprehensive Qobouli Education Documentation)