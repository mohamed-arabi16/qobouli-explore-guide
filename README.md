# Qobouli Education

Qobouli Education is a web platform designed to assist students with AI-powered major recommendations, educational resources, and career guidance..

## About The Project

Qobouli Education is a comprehensive platform built to support students in their academic and career journeys. Leveraging AI, it provides personalized major recommendations and offers a suite of tools and resources to help students navigate their educational paths.

Key features include:
*   **AI Major Recommender:** An intelligent tool based on a 25-question quiz that suggests suitable academic majors. Recommendations are drawn from an offline catalog of programs.
*   **Resource Toolbox:** A curated collection of helpful links, tools, and materials for students.
*   **Educational Roadmap:** Provides guidance and milestones for various academic and career paths.
*   **FAQ Section:** Answers common questions students might have regarding their studies and future prospects.

## Tech Stack

This project is built with a modern tech stack:

*   **Frontend:**
    *   React
    *   Vite
    *   TypeScript
    *   ShadCN UI
    *   Tailwind CSS
    *   React Router (for navigation)
*   **Data Handling & Backend Aspects:**
    *   Supabase (for backend services like storing quiz sessions and analytics)
    *   Offline data catalogs (JSON files for program and question data)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm (comes with Node.js) or yarn

### Installation

1.  Clone the repo:
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    ```
    *(Please replace `your-username/your-repository-name.git` with the actual repository URL after it's pushed to a remote server.)*
2.  Navigate to the project directory:
    ```bash
    cd your-repository-name
    ```
3.  Install NPM packages:
    ```bash
    npm install
    ```

### Running the Development Server

To run the app in development mode:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in the browser. The page will reload if you make edits.

### Building for Production

To create a production build:
```bash
npm run build
```
This command bundles the app into static files for production in the `dist` folder.

### SEO & Sitemap
The `sitemap.xml` file is generated automatically at build time by the `scripts/gen-sitemap.mjs` script.
If you add a new landing page, make sure to add its path to the `routes` array in `scripts/gen-sitemap.mjs` to include it in the sitemap.

### Dynamic OG-Image Endpoint

This project includes a local API endpoint for generating dynamic Open Graph (OG) images, typically used for social media sharing previews.

*   **Endpoint:** `/api/og-image`
*   **Functionality:** Generates a 1200x630 PNG image displaying a badge emoji and label based on a provided `slug` (major slug) and `lang` (language) query parameter. For example: `/api/og-image?slug=computer&lang=en`.
*   **Technology:** Uses the `canvas` library on a simple Express.js server. The code is in `api/og-image.ts` (handler) and `api/server.ts` (server setup).
*   **Font:** Requires the Amiri font (`Amiri-Regular.ttf`). Ensure this font is placed in the `api/fonts/` directory. The build process (`npm run build:api`) will copy this to `dist/api/fonts/`.
*   **Running Locally:**
    ```bash
    npm run dev:api
    ```
    This starts the API server, typically on `http://localhost:3001`. The main Vite dev server (`npm run dev`) for the frontend runs separately.
*   **Dependencies:** `canvas`, `express`, `copyfiles` (for build).
*   **Deployment:** The `api/og-image.ts` handler is designed to be straightforward to deploy as a serverless function on platforms like Vercel or Netlify. You would need to ensure the `canvas` dependency and the font file are correctly handled in the serverless environment.

## Key Features

Here's a closer look at some of the main features of Qobouli Education:

*   **AI Major Recommender (`AIMajorRecommender.tsx`):**
    *   Presents a 25-question quiz to users.
    *   Utilizes the `useMajorScorer` hook (from `src/hooks/useMajorScorer.ts`) to process answers against rules defined in `src/configs/scorer_questions.json`.
    *   The `programCatalog.ts` library then picks up to 3 relevant programs from an offline data source (`src/data/programs.json`, generated from `src/data/programs_names.csv`).
    *   User quiz sessions and analytics events are saved to Supabase (see "Data Flow" section).

    *   **Scoring Logic (v3.0 "25-Question Offline Catalogue"):**
        *   **Question Types & Weighting:**
            *   `rank`: Ranks selections (e.g., 3 for 1st, 2 for 2nd, 1 for 3rd) and applies mapped weights.
            *   `single`: Applies weights based on the chosen option, or a `yes_weight` to target buckets. Handles "love/ok/no" via specific weights in the JSON.
            *   `scale`: Multiplies the user's scaled input by a `scale_weight` and applies to target buckets.
        *   **Grade Band Rule:**
            *   `lt70` (<70%): `medicine` −5, `dentistry` −4, `elec` −2, `mech` −2, `civil` −2.
            *   `gt85` (>85%): `medicine` +1, `cs_ai` +1, `elec` +1, `mech` +1, `civil` +1.
            *   `70_85` (70-85%): No specific score adjustment by this rule.
        *   **Score Flooring:** All bucket scores are floored at 0 (negative totals become 0).
        *   **Tie-Breaker:** If multiple majors have the same final score, `cs_ai` is prioritized first, `aviation` is prioritized last. Other ties are resolved alphabetically.
        *   **Explanation Generation (`buildExplanation()`):** Reasons for the top recommendation are generated by mapping `boosters` (derived from user answers and grade bands) to predefined, localized phrases from `src/utils/explanationPhrases.ts`. Up to 4 phrases are shown.
        *   **Program Selection:** The top-scoring major slugs are passed to `pickPrograms`, which filters `src/data/programs.json` based on keywords (from `src/lib/programCatalog.ts`) to find matching program titles. Budget filtering is not currently implemented as `programs.json` only contains titles.

*   **Resource Toolbox (`ResourceToolbox.tsx`):**
    *   Provides a curated list of external links, articles, tools, and other materials.
    *   Aimed at helping students with their studies, career planning, and personal development.

*   **Educational Roadmap (`Roadmap.tsx`):**
    *   Offers structured guidance and suggested timelines for different academic programs or career aspirations.
    *   Helps students understand prerequisites, key milestones, and potential pathways.

*   **FAQ Section (`FAQSection.tsx`):**
    *   Contains a list of frequently asked questions and their answers.
    *   Covers common queries related to the platform, major selection, academic advice, and career opportunities.

## Data Flow / Backend Integration

### Offline Data Sources
*   **Questions:** The 25 quiz questions, their types, options, and scoring weights are defined in `src/configs/scorer_questions.json`.
*   **Program Catalog:** A list of program titles is stored in `src/data/programs.json`. This file is generated at build time from `src/data/programs_names.csv` by the script `scripts/gen-programs-json.cjs`. The `npm run build` command automatically runs this script.

### Supabase

The project connects to a Supabase backend for storing user-specific data. The Supabase client is initialized in `src/lib/supabaseClient.ts`.

**Environment Variables:**

Ensure you have a `.env.local` file in the project root (copied from a `.env.example` if available, or create one) with the following Supabase credentials:

```env
VITE_SUPABASE_URL="your-supabase-project-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```
Replace placeholder values with your actual Supabase project URL and public anonymous key. These variables are used by `src/lib/supabaseClient.ts`.

**Database Schema:**

The application utilizes the following Supabase database tables:

*   **`quiz_sessions`**:
    *   **Purpose:** Stores every completed AI Major Recommender quiz session. This includes the user's answers, lead information (name/phone if provided), the calculated top major slug, and assigned badge slug.
    *   **Key Columns:** `id` (uuid PK), `full_name` (text), `phone_number` (text), `user_id` (uuid, FK to auth.users if auth is used), `answers` (jsonb - stores raw answers to the 25 questions), `grade_band` (text - stores 'lt70', '70_85', or 'gt85'), `top_major_slug` (text), `badge_slug` (text), `created_at` (timestamptz). The `confidence` column is no longer populated by the v3.0 scorer.
    *   **SQL Schema (Example):**
        ```sql
        CREATE TABLE public.quiz_sessions (
            id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
            created_at timestamp with time zone DEFAULT now() NOT NULL,
            full_name text,
            phone_number text,
            user_id uuid,
            answers jsonb,
            grade_band text,
            top_major_slug text,
            badge_slug text
        );
        -- RLS policies as needed
        ```

*   **`analytics_events`**:
    *   **Purpose:** Captures specific user interactions (Call To Action events) like clicks on WhatsApp, Share, or Restart quiz.
    *   **Key Columns:** `id` (uuid PK), `session_id` (uuid, FK to `quiz_sessions.id`), `event_type` (text), `event_meta` (jsonb), `created_at` (timestamptz).

(Further details on specific Supabase usage can be added here.)

## Project Structure (Overview)

A brief overview of the key directories:
```
/
├── public/               # Static assets
├── scripts/
│   └── gen-programs-json.cjs # Script to convert CSV to JSON
├── src/
│   ├── components/       # React components
│   ├── configs/          # Configuration files (e.g., scorer_questions.json)
│   ├── data/             # Data files (programs_names.csv, programs.json)
│   ├── contexts/         # React context providers
│   ├── hooks/            # Custom React hooks (e.g., useMajorScorer.ts)
│   ├── lib/              # Core libraries (e.g., programCatalog.ts, supabaseClient.ts)
│   ├── pages/            # Top-level page components
│   ├── utils/            # Utility functions (e.g., explanationPhrases.ts)
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Entry point
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### Internationalization (i18n) Rules
*   UI strings must be added to `src/locales/en.json` and `src/locales/ar.json`.
*   The project uses `eslint-plugin-i18next` to guard against hard-coded strings in React components and TypeScript files. Run `npm run lint` before creating a Pull Request to check for violations. The pre-commit hook will also run this check.
*   Configuration files (e.g., `tailwind.config.ts`) and scripts (e.g., in `scripts/`) have an ESLint override in `eslint.config.js` to disable the `i18next/no-literal-string` rule for those specific paths, as their string literals are not typically user-facing UI text.

### Adding a New UI String
1.  Add your new translation key and its value to `src/locales/en.json`.
2.  Add the corresponding key and its translation to `src/locales/ar.json`. (Ensure JSON syntax remains valid in both files).
3.  In your component/code, import the `useTranslation` hook from `react-i18next` (or `useLanguage` from context if already used and it provides the `t` function).
4.  Use the `t('your.new.key')` function to display the string.
5.  Run `npm run lint` to ensure the new string doesn't violate any rules and that your JSON files are still valid.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` file for more information.

*(Note: You will need to add a `LICENSE` file to your repository. If you haven't chosen a license, common choices include MIT, Apache 2.0, or GPLv3.)*
