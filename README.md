# Resume Parsing and Job Matching System

A rule-based, non-AI resume parsing and job matching system that extracts structured information from resumes and job descriptions, then matches candidates with suitable positions.

## Features

✅ **Rule-Based Extraction** - No LLMs, no generative AI
- Resume parsing: name, email, phone, salary, years of experience, skills
- Job description parsing: role, required/optional skills, salary, experience
- Skill database with 100+ technical skills

✅ **Skill Matching** - Intelligent skill matching with similarity detection
- Fuzzy matching using Levenshtein distance
- Multi-word skill recognition
- Matching score calculation (0-100)

✅ **REST API** - Express.js API endpoints
- `/api/match` - Match resume against multiple JDs
- `/api/parse-resume` - Parse resume independently
- `/api/parse-jd` - Parse job description independently

✅ **Batch Processing** - Process multiple resumes and JDs

✅ **JSON Output** - Structured JSON output format

## Technology Stack

- **Language**: Node.js (JavaScript/ES6+)
- **Server**: Express.js
- **Parsing**: Regex-based rule engines
- **Matching**: String similarity algorithms (Levenshtein distance)
- **Data Formats**: JSON

## Project Structure

```
resume-matcher/
├── src/
│   ├── index.js                 # CLI entry point
│   ├── api.js                   # Express API server
│   ├── engine.js                # Main processing engine
│   ├── parsers/
│   │   ├── resumeParser.js      # Resume parsing logic
│   │   └── jobDescriptionParser.js  # JD parsing logic
│   ├── matchers/
│   │   └── skillMatcher.js      # Skill matching logic
│   └── utils/
│       ├── skillDatabase.js     # Skill database
│       └── extractors.js        # Data extraction utilities
├── test/
│   └── test.js                  # Test suite
├── data/                        # Sample data directory
├── outputs/                     # Output directory
├── package.json                 # Node.js dependencies
└── README.md                    # This file
```

## Installation

### Prerequisites
- Node.js v14+ and npm

### Setup

1. **Navigate to project directory**:
```bash
cd resume-matcher
```

2. **Install dependencies**:
```bash
npm install
```

## Usage

### 1. CLI Mode - Process Sample Resume

Run the CLI with sample data:

```bash
npm start
```

This will:
- Parse a sample resume
- Match it against 3 sample job descriptions
- Display results in console
- Save output to `outputs/sample_output.json`

### 2. API Server Mode

Start the Express server:

```bash
npm run api
```

The API will be available at `http://localhost:3000`

#### API Endpoints

**Health Check**
```
GET /health
```

**Match Resume with Job Descriptions**
```
POST /api/match

Request body:
{
  "resume": "resume text here",
  "jobDescriptions": ["jd text 1", "jd text 2"],
  "jobIds": ["JD001", "JD002"]  // optional
}

Response:
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "...",
    "salary": "...",
    "yearOfExperience": 5,
    "resumeSkills": ["Java", "Python", ...],
    "matchingJobs": [
      {
        "jobId": "JD001",
        "role": "Senior Engineer",
        "aboutRole": "...",
        "skillsAnalysis": [
          { "skill": "Java", "presentInResume": true },
          { "skill": "Kafka", "presentInResume": false }
        ],
        "matchingScore": 75.5
      }
    ]
  }
}
```

**Parse Resume Only**
```
POST /api/parse-resume

Request body:
{
  "resume": "resume text here"
}
```

**Parse Job Description Only**
```
POST /api/parse-jd

Request body:
{
  "jobDescription": "jd text here",
  "jobId": "JD001"  // optional
}
```

**API Documentation**
```
GET /api/docs
```

### 3. Run Tests

```bash
npm test
```

This will run a comprehensive test suite covering:
- Resume parsing
- Job description parsing
- Skill matching
- Complete workflow

## Module Documentation

### Resume Parser (`src/parsers/resumeParser.js`)

Extracts structured information from resume text:
- **Name**: Extracted from name field or first line
- **Email**: Regex pattern matching
- **Phone**: Multiple phone format patterns
- **Salary**: Currency patterns and amount extraction
- **Years of Experience**: From explicit mentions or date ranges
- **Skills**: Comprehensive skill database matching

```javascript
const { parseResume } = require('./parsers/resumeParser');

const parsed = parseResume(resumeText);
// Returns: { name, email, phone, salary, yearOfExperience, resumeSkills, ... }
```

### Job Description Parser (`src/parsers/jobDescriptionParser.js`)

Extracts structured information from job description text:
- **Job Title/Role**: Extracted from role mention or prominent text
- **Salary**: Salary range and single amounts
- **Required Skills**: Skills from required sections
- **Optional Skills**: Skills from desired/preferred sections
- **About Role**: Summary of position

```javascript
const { parseJobDescription } = require('./parsers/jobDescriptionParser');

const parsed = parseJobDescription(jdText, 'JD001');
// Returns: { jobId, role, salary, requiredSkills, optionalSkills, aboutRole, ... }
```

### Skill Matcher (`src/matchers/skillMatcher.js`)

Matches resume skills against job description skills:
- **Fuzzy Matching**: Levenshtein distance for skill similarity
- **Multi-word Skills**: Recognition of compound skill names
- **Matching Analysis**: Detailed analysis of which skills match
- **Score Calculation**: Percentage-based matching score

```javascript
const { matchResumeWithJD } = require('./matchers/skillMatcher');

const match = matchResumeWithJD(parsedResume, parsedJD);
// Returns: { jobId, role, skillsAnalysis, matchingScore, ... }
```

### Skill Database (`src/utils/skillDatabase.js`)

Comprehensive database of 100+ technical skills categorized by:
- Programming Languages (Java, Python, C++, JavaScript, etc.)
- Web Frameworks (React, Angular, Spring Boot, etc.)
- Databases (MySQL, PostgreSQL, MongoDB, etc.)
- Cloud & DevOps (AWS, Docker, Kubernetes, etc.)
- Data Analytics (Kafka, Spark, ELK, etc.)
- And more...

## Output Format

The system outputs structured JSON matching the required format:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "salary": "12 LPA",
  "yearOfExperience": 5.5,
  "resumeSkills": ["Java", "Spring Boot", "Python"],
  "matchingJobs": [
    {
      "jobId": "JD001",
      "role": "Backend Developer",
      "aboutRole": "Responsible for backend development...",
      "skillsAnalysis": [
        { "skill": "Java", "presentInResume": true },
        { "skill": "Kafka", "presentInResume": false }
      ],
      "matchingScore": 50
    }
  ]
}
```

## Docker Support

Build and run with Docker:

```bash
# Build image
docker build -t resume-matcher .

# Run container
docker run -p 3000:3000 resume-matcher npm run api
```


## Example Usage

### Using the CLI

```bash
npm start
```

### Using the API with curl

```bash
curl -X POST http://localhost:3000/api/match \
  -H "Content-Type: application/json" \
  -d '{
    "resume": "John Doe... Java, Python, Spring Boot...",
    "jobDescriptions": ["Senior Java Developer... Java, Spring Boot, Docker..."],
    "jobIds": ["JD001"]
  }'
```

### Programmatic Usage

```javascript
const { processResumeAndJDs } = require('./src/engine');

const result = processResumeAndJDs(resumeText, [jdText], ['JD001']);
console.log(JSON.stringify(result, null, 2));
```

## Limitations and Future Improvements

**Current Limitations:**
- No PDF parsing (input should be plain text)
- Skill database is predefined (no dynamic learning)
- Simple fuzzy matching without context understanding

**Potential Improvements:**
- PDF resume parsing
- Database integration for storing results
- Web UI for easy interaction
- Advanced NLP for better context understanding
- Machine learning for personalized matching weights
- Support for multiple languages

## License

MIT

## Author

Aniket Kumar
