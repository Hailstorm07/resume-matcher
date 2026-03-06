# Quick Start Guide

## Installation & Setup

### Option 1: Direct Node.js Installation (Recommended)

```bash
# Navigate to project directory
cd resume-matcher

# Install dependencies
npm install

# Run tests to verify setup
npm test

# Run the CLI with sample data
npm start

# Or start the API server
npm run api
```

### Option 2: Docker Installation

```bash
# Build the Docker image
docker build -t resume-matcher .

# Run the container (API mode)
docker run -p 3000:3000 resume-matcher npm run api

# Run the container (CLI mode)
docker run resume-matcher npm start
```

## Quick Examples

### 1. Using the CLI

```bash
npm start
```

Output includes parsed resume data and matching results with scores.

### 2. Using the REST API

Start the server:
```bash
npm run api
```

Example request with curl:
```bash
curl -X POST http://localhost:3000/api/match \
  -H "Content-Type: application/json" \
  -d '{
    "resume": "John Doe, john@example.com, 5 years of experience, Java, Spring Boot, Python",
    "jobDescriptions": ["Senior Java Developer role requiring Java, Spring Boot, Docker"],
    "jobIds": ["JD001"]
  }'
```

### 3. Programmatic Usage

```javascript
const { processResumeAndJDs } = require('./src/engine');

const resumeText = 'John Doe, 5 years Java developer...';
const jdTexts = ['Senior Java role requiring Java, Spring Boot...'];
const jobIds = ['JD001'];

const result = processResumeAndJDs(resumeText, jdTexts, jobIds);
console.log(JSON.stringify(result, null, 2));
```

## System Capabilities

✅ **Extracts from Resumes:**
- Name, email, phone
- Salary information
- Years of experience
- Technical skills (100+ recognized)

✅ **Extracts from Job Descriptions:**
- Job title/role
- Required and optional skills
- Salary range
- Experience requirements
- Job summary

✅ **Matching Features:**
- Fuzzy skill matching (Levenshtein distance)
- Skill presence analysis
- Percentage-based matching score
- Detailed skill-by-skill breakdown

## Sample Output

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "(555) 123-4567",
  "salary": null,
  "yearOfExperience": 6,
  "resumeSkills": ["Java", "Spring Boot", "Python", ...],
  "matchingJobs": [
    {
      "jobId": "JD001",
      "role": "Senior Backend Engineer",
      "aboutRole": "...",
      "skillsAnalysis": [
        {"skill": "Java", "presentInResume": true},
        {"skill": "Kafka", "presentInResume": false}
      ],
      "matchingScore": 75.5
    }
  ]
}
```

## File Structure

```
resume-matcher/
├── src/
│   ├── index.js                      # CLI entry point
│   ├── api.js                        # Express API
│   ├── engine.js                     # Main processor
│   ├── parsers/                      # Parsing modules
│   ├── matchers/                     # Matching logic
│   └── utils/                        # Helper utilities
├── test/
│   └── test.js                       # Test suite
├── outputs/                          # Results storage
├── package.json                      # Dependencies
├── Dockerfile                        # Docker configuration
├── README.md                         # Full documentation
└── QUICKSTART.md                     # This file
```

## API Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/health` | Health check |
| POST | `/api/match` | Match resume with JDs |
| POST | `/api/parse-resume` | Parse resume only |
| POST | `/api/parse-jd` | Parse JD only |
| GET | `/api/docs` | API documentation |

## Troubleshooting

**Issue: npm install fails**
- Solution: Ensure Node.js v14+ is installed: `node --version`

**Issue: regex errors with C++ or C#**
- Solution: Already fixed in v1.0.0, upgrade if needed

**Issue: API port already in use**
- Solution: Use different port: `PORT=3001 npm run api`

**Issue: Tests fail**
- Solution: Verify all dependencies installed: `npm install --save`

## Performance Notes

- Single resume parsing: < 50ms
- Single JD parsing: < 50ms
- Resume-to-JD matching: < 10ms
- Batch processing scales linearly

## Next Steps

1. Try the [API documentation](http://localhost:3000/api/docs)
2. Read the [full README](README.md)
3. Explore the [source code](src/)
4. Review [test examples](test/test.js)
