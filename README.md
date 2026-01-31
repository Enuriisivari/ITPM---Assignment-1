# Singlish to Sinhala Translator Automation

This project contains automated test cases for the Singlish to Sinhala translator available at https://www.swifttranslator.com/

## Tools and Technologies
- **Playwright** - End-to-end testing framework
- **JavaScript** - Programming language
- **Node.js** - Runtime environment

## Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests
```bash
npm test
```
or
```bash
npx playwright test
```

### Run tests in headed mode (with browser visible)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### Run tests on specific browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### View test report
After running tests, view the HTML report:
```bash
npm run test:report
```

## Test Structure

The test suite includes:
- **37+ Positive Functional Test Cases** (Pos_Fun_0001 to Pos_Fun_0037)
  - Simple, compound, and complex sentences
  - Interrogative and imperative forms
  - Positive and negative forms
  - Greetings, requests, and responses
  - Tense variations (past, present, future)
  - Mixed language content
  - Punctuation, currency, dates, and time formats
  - Input length variations (short, medium, long)
  - Singular/plural and pronoun variations
  - Day-to-day expressions

- **12 Negative Functional Test Cases** (Neg_Fun_0001 to Neg_Fun_0012)
  - Joined words without spaces
  - Extremely long unstructured input
  - Mixed case issues
  - Special characters
  - Multiple spaces and line breaks
  - Empty input handling
  - Slang and informal language edge cases

- **2 UI Test Cases** (Pos_UI_0001, Pos_UI_0002)
  - Real-time output update behavior
  - Clear input functionality

## Test Coverage

The test cases cover:
1. Sentence structures (simple, compound, complex)
2. Interrogative and imperative forms
3. Positive and negative sentence forms
4. Daily language usage (greetings, requests, responses)
5. Word combinations and phrase patterns
6. Grammatical forms (tenses, negation, pronouns)
7. Input length variation (short ≤30, medium 31-299, long ≥300)
8. Mixed language content (Singlish + English)
9. Punctuation, numeric formats, and text formatting
10. Informal language and slang## Test Results

Test results are generated in the following locations:
- HTML Report: `playwright-report/index.html`
- Test Results: `test-results/`

## Configuration

Test configuration is defined in `playwright.config.js`. The default configuration:
- Runs tests in parallel
- Tests on Chromium, Firefox, and WebKit browsers
- Generates HTML reports
- Includes trace on first retry

## Notes

- Tests wait for real-time conversion (the application updates automatically)
- All tests include proper wait times for asynchronous updates
- Test cases follow the naming convention: `Pos_Fun_XXXX`, `Neg_Fun_XXXX`, `Pos_UI_XXXX`

## Troubleshooting

If tests fail:
1. Ensure you have a stable internet connection
2. Check if the website https://www.swifttranslator.com/ is accessible
3. Verify that all dependencies are installed: `npm install`
4. Make sure Playwright browsers are installed: `npx playwright install`

## Git Repository

The Git repository link should be provided in a separate text file as per assignment requirements.

## License

ISC
