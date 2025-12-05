# Project AGENTS.md Guide

This document provides comprehensive guidance for AI agents (such as OpenAI Codex, GitHub Copilot, and others) interacting with this codebase. Its purpose is to help these agents understand the project structure, coding conventions, development practices, and other important aspects to ensure they can assist effectively and generate code that aligns with the project's standards.

## Project Overview

This project is a modern frontend application built with **React 18**, **Vite**, **TypeScript**, and **shadcn/ui**. It serves as a foundation for developing high-performance, scalable, and maintainable Single Page Applications (SPAs).

The primary goal of this project is to provide a robust starting point that incorporates a modern development toolchain and best practices. It aims to solve common challenges in web development by offering a well-structured architecture, efficient build processes, and a rich set of pre-configured tools and UI components. This allows developers and AI agents to focus on building features rather than on boilerplate setup.

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

*   **Backend/Database Integration:**
    *   **Supabase (`@supabase/supabase-js`):** Integrated for backend services, potentially including database, authentication, and storage. AI agents should be aware of the Supabase client usage.

*   **Other Key Libraries & Tools:**
    *   **`class-variance-authority` (CVA) & `clsx`:** For creating and managing utility variants with Tailwind CSS.
    *   **`tailwind-merge`:** For intelligently merging Tailwind CSS classes.
    *   **`sonner`:** For displaying toasts and notifications.
    *   **`recharts`:** For creating charts and visualizations.
    *   **`date-fns`:** Modern JavaScript date utility library.
    *   **`zod`:** TypeScript-first schema declaration and validation library.

*   **Deployment:**
    *   _(To be defined based on the chosen hosting platform, e.g., Vercel, Netlify, AWS Amplify, or custom Docker setup). AI agents should look for specific deployment scripts or documentation once available._

## Project Structure

Understanding the project's directory structure is crucial for navigation and for placing new files correctly. This project follows a feature-oriented and domain-driven approach where feasible. The `@` alias is configured to point to the `src/` directory.

```
vite_react_shadcn_ts/
├── .github/                # GitHub specific files (e.g., workflows for CI/CD) - (Placeholder, if used)
├── .vscode/                # VSCode editor specific settings - (Placeholder, if used)
├── backend/                # Contains any backend-specific code (e.g., serverless functions, if not using a separate BaaS like Supabase extensively)
├── dist/                   # Output directory for production builds (generated by `npm run build`)
├── docs/                   # Project documentation (besides this AGENTS.md) - (Placeholder, if used)
├── public/                 # Static assets accessible from the web root
│   ├── favicon.ico         # Application favicon
│   ├── lovable-uploads/    # Example directory for uploads
│   └── ...                 # Other static files like images, manifest.json
├── src/                    # Main source code for the frontend application
│   ├── App.css             # Minimal global CSS, primarily for base styles if not covered by Tailwind's preflight
│   ├── App.tsx             # Root React component, sets up routing and global layout
│   ├── main.tsx            # Application entry point, renders App.tsx
│   ├── index.css           # Main CSS entry point, imports Tailwind CSS
│   ├── vite-env.d.ts       # TypeScript definitions for Vite environment variables
│   │
│   ├── assets/             # Static assets imported into components (e.g. images, fonts) - (Suggest if needed)
│   ├── components/         # Shared, reusable React components
│   │   ├── common/         # General-purpose components (e.g., Button, Modal) - (Suggest if `ui/` isn't sufficient)
│   │   └── ui/             # Components from shadcn/ui library (customized or re-exported)
│   │   └── (feature-specific components like AIMajorRecommender.tsx can reside here or in a dedicated feature folder)
│   │
│   ├── contexts/           # React Context API providers for global/shared state
│   │   └── LanguageContext.tsx # Example context
│   │
│   ├── hooks/              # Custom React Hooks (e.g., `use-mobile.tsx`)
│   │
│   ├── lib/                # Utility functions, helpers, and library configurations
│   │   └── utils.ts        # General utility functions (e.g., `cn` from shadcn/ui)
│   │
│   ├── pages/              # Page-level components, typically mapped to routes
│   │   ├── Index.tsx       # Main landing page component
│   │   └── NotFound.tsx    # 404 Not Found page
│   │
│   ├── services/           # Modules for interacting with external APIs or backend services
│   │   └── googleSheets.ts # Example service (Supabase client initialization might also be here)
│   │
│   ├── styles/             # Global styles, theme configurations, or specific CSS modules if not using Tailwind utility-first for everything - (Suggest if needed)
│   │
│   ├── templates/          # Code templates or larger static code snippets
│   │   └── googleAppsScript.js # Example template
│   │
│   └── types/              # Shared TypeScript type definitions and interfaces - (Suggest if needed, or keep types co-located with features)
│
├── tests/                  # Test files (Jest, React Testing Library). Structure may mirror `src/` or group by type.
│                           # Currently, tests like `Announcement.test.tsx` are co-located in `src/components/`
│
├── .env.example            # Example environment variables file - (Suggest creating this)
├── .eslint.config.js       # ESLint configuration
├── .gitignore              # Specifies intentionally untracked files that Git should ignore
├── bun.lockb               # Bun lockfile (if Bun is used as package manager)
├── components.json         # shadcn/ui configuration for adding new components
├── index.html              # Main HTML file, entry point for Vite
├── jest.config.json        # Jest test runner configuration
├── package-lock.json       # npm lockfile (if npm is used)
├── package.json            # Project metadata, dependencies, and scripts
├── postcss.config.js       # PostCSS configuration (used by Tailwind CSS)
├── README.md               # General project information and setup guide
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.app.json       # TypeScript configuration for the application code (src)
├── tsconfig.json           # Root TypeScript configuration, references other tsconfig files
├── tsconfig.node.json      # TypeScript configuration for Node.js specific files (e.g., vite.config.ts)
└── vite.config.ts          # Vite build tool configuration
```

**Key Directory Guidance for AI Agents:**

*   **`src/components/`**: This is where most of the UI development will happen.
    *   `src/components/ui/`: Contains components added via shadcn/ui. AI agents should generally not modify these directly unless customizing their appearance or behavior significantly. New custom components that are general-purpose should go into `src/components/` or a subdirectory like `src/components/common/`.
    *   Feature-specific components (e.g., `AIMajorRecommender.tsx`) can be placed directly in `src/components/` or organized into feature-specific subdirectories within `src/components/` (e.g., `src/components/ai-major-recommender/`).
*   **`src/pages/`**: For top-level components that represent application routes.
*   **`src/lib/utils.ts`**: Contains utility functions like `cn` for merging Tailwind classes. Add other general-purpose helper functions here.
*   **`src/services/`**: For code related to fetching data or interacting with APIs (e.g., Supabase client setup, specific API call functions).
*   **`src/hooks/`**: For custom React hooks that encapsulate reusable logic.
*   **`src/contexts/`**: For React Context providers that manage global or widely shared state.
*   **Adding New shadcn/ui Components:** Use the `bunx shadcn-ui@latest add [component-name]` or `npx shadcn-ui@latest add [component-name]` command. The CLI will handle placing the component files into `src/components/ui/`.
*   **Tests:** While some tests are currently co-located (e.g., `src/components/Announcement.test.tsx`), a dedicated `/tests` directory is also present. For new tests, co-location with the component or function being tested is often preferred for easier navigation, or they can be placed in the `/tests` directory mirroring the `src` structure. AI agents should follow the established pattern or ask for clarification.
*   **Static Assets:**
    *   Files in `public/` are served directly from the root. Use this for assets like `favicon.ico`, `robots.txt`, or images that are not processed by Vite.
    *   Assets that are imported into components (e.g., images used in an `<img src={...} />` tag) should ideally be placed in `src/assets/` (create this directory if it doesn't exist) and imported into your JavaScript/TypeScript files. Vite will process these assets and include them in the build.
*   **`scripts/gen-sitemap.mjs`**: This script generates the `sitemap.xml` file. Every time you add a new landing page, add its path to the `routes` array in this file so it lands in the sitemap.

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

*   **Conventional Commits:** It is highly recommended to follow the [Conventional Commits specification](https://www.conventionalcommits.org/). This format makes it easier to understand changes and automate changelog generation.
    *   Format: `<type>[optional scope]: <description>`
    *   Example types: `feat` (new feature), `fix` (bug fix), `chore` (build changes, admin tasks), `docs` (documentation), `style` (code style changes), `refactor`, `test`, `perf`.
    *   Example:
        ```
        feat: add user profile page

        - Implemented the basic layout for the user profile page.
        - Added components for displaying user information and activity.
        - Connected to the user service to fetch data.
        ```
*   **Clarity:** Write clear and concise commit messages. The subject line should summarize the change, and the body (if needed) should provide more context.
*   **Atomic Commits:** Aim for small, atomic commits that represent a single logical change. This makes code reviews easier and helps in pinpointing issues.

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

*   **Node.js:** Version `18.x` or higher is recommended. (e.g., latest LTS version). You can check your Node.js version using `node -v`.
*   **Package Manager:** This project can use either `npm` (Node Package Manager) or `bun`.
    *   **npm:** Comes bundled with Node.js. Version `8.x` or higher recommended. Check with `npm -v`.
    *   **Bun:** An all-in-one JavaScript runtime & toolkit. If you choose to use Bun, ensure it's installed (see [Bun's official installation guide](https://bun.sh/docs/installation)). Check with `bun --version`.
    *   The project contains both `package-lock.json` (for npm) and `bun.lockb` (for Bun). It's recommended to stick to one package manager within the team to ensure consistency in dependency resolution.

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone [your-repository-url]
    cd vite_react_shadcn_ts
    # (Replace vite_react_shadcn_ts if your local project folder name is different)
    ```

2.  **Install Dependencies:**
    Choose **one** of the following package managers:

    *   **Using npm:**
        ```bash
        npm install
        ```
    *   **Using Bun:**
        ```bash
        bun install
        ```

3.  **Set Up Environment Variables:**
    *   This project uses Vite, which handles environment variables through `.env` files. See [Vite's documentation on Env Variables and Modes](https://vitejs.dev/guide/env-and-mode.html).
    *   Environment variables prefixed with `VITE_` are exposed to the client-side code.
    *   Create a `.env.local` file in the root of the project by copying `.env.example` (if it exists). **It's highly recommended to create an `.env.example` file in the repository root to list all required and optional environment variables with placeholder or default values.**
    *   **Example `.env.example` (AI agents should help create this if it doesn't exist):**
        ```env
        # General API URL (if not using Supabase exclusively)
        VITE_API_URL=http://localhost:3000/api

        # Supabase Project Details (if applicable)
        VITE_SUPABASE_URL=your-supabase-project-url
        VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

        # Other application-specific variables
        VITE_APP_TITLE=My Awesome App
        VITE_ENABLE_FEATURE_X=true
        ```
    *   Populate `.env.local` with your actual development keys and settings. **Do not commit `.env.local` to Git.** The `.gitignore` file should already include `*.local`.

4.  **Start the Development Server:**
    *   **Using npm:**
        ```bash
        npm run dev
        ```
    *   **Using Bun:**
        ```bash
        bun run dev
        ```
    This will typically start the development server on `http://localhost:8080` (as configured in `vite.config.ts`).

### Running Linters and Type Checkers

*   **Linting (ESLint):**
    ```bash
    npm run lint
    # or
    bun run lint
    ```
*   **Type Checking (TypeScript):**
    Vite performs type checking as part of its development server and build process. For a dedicated type check, you can add a script to `package.json` if needed:
    `"type-check": "tsc --noEmit"`
    Then run:
    ```bash
    npm run type-check
    # or
    bun run type-check
    ```

### IDE Configuration (Recommended)

*   **VSCode:**
    *   Install recommended extensions like ESLint, Prettier, Tailwind CSS IntelliSense.
    *   Configure format on save to use Prettier.
*   **WebStorm/IntelliJ IDEA:**
    *   Ensure ESLint and Prettier integrations are enabled and configured.
    *   Set up Tailwind CSS support.
```

## Core Feature Implementation

This section should detail the implementation approach for the project's main features. AI agents can use this information to understand the existing patterns and contribute new features consistently.
*(The project team should populate this section with specifics for each major feature module.)*

### General Approach

*   **Component-Based Architecture:** Features are built as a composition of React components.
*   **Service Layer:** Interactions with APIs and backend services are abstracted into a service layer (`src/services/`).
*   **State Management:** Utilize TanStack React Query for server state and React hooks/context for client state.
*   **Modularity:** Break down features into manageable and reusable components and functions.

### Example: Feature Module 1 - (e.g., User Authentication)

*(This is a template. Replace with actual feature details.)*

*   **Description:** Handles user sign-up, login, logout, and session management.
*   **Key Components:**
    *   `src/pages/LoginPage.tsx`
    *   `src/pages/SignupPage.tsx`
    *   `src/components/auth/LoginForm.tsx`
    *   `src/components/auth/SignupForm.tsx`
*   **Services Used:**
    *   `src/services/authService.ts` (which might use Supabase Auth client or a custom API).
*   **State Management:**
    *   User session and profile data might be stored in a React Context (e.g., `AuthContext`) or managed via Supabase's session handling and React Query for profile data.
*   **Key Code Examples/Patterns:**

    *   **Typical React Component Structure:**
        ```tsx
        // src/components/feature/MyFeatureComponent.tsx
        import React, { useState, useEffect } from 'react';
        import { useQuery } from '@tanstack/react-query';
        // import { myService } from '@/services/myService'; // Example service import
        import { Button } from '@/components/ui/button'; // shadcn/ui component

        interface MyFeatureComponentProps {
          id: string;
        }

        const MyFeatureComponent: React.FC<MyFeatureComponentProps> = ({ id }) => {
          // const { data, isLoading, error } = useQuery({
          //   queryKey: ['featureData', id],
          //   queryFn: () => myService.getById(id),
          // });

          // if (isLoading) return <p>Loading...</p>;
          // if (error) return <p>Error loading data.</p>;

          return (
            <div>
              {/* <h1>Feature: {data?.name}</h1> */}
              <Button>Click Me</Button>
            </div>
          );
        };

        export default MyFeatureComponent;
        ```

    *   **Utility Function Example:**
        ```typescript
        // src/lib/utils/featureUtils.ts
        /**
         * Processes raw data for the feature.
         * @param rawData - The raw data to process.
         * @returns Processed data.
         */
        export const processFeatureData = (rawData: any[]): any[] => {
          // Implementation logic
          return rawData.map(item => ({ ...item, processed: true }));
        };
        ```

### Example: Feature Module 2 - (e.g., Data Display & Interaction)

*(This is a template. Replace with actual feature details.)*

*   **Description:** ...
*   **Key Components:** ...
*   **Services Used:** ...

### API Service Standards

*   API interactions are centralized in the `src/services/` directory.
*   If using Supabase, the Supabase client will be the primary interface.
    ```typescript
    // src/services/supabaseClient.ts (Example - actual setup might vary)
    import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase URL or Anon Key is missing. Check your .env.local file.");
    }

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);
    ```
*   For other REST APIs, use `fetch` or consider a lightweight wrapper if needed. Ensure proper error handling and typing for requests and responses.
    ```typescript
    // src/services/customApiService.ts (Example with fetch)
    const BASE_URL = import.meta.env.VITE_API_URL;

    interface ApiResponse<T> {
      data: T;
      error?: string;
    }

    async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
      const response = await fetch(`${BASE_URL}${endpoint}`, options);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }
      return response.json();
    }

    export const customApiService = {
      getData: async (id: string): Promise<any> => { // Replace 'any' with specific type
        return request<any>(`/data/${id}`);
      },
      // other methods...
    };
    ```

### State Management Patterns

*   **Server State (TanStack React Query):**
    *   Use `useQuery` for fetching data.
    *   Use `useMutation` for creating, updating, or deleting data.
    *   Define clear query keys, often structured hierarchically.
    *   Leverage caching, refetching, and optimistic updates as appropriate.
*   **Client State (React Hooks & Context):**
    *   For UI state, form state, or simple shared state, use `useState`, `useReducer`, or `useContext`.
    *   Refer to `src/contexts/` for examples of shared state using Context API.
    *   If global client state becomes complex, the team may decide to introduce a dedicated library like Zustand. AI agents should then follow patterns established with that library.
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
```

## Agent Contributions Log (Jules - Major-Matcher-v2 Ticket)

This section logs significant contributions made by the AI agent "Jules" related to the "Major-Matcher-v2" ticket.

*   **Supabase Integration for Quiz Data:**
    *   Created `src/lib/supabaseClient.ts` to initialize the Supabase client using environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
    *   Implemented logic in `src/components/AIMajorRecommender.tsx` to insert completed quiz session data into the `quiz_sessions` table in Supabase. This includes user details, answers, top major, confidence, and badge slug.
    *   A new React context `src/contexts/SessionContext.tsx` was created to store and provide the `sessionId` returned from the `quiz_sessions` insert.
*   **Analytics Event Logging:**
    *   Implemented a `logCtaEvent` function in `src/components/AIMajorRecommender.tsx` to send analytics data to the `analytics_events` table in Supabase.
    *   Logged CTA events for 'whatsapp_click', 'share' (new button), and 'restart' actions on the quiz results page, associating them with the `sessionId`.
*   **Badge Hero Integration:**
    *   Integrated a "Badge Hero" section in the results view of `src/components/AIMajorRecommender.tsx`. This section displays the user's earned badge (emoji and localized label) based on their top major.
*   **Dynamic OG Image Generation:**
    *   Created a new API endpoint `api/og-image.ts` to dynamically generate Open Graph images.
    *   This endpoint uses the `canvas` library to create a PNG image (1200x630) featuring the badge emoji and label corresponding to a major `slug` and `lang` passed as query parameters.
    *   Set up a simple Express server (`api/server.ts`) and npm scripts (`dev:api`, `build:api`) to run this endpoint locally and prepare it for serverless deployment.
    *   The `handleShare` function in `AIMajorRecommender.tsx` was updated to construct the `ogUrl` and log it as part of the 'share' event metadata.
*   **Share Functionality:**
    *   Added a "Share" button to the quiz results page in `AIMajorRecommender.tsx`.
    *   This button uses the Web Share API if available, with a fallback to copying the page link to the clipboard.
    *   Triggers a 'share' event log to `analytics_events` with metadata including the share method and the generated OG image URL.
*   **Consistency Guard in Scorer:**
    *   Added a check in `src/hooks/useMajorScorer.ts` to ensure that the `topMajorSlug` produced by the scorer is present in `src/configs/BadgeMap.ts`. A warning is logged if a slug is missing, prompting for `BadgeMap.ts` updates.

*   **Major Scorer v2.2 & Explanation Enhancement (Jules):**
    *   Refined scoring logic in `src/hooks/useMajorScorer.ts` (v2.2) to improve major ranking accuracy, particularly for STEM vs. Media majors.
    *   Updated `src/configs/questions.json` with new weights and capped weights for art/media options to prevent them from outranking STEM fields inappropriately.
    *   Implemented a new grade band rule:
        *   Grade <70% (-5 to `medicine`).
        *   Grade >85% (+1 to `medicine`, `computer`, `engineering`).
    *   Added a tie-breaker rule using a predefined priority list (`['computer','engineering','business','media','design']`).
    *   Revised confidence calculation to be `TopMajorScore / (TopMajorScore + SecondMajorScore)`.
    *   Implemented `buildExplanation()` in `src/hooks/useMajorScorer.ts` to generate personalized reasons for the top major recommendation based on impactful answer contributions (score effect ≥ 2).
    *   Expanded `src/configs/BadgeMap.ts` with new badge definitions to ensure better coverage and reduce fallback badge usage.
    *   Updated the results UI in `src/components/AIMajorRecommender.tsx` to:
        *   Display the badge hero (emoji and label) for the top major.
        *   Show a confidence warning alert if the gap between the top two majors is less than 15% (confidence < 0.55).
        *   Display personalized "reason chips" using the explanations from `buildExplanation()`.
    *   Ensured `badge_slug` (same as `top_major_slug`) is logged to Supabase `quiz_sessions`.
    *   Updated the 'share' event logging to include the `badge` (top major slug).
    *   Added new unit tests for `useMajorScorer.ts` covering the new logic (tech favoring, medicine penalty, tie-breaking).

*   **Blank Results Page Fix (Jules - [CURRENT_DATE_PLACEHOLDER] / Commit [COMMIT_HASH_PLACEHOLDER]):**
    *   Diagnosed and fixed a bug causing a blank page when viewing quiz results.
    *   Root cause: A `ReferenceError` in `AIMajorRecommender.tsx` due to an undefined `majorCategories` variable used for displaying major names.
    *   Fix: Modified the results rendering logic to use `getBadgeForMajor(slug)` from `BadgeMap.ts` to retrieve localized major names, removing the dependency on the undefined variable.
    *   Added diagnostic `console.log` to the results view to aid in debugging similar issues.
    *   Corrected a misconfiguration in `AIMajorRecommender.tsx` where the UI option ID for "Computer & Technology" subject (`"computer"`) did not match the ID expected by `questions.json` (`"it"`), ensuring correct score calculation for this subject.
    *   Updated the `useEffect` hook responsible for Supabase submission in `AIMajorRecommender.tsx` to include all necessary dependencies in its dependency array, preventing potential stale closure issues.
    *   Updated `README.md` with a new section: "Debugging a blank results page".

*   **Follow-Up Debug & Enhancement (Jules - [CURRENT_DATE_PLACEHOLDER] / Commit [COMMIT_HASH_PLACEHOLDER]):**
    *   **Supabase Schema Error Fix:** Resolved `Could not find the 'language' column of 'quiz_sessions'` error by removing the orphaned `language` property from the insert payload in `AIMajorRecommender.tsx` -> `saveSession()` effect. The `quiz_sessions` table does not have a `language` column.
    *   **Program Card Rendering:**
        *   Added diagnostic logging to `AIMajorRecommender.tsx` in the `fetchAndSetPrograms` effect to trace how budget filters affect program list generation (Problem B).
        *   The existing program fetching logic in `AIMajorRecommender.tsx` already considers multiple slugs from `sortedScores` (up to `SLUG_LIMIT`) in its batch DB query. The fallback logic "if a slug returns <1 row, iterate to next slug" is implicitly handled if the initial batch fetch for `topSlugs` returns programs from various slugs. The key is ensuring `topSlugs` from `sortedScores` are valid and have DB matches.
    *   **Creative Reason Strings:**
        *   Confirmed that `useMajorScorer.ts` -> `buildExplanation()` uses `phraseMap` (via `generateCreativeReasonString` helper) from `src/utils/explanationPhrases.ts` to generate human-readable explanations (Problem C).
        *   Verified that `AIMajorRecommender.tsx` correctly renders these creative strings as UI chips.
    *   **Slug Alias & DB Coverage Procedure (Documentation):**
        *   If program cards are missing for expected majors (e.g., 'computer', 'engineering', 'media'), it might be due to missing `major_slug` entries in `programs_view` or a lack of aliases in the `major_aliases` table that feeds the view.
        *   **To Check Coverage:**
            ```sql
            -- Run this query against your Supabase DB
            SELECT DISTINCT major_slug, COUNT(*)
            FROM public.programs_view
            WHERE major_slug IN ('computer','engineering','media') -- Add other relevant slugs
            GROUP BY major_slug;
            ```
        *   **If a slug shows count = 0:**
            1.  **Add Aliases:** Insert necessary aliases into the `public.major_aliases` table. For example, if "Computer Science" programs should map to the `computer` slug but aren't, add an alias linking "Computer Science" (or its variants found in raw program data) to `computer`.
            2.  **Refresh View:** Re-create the `programs_view` to include the new aliases. This usually involves:
                ```sql
                DROP VIEW IF EXISTS public.programs_view;
                -- Then re-run the CREATE VIEW statement for programs_view
                -- (ensure the CREATE VIEW statement correctly joins with major_aliases)
                ```
        *   This procedure is crucial for ensuring the `major_slug` in `programs_view` aligns with the slugs generated by `useMajorScorer`.
    *   **Regression Tests:**
        *   Added a unit test suite for `useMajorScorer` in `__tests__/useMajorScorer.test.ts` using the provided JSON fixture to validate `topMajorSlug`, `confidence`, and `reasons`.
        *   Added an integration test for `AIMajorRecommender` in `__tests__/AIMajorRecommender.int.test.tsx`. This test simulates the full quiz flow with the fixture, mocks Supabase program fetching, and asserts that three program cards and creative reason chips are rendered.