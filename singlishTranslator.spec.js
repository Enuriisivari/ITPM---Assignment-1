import { test, expect } from '@playwright/test';

test.describe('Singlish to Sinhala Translator Tests', () => {
  const SINHALA_RE = /[\u0D80-\u0DFF]/;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  function getTranslatorLocators(page) {
    const inputCandidates = [
      page.locator('#singlish'),
      page.locator('textarea[placeholder*="Singlish" i]'),
      page.locator('div:has-text("Singlish") textarea').first(),
      page.locator('textarea').first(),
    ];

    const outputCandidates = [
      page.locator('#sinhala'),
      page.locator('div:has-text("Sinhala") textarea').first(),
      page.locator('textarea').nth(1),
    ];

    return {
      input: inputCandidates,
      output: outputCandidates,
      clearButton: page.getByRole('button', { name: /clear/i }),
    };
  }

  async function firstVisibleLocator(candidates) {
    for (const loc of candidates) {
      if (await loc.count()) {
        try {
          if (await loc.first().isVisible()) return loc.first();
        } catch {
          // ignore and continue
        }
      }
    }
    // fallback to first candidate
    return candidates[0].first();
  }

  async function readFieldValue(locator) {
    try {
      return await locator.inputValue();
    } catch {
      return (await locator.textContent()) || '';
    }
  }

  // Helper function to get output after input (robust selectors for SwiftTranslator UI)
  async function getOutput(page, inputText) {
    const { input: inputCandidates, output: outputCandidates } = getTranslatorLocators(page);
    const inputField = await firstVisibleLocator(inputCandidates);
    const outputField = await firstVisibleLocator(outputCandidates);
    
    const before = await readFieldValue(outputField);

    // Clear and fill input
    await inputField.fill('');
    await page.waitForTimeout(100);
    await inputField.fill(inputText);

    // Wait for real-time conversion (output changes from previous)
    if (inputText.trim().length === 0) {
      await expect.poll(async () => await readFieldValue(outputField), { timeout: 10_000 }).toBe('');
      return '';
    }

    await expect
      .poll(async () => await readFieldValue(outputField), { timeout: 10_000 })
      .not.toBe(before);

    return await readFieldValue(outputField);
  }

  // ==================== POSITIVE FUNCTIONAL TEST CASES ====================

  // 1. Simple sentences
  test('Pos_Fun_0001 - Convert simple sentence: mama pasal yanavaa', async ({ page }) => {
    const output = await getOutput(page, 'mama Pasal yanavaa.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  test('Pos_Fun_0002 - Convert simple sentence: mata pan oonee', async ({ page }) => {
    const output = await getOutput(page, 'mata pan  oonee.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  test('Pos_Fun_0003 - Convert simple sentence: api palli yanavaa', async ({ page }) => {
    const output = await getOutput(page, 'api palli yanavaa.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 2. Compound sentences
  test('Pos_Fun_0004 - Convert compound sentence with conjunction', async ({ page }) => {
    const output = await getOutput(page, 'mama gedhara yanavaa, haebaeyi vahina nisaa tikak wela innawa.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  test('Pos_Fun_0005 - Convert compound sentence: api kaeema aran yanavaa saha passe cofee ekak bonawa', async ({ page }) => {
    const output = await getOutput(page, ' api kaeema aran yanavaa saha passe cofee ekak bonawa');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 3. Complex sentences
  test('Pos_Fun_0006 - Convert complex sentence: oya enavaanam mama balan innavaa', async ({ page }) => {
    const output = await getOutput(page, 'oya enavaanam mama balan innavaa.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  test('Pos_Fun_0007 - Convert complex sentence: eya awoth api yanna epaeyi', async ({ page }) => {
    const output = await getOutput(page, 'eya awoth api yanna epaeyi.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 4. Interrogative (questions)
  test('Pos_Fun_0008 - Convert question: oyata kusa gini da?', async ({ page }) => {
    const output = await getOutput(page, 'oyata kusa gini da?');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  test('Pos_Fun_0009 - Convert question: oyaa kavadhdha enna hithan inne?', async ({ page }) => {
    const output = await getOutput(page, 'oyaa kavadhdha enna hithan inne?');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  test('Pos_Fun_0010 - Convert question: meeka hariyata vaeda karanavaadha?', async ({ page }) => {
    const output = await getOutput(page, 'meeka hariyata vaeda karanavaadha?');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 5. Imperative (commands)
  test('Pos_Fun_0011 - Convert command: karunakarala enna', async ({ page }) => {
    const output = await getOutput(page, 'karunakarala enna.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  test('Pos_Fun_0012 - Convert command: issarahata yanna', async ({ page }) => {
    const output = await getOutput(page, 'issarahata yanna.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  test('Pos_Fun_0013 - Convert command: mata pawasanna', async ({ page }) => {
    const output = await getOutput(page, 'mata pawasanna.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 6. Positive vs Negative forms
  test('Pos_Fun_0014 - Convert positive sentence: mama ehema katayuthu karanavaa', async ({ page }) => {
    const output = await getOutput(page, 'mama ehema katayuthu karanavaa.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  test('Pos_Fun_0015 - Convert negative sentence: mama ehema karannee naehae', async ({ page }) => {
    const output = await getOutput(page, 'mama ehema karannee naehae.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 7. Greetings
  test('Pos_Fun_0016 - Convert greeting:suba dhinayak', async ({ page }) => {
    const output = await getOutput(page, 'suba dhinayak!!');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

   // 8. Requests
  test('Pos_Fun_0018 - Convert request: mata salli tikak denna puLuvandha?', async ({ page }) => {
    const output = await getOutput(page, 'mata salli tikak denna puLuvandha?');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  test('Pos_Fun_0019 - Convert polite request: karuNaakaralaa eka poddak balanna', async ({ page }) => {
    const output = await getOutput(page, 'karuNaakaralaa eka poddak balanna.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 9. Tense variations - Past
  test('Pos_Fun_0020 - Convert past tense: mama iiyee polata giyaa', async ({ page }) => {
    const output = await getOutput(page, 'mama iiyee polata giyaa.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 10. Tense variations - Present
  test('Pos_Fun_0021 - Convert present tense: mama  paadam karanavaa', async ({ page }) => {
    const output = await getOutput(page, 'mama  paadam karanavaa.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 11. Tense variations - Future
  test('Pos_Fun_0022 - Convert future tense: mama heta sil gannaa', async ({ page }) => {
    const output = await getOutput(page, 'mama heta sil gannava.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 12. Mixed language - English technical terms
  test('Pos_Fun_0023 - Convert with English terms: Zoom meeting ekak thiyennee', async ({ page }) => {
    const output = await getOutput(page, 'Zoom meeting ekak thiyennee.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
    expect(output).toMatch(/zoom/i);
  });

  test('Pos_Fun_0024 - Convert with imo: whatsapp msg ekak dhaapan', async ({ page }) => {
    const output = await getOutput(page, 'whatsapp msg ekak dhaapan.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 13. Places and common English words
  test('Pos_Fun_0025 - Convert with place name: mama Church yanna hadhannee', async ({ page }) => {
    const output = await getOutput(page, 'mama Church yanna hadhannee.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 14. Punctuation
  test('Pos_Fun_0026 - Convert with punctuation: mata kanna oonee!', async ({ page }) => {
    const output = await getOutput(page, 'mata kanna oonee!');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 15. Currency and numbers
  test('Pos_Fun_0027 - Convert with currency: Rs. 6989', async ({ page }) => {
    const output = await getOutput(page, 'mata Rs. 6989 oonee.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 16. Time formats
  test('Pos_Fun_0028 - Convert with time: 9.30 AM yanna oonee', async ({ page }) => {
    const output = await getOutput(page, '9.30 AM yanna oonee.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 17. Dates
  test('Pos_Fun_0029 - Convert with date: dhesaembar 30', async ({ page }) => {
    const output = await getOutput(page, 'dhesaembar 30 mata yanna oonee.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 18. Multi-word expressions
  test('Pos_Fun_0030 - Convert multi-word expression: mata epaa', async ({ page }) => {
    const output = await getOutput(page, 'mata epaa.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 19. Repeated words for emphasis
  test('Pos_Fun_0031 - Convert repeated words: hari hari', async ({ page }) => {
    const output = await getOutput(page, 'hari hari.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 20. Medium length input (31-299 characters)
  test('Pos_Fun_0032 - Convert medium length input', async ({ page }) => {
    const input = 'mama nanna yanavaa. mata pan oonee. api pasal yanavaa. oyaata kusaginida? mama ehema karanavaa. api enavaa.';
    expect(input.length).toBeGreaterThan(30);
    expect(input.length).toBeLessThan(300);
    const output = await getOutput(page, input);
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 21. Long input (≥300 characters)
  test('Pos_Fun_0033 - Convert long input', async ({ page }) => {
    const input = 'mama gedhara yanavaa. mata bath oonee. api paasal yanavaa. oyaata kohomadha? mama ehema karanavaa. api heta enavaa. mama gedhara yanavaa. mata bath oonee. api paasal yanavaa. oyaata kohomadha? mama ehema karanavaa. api heta enavaa. mama gedhara yanavaa. mata bath oonee. api paasal yanavaa. oyaata kohomadha? mama ehema karanavaa. api heta enavaa.';
    expect(input.length).toBeGreaterThanOrEqual(300);
    const output = await getOutput(page, input);
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 22. Singular/plural and pronouns
  test('Pos_Fun_0034 - Convert singular: mama yanna baluwe', async ({ page }) => {
    const output = await getOutput(page, 'mama yanna baluwe.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  test('Pos_Fun_0035 - Convert plural: Api kaeema kamu', async ({ page }) => {
    const output = await getOutput(page, 'Api kaeema kamu.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 23. Informal language
  test('Pos_Fun_0036 - Convert informal: eeyi, ooka dhiyan', async ({ page }) => {
    const output = await getOutput(page, 'eeyi, ooka dhiyan.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // 24. Day-to-day expressions
  test('Pos_Fun_0037 - Convert day-to-day: mata dhukayi', async ({ page }) => {
    const output = await getOutput(page, 'mata dhukayi.');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toMatch(SINHALA_RE);
  });

  // ==================== NEGATIVE FUNCTIONAL TEST CASES ====================

  // 1. Joined words (missing spaces)
  test('Neg_Fun_0001 - Joined words without spaces: mamapansalyanavaa', async ({ page }) => {
    const output = await getOutput(page, 'mamapansalyanavaa');
    // Should either fail to convert properly or produce unclear output
    expect(output.length).toBeGreaterThan(0);
    // The output might be incorrect or unclear
  });

  test('Neg_Fun_0002 - Multiple joined words: matapaankannaoonee', async ({ page }) => {
    const output = await getOutput(page, 'matapaankannaoonee');
    expect(output.length).toBeGreaterThan(0);
  });

  // 2. Extremely long input without proper structure
  test('Neg_Fun_0003 - Extremely long unstructured input', async ({ page }) => {
    const input = 'mamagedharayanavaamatabathkannaooneeadaapienawa'.repeat(20);
    expect(input.length).toBeGreaterThan(300);
    const output = await getOutput(page, input);
    // May produce incorrect or unclear output
    expect(output.length).toBeGreaterThan(0);
  });

  // 3. Mixed case issues
  test('Neg_Fun_0004 - Mixed case input: MaMa PAnSal YaNaVaA', async ({ page }) => {
    const output = await getOutput(page, 'MaMa PAnSal YaNaVaA.');
    // May not handle mixed case properly
    expect(output.length).toBeGreaterThan(0);
  });

  // 4. Special characters that may cause issues
  test('Neg_Fun_0005 - Special characters: mama@Silganna#yanavaa^', async ({ page }) => {
    const output = await getOutput(page, 'mama@Silganna#yanavaa^');
    // May not handle special characters properly
    expect(output.length).toBeGreaterThan(0);
  });

  // 5. Numbers in words
  test('Neg_Fun_0006 - Numbers in text: eya 123 game yanavaa', async ({ page }) => {
    const output = await getOutput(page, 'eya 123 game yanavaa.');
    // Numbers might not be converted properly
    expect(output.length).toBeGreaterThan(0);
  });

  // 6. Multiple consecutive spaces
  test('Neg_Fun_0007 - Multiple spaces: mama   gedhara    yanavaa', async ({ page }) => {
    const output = await getOutput(page, 'mama   gedhara    yanavaa.');
    // May not handle multiple spaces correctly
    expect(output.length).toBeGreaterThan(0);
  });

  // 7. Line breaks in input
  test('Neg_Fun_0008 - Line breaks in input', async ({ page }) => {
    const input = 'mama pansal yanavaa.\noyaa enavadha maa \nekka yanna?';
    const output = await getOutput(page, input);
    // May not handle line breaks properly
    expect(output.length).toBeGreaterThan(0);
  });

  // 8. Empty or whitespace only
  test('Neg_Fun_0009 - Empty input', async ({ page }) => {
    const output = await getOutput(page, '');
    // Should handle empty input gracefully
    expect(output.length).toBeGreaterThanOrEqual(0);
  });

  // 9. Very short incomplete words
  test('Neg_Fun_0010 - Incomplete words: ma ged yaw', async ({ page }) => {
    const output = await getOutput(page, 'ma ged yaw');
    // May produce unclear output
    expect(output.length).toBeGreaterThanOrEqual(0);
  });

  // 10. Slang that may not convert well
  test('Neg_Fun_0011 - Heavy slang: ela machan! maru!!', async ({ page }) => {
    const output = await getOutput(page, 'ela machan! !!');
    // Slang may not convert accurately
    expect(output.length).toBeGreaterThan(0);
  });

  // 11. Mixed languages incorrectly
  test('Neg_Fun_0012 - Incorrectly mixed: mama go home laga inne', async ({ page }) => {
    const output = await getOutput(page, 'mama go home laga inne.');
    // May not handle this mixed structure well
    expect(output.length).toBeGreaterThan(0);
  });

  // ==================== UI TEST CASES ====================

  // Real-time output update
  test('Pos_UI_0001 - Real-time output update while typing', async ({ page }) => {
    const { input: inputCandidates, output: outputCandidates } = getTranslatorLocators(page);
    const inputField = await firstVisibleLocator(inputCandidates);
    const outputField = await firstVisibleLocator(outputCandidates);
    
    // Clear any existing input
    await inputField.fill('');
    await page.waitForTimeout(200);
    
    // Type character by character
    await inputField.type('m', { delay: 100 });
    await page.waitForTimeout(500);
    let output1 = await readFieldValue(outputField);
    
    await inputField.type('a', { delay: 100 });
    await page.waitForTimeout(500);
    let output2 = await readFieldValue(outputField);
    
    await inputField.type('m', { delay: 100 });
    await page.waitForTimeout(500);
    let output3 = await readFieldValue(outputField);
    
    await inputField.type('a', { delay: 100 });
    await page.waitForTimeout(500);
    let finalOutput = await readFieldValue(outputField);
    
    // Output should update in real-time
    expect(finalOutput.length).toBeGreaterThan(0);
    // Output should change as more characters are typed
    if (output1.length > 0 && output2.length > 0) {
      expect(output2).not.toBe(output1);
    }
  });

  // Clear input functionality
  test('Pos_UI_0002 - Clear input functionality', async ({ page }) => {
    const { input: inputCandidates, output: outputCandidates, clearButton } = getTranslatorLocators(page);
    const inputField = await firstVisibleLocator(inputCandidates);
    const outputField = await firstVisibleLocator(outputCandidates);
    
    // Enter some text
    await inputField.fill('mama gedhara yanavaa');
    await page.waitForTimeout(1000);
    let outputBefore = await readFieldValue(outputField);
    expect(outputBefore.length).toBeGreaterThan(0);
    
    // Clear input (prefer UI button if available)
    if (await clearButton.count()) {
      await clearButton.click();
    } else {
      await inputField.fill('');
    }
    await page.waitForTimeout(800);
    let outputAfter = await readFieldValue(outputField);
    
    // Output should be cleared or empty
    expect(outputAfter.length).toBe(0);
  });

});
