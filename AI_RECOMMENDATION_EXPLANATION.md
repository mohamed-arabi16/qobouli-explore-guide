# AI Major Recommendation: System Architecture and Logic (v3.0)

This document outlines the architecture, data flow, scoring methodology, and explanation generation process for the AI Major Recommender feature (version 3.0 "25-Question Offline Catalogue") within the Qobouli Education platform.

## 1. Overview

The AI Major Recommender is an interactive 25-question quiz designed to suggest suitable academic majors. Key changes in v3.0 include:
1.  **Offline Data Sources:** Questions and program recommendations are now primarily driven by local JSON files.
2.  **Expanded Questionnaire:** The quiz now consists of 25 questions defined in `src/configs/scorer_questions.json`.
3.  **Deterministic Scoring:** A new scoring model is implemented in `useMajorScorer.ts`.
4.  **Simplified Program Display:** Recommendations are program titles from a local catalog.
5.  **Database Writes Only:** Supabase is used for writing quiz sessions and analytics events, with no database reads for recommendations.

The tool guides users through the quiz, processes answers, saves the session, and displays recommended major titles along with personalized explanations.

## 2. System Components and Connections

*   **`AIMajorRecommender.tsx` (Orchestrator):**
    *   Central React component managing the quiz UI (25 questions), state, and flow.
    *   Renders `UserInfoForm.tsx` for user details.
    *   Sources questions directly from `src/configs/scorer_questions.json` for UI rendering.
    *   Collects answers in `rawAnswers` state.
    *   Calls the `useMajorScorer` hook with `rawAnswers` to get scores and boosters.
    *   Uses `pickPrograms` from `src/lib/programCatalog.ts` to select program titles from `src/data/programs.json`.
    *   Uses `buildExplanation` from `src/utils/explanationPhrases.ts` with boosters to generate reasons.
    *   Saves session data to Supabase (`quiz_sessions` table).
    *   Handles share functionality (image capture of results + deep-link) and analytics events.

*   **`UserInfoForm.tsx` (User Details Form):**
    *   Collects user's name and phone number.

*   **`useMajorScorer.ts` (Scoring Engine Hook):**
    *   Core recommendation logic. Receives `rawAnswers`.
    *   Uses `src/configs/scorer_questions.json` for question definitions, option weights, and scoring rules.
    *   Calculates raw scores for 25 major "buckets" based on question types (`rank`, `single`, `scale`).
    *   Applies a grade band rule (PRD §4.5).
    *   Floors negative scores at 0.
    *   Sorts majors with tie-breaking (cs_ai first, aviation last, then alphabetical) (PRD §4.7).
    *   Returns an object with `scores` (for all buckets), `sortedMajors` (slug and score), and `boosters` (for explanations).

*   **`src/configs/scorer_questions.json` (Question & Scoring Configuration):**
    *   Authoritative source for the 25 questions, their types (`rank`, `single`, `scale`), prompts (English & Arabic), options, and scoring weights/mappings/targets.

*   **`src/data/programs_names.csv` (Raw Program Titles):**
    *   A simple CSV file with one column (`title`) listing all program names.

*   **`scripts/gen-programs-json.cjs` (CSV to JSON Converter):**
    *   Node.js script that reads `programs_names.csv` and generates `src/data/programs.json`.
    *   This script is run as part of the build process (`npm run build`).

*   **`src/data/programs.json` (Offline Program Catalog):**
    *   Generated JSON file containing an array of objects, each with a `title` string.
    *   This is the data source for program recommendations. Imported by `programCatalog.ts`.

*   **`src/lib/programCatalog.ts` (Program Picker):**
    *   Imports `programs.json`.
    *   Contains `keywordMap` (PRD §2) mapping major slugs to keywords.
    *   Exports `pickPrograms(sortedMajors)` function, which filters `programs.json` based on keywords for the top-scoring major slugs and returns up to 3 unique program titles.

*   **`src/utils/explanationPhrases.ts` (Explanation Engine):**
    *   Contains `phraseMap` (localized creative phrases keyed by option IDs/booster keys).
    *   Exports `buildExplanation(boosters, locale)` function, which maps boosters from `useMajorScorer` to up to 4 localized explanation phrases.

*   **`src/lib/supabaseClient.ts` (Supabase Client):**
    *   Initializes and exports the Supabase JavaScript client for database interactions.

## 3. Data Flow and Processing Pipeline

1.  **User Information Input:** User provides name/phone via `UserInfoForm.tsx`.
2.  **Quiz Answer Collection:**
    *   `AIMajorRecommender.tsx` displays 25 questions sourced from `src/configs/scorer_questions.json`.
    *   User selections are stored in `rawAnswers` state (e.g., `rawAnswers = {"SP1": ["math", "computer", "art"], "GRADE": "gt85"}`).
3.  **Scoring Mechanism (`useMajorScorer.ts`):**
    *   `useMajorScorer` hook processes `rawAnswers` directly.
    *   **Weight Application (PRD §4.1-§4.4):**
        *   For each answer, it looks up the question in `scorer_questions.json`.
        *   `rank`: Applies 3/2/1 weights to selected options and uses `weight_mapping`.
        *   `single`: Uses `weights` map for specific option scores or `yes_weight` for binary choices. Handles "love/ok/no" via these weights.
        *   `scale`: Multiplies answer value by `scale_weight`.
    *   **Grade Band Rule (PRD §4.5):** Adjusts scores for specific majors based on the "GRADE" answer.
    *   **Score Finalization & Sorting (PRD §4.6-§4.7):** Negative scores are floored to 0. Majors are sorted by score, with tie-breaking (`cs_ai` first, `aviation` last).
    *   **Booster Generation (PRD §4.8):** Collects answer option IDs and grade band identifiers as `boosters`.
4.  **Program Title Selection (`pickPrograms` in `programCatalog.ts`):**
    *   `AIMajorRecommender.tsx` calls `pickPrograms` with `computedScorerResult.sortedMajors`.
    *   `pickPrograms` filters `src/data/programs.json` using `keywordMap` to find up to 3 program titles matching the top-ranked major slugs.
5.  **Explanation Generation (`buildExplanation` in `explanationPhrases.ts`):**
    *   `AIMajorRecommender.tsx` calls `buildExplanation` with `computedScorerResult.boosters`.
    *   Returns up to 4 localized explanation strings.
6.  **Session Persistence (`AIMajorRecommender.tsx`):**
    *   On quiz completion, session data is saved to Supabase `quiz_sessions` table.
    *   Payload includes `userName`, `userPhone`, `rawAnswers`, `grade_band` (string value like 'gt85'), `top_major_slug`, and `badge_slug` (same as `top_major_slug`).
    *   `sessionId` from the database response is stored.
7.  **Results Display (`AIMajorRecommender.tsx`):**
    *   The UI updates to show recommended program titles and explanation phrases.
    *   CTA buttons (WhatsApp, Share, Reset) log events to `analytics_events`. Share includes image capture and deep-link. Deep-links `/?session=<uuid>` can rehydrate results by fetching from `quiz_sessions`.

## 4. Detailed Scoring Aspects (PRD §4)

*   **Question Types:**
    *   **`rank`:** Assigns 3, 2, or 1 points to the ranked selections, which then multiplies the scores defined in the `weight_mapping` for each selected option against target buckets.
    *   **`single`:**
        *   If `weights` map exists for the selected option, these scores are added to target buckets.
        *   If `yes_weight` is defined and the answer is "yes", `yes_weight` is added to `targets`.
        *   "love/ok/no" questions use the `weights` map (e.g., `HEALTHCARE: {"love":{"medicine":3,"nursing":2}}`).
    *   **`scale`:** The numeric answer value is multiplied by `scale_weight` and added to each bucket in `targets`.
*   **Grade-band Rule:**
    *   `lt70`: `medicine` −5, `dentistry` −4, `elec` −2, `mech` −2, `civil` −2.
    *   `gt85`: `medicine` +1, `cs_ai` +1, `elec` +1, `mech` +1, `civil` +1.
*   **Score Flooring:** Negative totals for any bucket are set to 0.
*   **Sorting & Tie-breaking:** Sorted by score descending. Ties: `cs_ai` first, `aviation` last, then alphabetical.
*   **Boosters:** An array of strings (e.g., "math", "logical", "gradeBand1") derived from user answers, used for generating explanations.

## 5. Explanation Generation (`buildExplanation` from `explanationPhrases.ts`)

*   Receives the `boosters` array from `useMajorScorer`.
*   Maps these booster strings to predefined, localized creative phrases using `phraseMap`.
*   Returns up to 4 unique phrases. Example booster "ENVIRON_yes" maps to "You care about environmental sustainability...".

## 6. User Interface Elements (Results Page)

*   **Recommended Programs:** Displays up to 3 program titles.
*   **Explanation Phrases:** Displays up to 4 generated reasons.
*   **Share Functionality:** Captures an image of the results card and uses Web Share API (or clipboard fallback) with a deep-link `/?session=<uuid>`.
*   **CTAs:** Buttons for WhatsApp, Share, Restart.

## 7. Conclusion

The AI Major Recommender v3.0 transitions to an offline-first model for its core recommendation data (questions and programs), streamlining data management and ensuring deterministic outputs. The 25-question model with its varied scoring types aims to provide nuanced recommendations, while Supabase handles essential write operations for session tracking and analytics.
