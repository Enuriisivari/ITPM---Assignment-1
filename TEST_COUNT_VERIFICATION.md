# Test Case Count Verification

## Requirements Check

### Required:
- ✅ **At least 24 positive scenarios** (where system correctly converts Singlish to Sinhala)
- ✅ **At least 10 negative scenarios** (where system fails or behaves incorrectly)

### Actual Count:

#### Positive Functional Test Cases (Pos_Fun_):
1. Pos_Fun_0001 - Simple sentence: mama gedhara yanavaa
2. Pos_Fun_0002 - Simple sentence: mata bath oonee
3. Pos_Fun_0003 - Simple sentence: api paasal yanavaa
4. Pos_Fun_0004 - Compound sentence with conjunction
5. Pos_Fun_0005 - Compound sentence: api kaeema kanna yanavaa...
6. Pos_Fun_0006 - Complex sentence: oya enavaanam mama balan innavaa
7. Pos_Fun_0007 - Complex sentence: vaessa unath api yanna epaeyi
8. Pos_Fun_0008 - Question: oyaata kohomadha?
9. Pos_Fun_0009 - Question: oyaa kavadhdha enna hithan inne?
10. Pos_Fun_0010 - Question: meeka hariyata vaeda karanavaadha?
11. Pos_Fun_0011 - Command: vahaama enna
12. Pos_Fun_0012 - Command: issarahata yanna
13. Pos_Fun_0013 - Command: mata kiyanna
14. Pos_Fun_0014 - Positive sentence: mama ehema karanavaa
15. Pos_Fun_0015 - Negative sentence: mama ehema karannee naehae
16. Pos_Fun_0016 - Greeting: aayuboovan!
17. Pos_Fun_0017 - Greeting: suba udhaeesanak!
18. Pos_Fun_0018 - Request: mata udhavvak karanna puLuvandha?
19. Pos_Fun_0019 - Polite request: karuNaakaralaa eka poddak balanna
20. Pos_Fun_0020 - Past tense: mama iiyee gedhara giyaa
21. Pos_Fun_0021 - Present tense: mama dhaen vaeda karanavaa
22. Pos_Fun_0022 - Future tense: mama heta enavaa
23. Pos_Fun_0023 - English terms: Zoom meeting ekak thiyennee
24. Pos_Fun_0024 - WhatsApp: WhatsApp msg ekak dhaapan
25. Pos_Fun_0025 - Place name: siiyaa Colombo yanna hadhannee
26. Pos_Fun_0026 - Punctuation: mata bath oonee!
27. Pos_Fun_0027 - Currency: Rs. 5343
28. Pos_Fun_0028 - Time: 7.30 AM yanna oonee
29. Pos_Fun_0029 - Date: dhesaembar 25
30. Pos_Fun_0030 - Multi-word expression: mata oona
31. Pos_Fun_0031 - Repeated words: hari hari
32. Pos_Fun_0032 - Medium length input (31-299 chars)
33. Pos_Fun_0033 - Long input (≥300 chars)
34. Pos_Fun_0034 - Singular: mama yanna hadhannee
35. Pos_Fun_0035 - Plural: api yamu
36. Pos_Fun_0036 - Informal: eeyi, ooka dhiyan
37. Pos_Fun_0037 - Day-to-day: mata nidhimathayi

**Total Positive Functional Tests: 37** ✅ (Requirement: ≥24)

#### Negative Functional Test Cases (Neg_Fun_):
1. Neg_Fun_0001 - Joined words without spaces: mamagedharayanavaa
2. Neg_Fun_0002 - Multiple joined words: matapaankannaoonee
3. Neg_Fun_0003 - Extremely long unstructured input
4. Neg_Fun_0004 - Mixed case input: MaMa GeDhArA YaNaVaA
5. Neg_Fun_0005 - Special characters: mama@gedhara#yanavaa$
6. Neg_Fun_0006 - Numbers in text: mama 123 gedhara yanavaa
7. Neg_Fun_0007 - Multiple spaces: mama   gedhara    yanavaa
8. Neg_Fun_0008 - Line breaks in input
9. Neg_Fun_0009 - Empty input
10. Neg_Fun_0010 - Only punctuation: !!!???
11. Neg_Fun_0011 - Incomplete words: ma ge ya
12. Neg_Fun_0012 - Heavy slang: ela machan! supiri!!
13. Neg_Fun_0013 - Incorrectly mixed: mama go home yanavaa

**Total Negative Functional Tests: 13** ✅ (Requirement: ≥10)

#### UI Test Cases (Pos_UI_):
1. Pos_UI_0001 - Real-time output update while typing
2. Pos_UI_0002 - Clear input functionality

**Total UI Tests: 2**

---

## Summary

- ✅ **37 Positive Functional Tests** (exceeds requirement of 24)
- ✅ **13 Negative Functional Tests** (exceeds requirement of 10)
- ✅ **2 UI Tests** (meets requirement of 1)

**Total Test Cases: 52**

All requirements are met and exceeded!
