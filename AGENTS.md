# AGENTS.md

## Purpose

This repository contains `extenso`, a zero-runtime-dependency TypeScript library
that writes numbers in Portuguese. Changes must preserve linguistic correctness,
numeric precision, package compatibility, and the documented public API.

These instructions apply to the entire repository.

## Runtime and toolchain

- Use Node.js 22.20 or newer. CI validates Node.js 22 and 24.
- Use npm and keep `package-lock.json` synchronized with `package.json`.
- AVA is the test runner, c8 enforces coverage, ESLint handles formatting and
  static analysis, esbuild produces JavaScript bundles, and TypeScript produces
  declarations.
- Do not add a runtime dependency without a strong, documented reason. The
  package intentionally has zero runtime dependencies.

## Repository map

- `src/index.ts`: public entry point and high-level conversion pipeline.
- `src/types.ts`: canonical public TypeScript types. Define public types here and
  re-export them from `src/index.ts`.
- `src/core/`: conversion orchestration and number-writing algorithms.
- `src/core/integer/`: integer group formatting and scale conjunction rules.
- `src/mode/`: behavior specific to number, currency, digit, and abbreviated
  modes.
- `src/lists/`: Portuguese vocabulary, scales, ordinals, decimals, and currency
  metadata.
- `src/utils/`: parsing, normalization, validation, currency detection, locale
  translation, and text post-processing.
- `src/**/tests/`: unit tests colocated with their subsystem.
- `src/tests/`: public API, regression, option-combination, boundary, and
  performance tests.
- `test/installed-package.mjs`: tests the packed artifact as CommonJS, ESM, and
  TypeScript consumers.
- `README.md` and `README-english.md`: equivalent Portuguese and English public
  documentation.
- `dist/` and `build/`: generated output. Never edit these files manually or
  commit them.

## Public contracts

- The default ESM export is the `extenso` function.
- `require('extenso')` must return the function directly.
- Named TypeScript exports must remain available from the package root.
- Supported inputs are `string`, finite `number`, and `bigint`.
- Preserve exact string and bigint digits. Never route large values through
  floating-point arithmetic.
- Supported output modes are `number`, `currency`, `digit`, and `abbreviated`.
- Public option values, validation behavior, scale limits, and error cases must
  stay synchronized with both READMEs.
- Treat changes to output wording, accepted input, defaults, thrown errors,
  package exports, or TypeScript types as public API changes.

## Architecture rules

- Keep `src/index.ts` focused on the high-level pipeline: validation, resolution,
  normalization, parsing, conversion, translation, and post-processing.
- Put mode dispatch in `src/core/convert.ts` and implicit currency or mode
  selection in `src/core/resolve-conversion.ts`.
- Keep parsing and validation separate from linguistic formatting.
- Prefer small domain functions with explicit names over long conditional chains.
- Reuse canonical vocabulary and scale lists instead of duplicating Portuguese
  words in production code.
- Runtime validators must accept `unknown` at untyped boundaries and narrow it
  safely. Avoid `any`, double assertions, and unchecked casts.
- When adding an enum value or public option, update runtime validation, public
  types, mode resolution, tests, and both READMEs together.

## Code style

- Follow `eslint.config.mjs`; there is no Prettier configuration.
- Use four spaces, single quotes, no semicolons, and trailing commas in multiline
  structures.
- End every text file with a newline.
- Prefer `const`, expression-style functions, early returns, and explicit return
  types for public or non-obvious functions.
- Use `import type` for type-only imports.
- Keep production files below the configured 300-line limit.
- Comments should explain linguistic, numeric, or compatibility reasoning rather
  than restating the code.
- Error messages are part of debugging ergonomics. Keep them specific and test
  important error behavior.

## Testing requirements

- Every behavior change or bug fix requires a regression test.
- Test public behavior through `src/tests/` and focused implementation behavior
  through the relevant subsystem test directory.
- Include singular, plural, zero, negative, decimal, gender, locale, short-scale,
  long-scale, and boundary cases when relevant.
- For parsing changes, cover both decimal-separator configurations, grouping,
  malformed input, and precision-preserving string cases.
- For currency changes, cover code, symbol, unit, subunit, custom definitions,
  detection precedence, and decimal precision.
- Coverage must remain at 100% for statements, branches, functions, and lines.
  Do not exclude meaningful code merely to satisfy the threshold.

Run the following before considering a code change complete:

```bash
npm run lint
npx tsc --noEmit
npm run test:coverage
npm run test:package
```

For dependency, packaging, export, build, or release-related changes, also run:

```bash
npm audit
npm pack --dry-run
```

## Build and declarations

- `npm run build` generates CJS, ESM, UMD, source maps, and TypeScript
  declarations.
- Public declarations originate from source types. Do not restore or maintain
  handwritten root `index.d.ts` or `index.d.mts` files.
- `scripts/generate-esm-declaration.mjs` creates the ESM declaration variant from
  generated TypeScript output. Keep installed-package TypeScript tests passing
  when changing this flow.
- Build targets must remain compatible with the `engines.node` declaration.

## Documentation

- Update `README.md` and `README-english.md` in the same change.
- Keep headings, option lists, examples, limitations, migration notes, and type
  exports equivalent across both documents.
- Verify example output against the implementation; do not rely on intuition for
  Portuguese number grammar.
- Document breaking changes and minimum Node.js changes explicitly.

## Dependency and security policy

- Prefer supported, current development tools compatible with the declared Node
  versions.
- Use normal semver-compatible upgrades first. Review breaking upgrades and run
  the complete validation suite afterward.
- Do not use `npm audit fix --force` without inspecting the proposed major
  changes.
- A release candidate must have zero known production vulnerabilities. Resolve
  development-only findings when compatible fixes exist and report any accepted
  residual risk explicitly.
- Never publish, push, create tags, or change npm/GitHub state unless the user
  explicitly requests it.

## Git and change hygiene

- Preserve unrelated user changes and inspect the worktree before editing.
- Keep commits focused and use concise conventional-style messages such as
  `fix:`, `test:`, `docs:`, `refactor:`, or `release:`.
- Do not commit generated `dist/`, `build/`, coverage output, tarballs, or
  temporary consumer projects.
- Use `git diff --check` before committing.

## Definition of done

A change is complete only when:

1. The implementation is readable and respects subsystem boundaries.
2. Public behavior and types remain compatible or the breaking change is
   intentional and documented.
3. Relevant regression and boundary tests exist.
4. Lint, TypeScript, 100% coverage, and installed-package tests pass.
5. Portuguese and English documentation agree with the implementation.
6. Packaging and audit checks pass when the change affects release output.
