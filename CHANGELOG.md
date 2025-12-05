# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.2.1] - YYYY-MM-DD
### Fixed
- Blank results page after AI Major Recommendation Quiz due to a JavaScript rendering error (ReferenceError for undefined variable `majorCategories` when displaying major names).
- Mismatch between UI option ID ("computer") and scorer configuration ID ("it") for "Computer & Technology" subject in SP1, ensuring correct score calculation.
- Missing dependencies in the `useEffect` hook responsible for Supabase submission in `AIMajorRecommender.tsx`, preventing potential stale closure issues.

### Added
- Diagnostic `console.log` in the quiz results view to help debug future rendering issues.
- "Debugging a blank results page" section to `README.md`.
- Contribution log for this fix in `AGENTS.md`.

---
*Older entries should follow above format.*
