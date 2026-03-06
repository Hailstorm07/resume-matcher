# Architecture and Design

## System Overview

The Resume Matching System is built with a modular architecture emphasizing separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface Layer                  │
│  ┌──────────────┬──────────────┬──────────────────────┐ │
│  │   CLI (Node) │  REST API    │   Batch Processing   │ │
│  └──────────────┴──────────────┴──────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    Engine Layer                          │
│  (Orchestration & Workflow - engine.js)                  │
└─────────────────────────────────────────────────────────┘
                          ↓
      ┌───────────────────────────────────────┐
      │                                       │
      ↓                                       ↓
┌──────────────────┐              ┌──────────────────┐
│   Parser Layer   │              │   Matcher Layer  │
├──────────────────┤              ├──────────────────┤
│ • Resume Parser  │              │ • Skill Matcher  │
│ • JD Parser      │              │ • Scorer         │
└──────────────────┘              └──────────────────┘
      ↓                                       ↓
┌──────────────────────────────────────────────────────┐
│              Utility Layer                            │
├──────────────────────────────────────────────────────┤
│ • Extractors (regex-based data extraction)          │
│ • Skill Database (100+ skills)                      │
│ • String Utilities (normalization, matching)        │
└──────────────────────────────────────────────────────┘
```

## Core Components

### 1. Resume Parser (`src/parsers/resumeParser.js`)

**Purpose:** Extract structured data from resume text

**Functions:**
- `parseResume(resumeText)` - Main parsing function
- `extractSkillsFromResume(text)` - Skill extraction
- `parseMultipleResumes(texts)` - Batch processing

**Extraction Method:** Rule-based using regex patterns

**Data Extracted:**
```
{
  name: string,           // Name pattern matching
  email: string,          // Regex pattern
  phone: string,          // Multiple phone formats
  salary: string,         // Currency patterns
  yearOfExperience: number, // Years or date ranges
  resumeSkills: string[]  // Skill database matching
}
```

### 2. Job Description Parser (`src/parsers/jobDescriptionParser.js`)

**Purpose:** Extract structured data from job descriptions

**Functions:**
- `parseJobDescription(jdText, jobId)` - Main parsing
- `extractSkillsFromJD(text)` - Skill extraction
- `extractJobTitle(text)` - Role extraction
- `extractJobSummary(text)` - Description extraction

**Feature:** Section awareness
- Detects "Required" vs "Desired" skill sections
- Properly categorizes skills by requirement level

**Data Extracted:**
```
{
  jobId: string,
  role: string,
  salary: string,
  yearsOfExperience: number,
  requiredSkills: string[],
  optionalSkills: string[],
  aboutRole: string
}
```

### 3. Skill Matcher (`src/matchers/skillMatcher.js`)

**Purpose:** Match resume skills with JD requirements

**Matching Algorithm:**
1. **Exact Match:** Normalize both skills and compare
2. **Substring Match:** Check if one skill contains the other
3. **Fuzzy Match:** Use Levenshtein distance with 0.85 threshold

**Levenshtein Distance:**
- Measures minimum edits needed to transform one string to another
- Used for handling typos and variations
- Formula: `similarity = 1 - (distance / max_length)`

**Functions:**
- `matchSkill(resumeSkill, jdSkills, threshold)` - Single skill match
- `analyzeSkills(resumeSkills, jdSkills)` - Comprehensive analysis
- `calculateMatchingScore(skillsAnalysis)` - Score calculation
- `matchResumeWithJD(resume, jd)` - Complete matching

**Score Formula:**
```
Matching Score = (Matched JD Skills / Total JD Skills) × 100
Range: 0 to 100
```

### 4. Skill Database (`src/utils/skillDatabase.js`)

**Purpose:** Centralized repository of recognized technical skills

**Categories:**
- Programming Languages (24 skills)
- Web Frameworks (18 skills)
- Databases (16 skills)
- Cloud & DevOps (11 skills)
- Data Analytics (14 skills)
- APIs & Messaging (12 skills)
- Data Science & ML (14 skills)
- Frontend Technologies (13 skills)
- Version Control (6 skills)
- Testing & Quality (11 skills)
- Domain Specific (25+ skills)

**Total:** 100+ unique technical skills

**Functions:**
- `normalizeSkill(skill)` - Normalize for comparison
- `isKnownSkill(skill)` - Verify skill existence
- `getAllSkills()` - Retrieve all skills

### 5. Extractors (`src/utils/extractors.js`)

**Purpose:** Low-level data extraction utilities

**Extraction Functions:**

1. **Salary Extraction**
   - Patterns: "Salary: $X", "CTC: ₹X", "per annum", "LPA"
   - Returns: String representation of salary

2. **Experience Extraction**
   - Direct mentions: "5 years of experience"
   - Date ranges: "2018-2023" calculates years
   - Special cases: "Fresher" → 0 years

3. **Name Extraction**
   - Pattern: "Name: John Doe"
   - Fallback: First line if looks like name

4. **Email Extraction**
   - RFC-based regex pattern
   - Returns: First match

5. **Phone Extraction**
   - Multiple formats: (555) 123-4567, +1-555-123-4567
   - Returns: First valid match

### 6. Engine (`src/engine.js`)

**Purpose:** Orchestrate parsing and matching workflow

**Main Functions:**
- `processResumeAndJDs(resumeText, jdTexts, jobIds)` - Single resume processing
- `batchProcessResumes(resumeTexts, jdTexts)` - Batch processing

**Workflow:**
1. Parse resume → Extract data
2. Parse JDs → Extract data
3. Match resume with each JD
4. Format and return results

## Data Flow Example

```
Resume Text
    ↓
[Resume Parser]
    ├→ Extract Name
    ├→ Extract Email
    ├→ Extract Phone
    ├→ Extract Salary
    ├→ Extract Experience
    └→ Extract Skills
    ↓
Parsed Resume Object
    ↓
         ← Job Description Text
         ↓
         [JD Parser]
         ├→ Extract Role
         ├→ Extract Salary
         ├→ Extract Required Skills
         ├→ Extract Optional Skills
         └→ Extract Summary
         ↓
         Parsed JD Object
    ↓
[Skill Matcher]
    ├→ Compare resume skills with JD required skills
    ├→ Apply fuzzy matching
    ├→ Calculate similarity scores
    ├→ Build skill analysis
    └→ Calculate overall matching score
    ↓
Match Result Object
    ↓
[Formatter]
    └→ Format as JSON output
    ↓
Final Output JSON
```

## Algorithmic Details

### Skill Matching Algorithm

```
For each JD skill:
  For each resume skill:
    If exact match:
      return true
    Else if substring match:
      calculate similarity ratio
      if ratio >= 0.5:
        return true
    Else if fuzzy match:
      calculate Levenshtein distance
      similarity = 1 - (distance / max_length)
      if similarity >= 0.85:
        return true
  return false (skill not found in resume)

Matching Score = (Matched Skills Count / Total JD Skills) × 100
```

### Regex Patterns Used

**Salary:**
```regex
salary[:\s]*[$£€₹]?\s*([0-9,]+)
ctc[:\s]*[$£€₹]?\s*([0-9,]+)
pay\s*(?:range|:)\s*[$£€₹]?\s*([0-9,]+)\s*-\s*[$£€₹]?\s*([0-9,]+)
```

**Experience:**
```regex
(\d+(?:\.\d+)?)\s*(?:\+)?\s*years?\s*of\s*(?:professional\s+)?experience
(\d{4})\s*-\s*(?:(current|present)|\d{4})
```

**Email:**
```regex
[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
```

**Phone:**
```regex
(?:\+\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})
```

## Design Decisions

### 1. Why Rule-Based Instead of ML?
- **Requirement:** No LLMs or AI systems allowed
- **Advantage:** Deterministic, explainable results
- **Trade-off:** Limited contextual understanding

### 2. Why Levenshtein Distance?
- **Reason:** Handle typos and variations (C++ vs C Plus Plus)
- **Alternative:** Jaro-Winkler distance (more conservative)
- **Threshold:** 0.85 balances precision and recall

### 3. Why Section-Aware Parsing for JDs?
- **Insight:** "Desired" skills should be distinguished
- **Future:** Can implement weighted scoring

### 4. Why Normalize Skills?
- **Purpose:** Match "Spring Boot" against "spring boot" or "SPRING BOOT"
- **Benefit:** Improves matching accuracy

### 5. Database Categorization?
- **Reason:** Future expansion for weighted matching
- **Benefit:** Organized skill classification

## Performance Characteristics

| Operation | Time | Notes |
|-----------|------|-------|
| Parse resume | 10-50ms | Depends on text length |
| Parse JD | 10-50ms | Depends on text length |
| Match single JD | 5-10ms | O(n*m) where n=resume skills, m=JD skills |
| Fuzzy match distance | <1ms | Levenshtein for two skills |
| Batch 100 resumes × 50 JDs | 5-10s | Linear scaling |

## Extensibility

### Adding New Skills
Edit `src/utils/skillDatabase.js`:
```javascript
'programming_languages': [
  'Java', 'Python', 'Rust',  // Add new skill here
  // ...
]
```

### Custom Extraction Patterns
Modify `src/utils/extractors.js` regex patterns.

### Different Matching Algorithm
Replace `matchSkill()` in `src/matchers/skillMatcher.js`.

### Database Storage
Add database module in `src/db/` and call from `engine.js`.

## Security Considerations

- **Input Validation:** Check text length before processing
- **Regex DoS:** Use bounded patterns (already done)
- **No External Calls:** Pure local processing
- **Data Privacy:** No data stored without explicit DB module

## Testing Strategy

**Unit Level:** Test individual extractors and matchers
**Integration Level:** Test complete workflows
**Edge Cases:** Handle special characters, empty inputs, malformed data

See `test/test.js` for examples.
