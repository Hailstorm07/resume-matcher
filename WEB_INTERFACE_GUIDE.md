# 🌐 Web Interface - Resume Matcher

## Quick Start

The system now includes an easy-to-use web interface where you can:
- ✅ **Paste your resume** directly into a text area
- ✅ **Upload a resume file** (drag & drop or browse)
- ✅ **Paste job descriptions** to match against
- ✅ **View results instantly** with visual matching scores
- ✅ **See skill breakdown** for each job match

## How to Access

### Option 1: Web UI (Recommended for Non-Technical Users)

1. **Start the API server:**
   ```bash
   cd resume-matcher
   npm install
   npm run api
   ```

2. **Open your browser:**
   Navigate to: `http://localhost:3000`

3. **Use the interface:**
   - Paste or upload your resume
   - Paste job descriptions
   - Click "Find Matches"
   - View results with color-coded scores

### Option 2: Command Line

```bash
npm start
```

### Option 3: Programmatic API

```javascript
const { processResumeAndJDs } = require('./src/engine');
const result = processResumeAndJDs(resumeText, jobDescriptions);
```

## Web Interface Features

### 📄 Resume Input (Two Methods)

#### Method 1: Paste Text
- Click "Paste Text" tab
- Copy and paste your resume content
- System automatically extracts: name, email, phone, experience, skills

#### Method 2: Upload File
- Click "Upload File" tab
- Drag & drop a file OR click to browse
- Supported formats: .txt files (plain text)
- File content automatically loads into text area

### 📋 Job Descriptions

- Paste one or more job descriptions
- Separate multiple JDs with blank lines
- System automatically extracts required/optional skills
- Can handle various JD formats

### 📊 Results Display

Each job match shows:
- **Job Title** - Extracted role name
- **Matching Score** - 0-100% with color coding
  - 🟢 90-100% = Excellent Match
  - 🔵 75-89% = Good Match
  - 🟡 60-74% = Decent Match
  - 🔴 <60% = Poor Match
- **Matched Skills** - Skills you have (green)
- **Missing Skills** - Skills to develop (red)

### 👤 Candidate Information

The results show extracted information:
- Name, email, phone
- Years of experience
- Total skills found
- Detailed skill analysis per job

## Example Usage

### Sample Resume
```
John Doe
john.doe@example.com
(555) 123-4567

Senior Software Engineer
7 years of professional experience

Skills:
Java, Spring Boot, Python, React, Docker, Kubernetes, 
MySQL, PostgreSQL, REST APIs, Agile, Git, CI/CD
```

### Sample Job Description
```
Senior Java Developer

Company: TechCorp
Location: San Francisco, CA

We're looking for an experienced Java developer to lead our backend platform.

Required Skills:
- Java (5+ years)
- Spring Boot
- Microservices
- Docker
- Kubernetes
- MySQL or PostgreSQL
- REST API design
- Git version control

Salary: $150,000 - $180,000
```

### Expected Result
- Match Score: **75-85%** (Most required skills matched)
- Matched: Java, Spring Boot, Docker, Kubernetes, MySQL, Git
- Missing: Microservices (specialized), REST API (may be inferred)

## Matching Algorithm

The system uses **intelligent skill matching**:
- Exact skill matching
- Fuzzy matching (handles typos like "C++" vs "C Plus Plus")
- Multi-word skill recognition ("Spring Boot", "REST API")
- Confidence threshold: 85%

### Score Calculation
```
Matching Score = (Matched JD Skills / Total JD Skills) × 100
```

## Browser Compatibility

✅ Works with:
- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Features

### User-Friendly UI
- Clean, modern interface
- Color-coded results
- Responsive design (mobile-friendly)
- Drag & drop file upload

### Smart Extraction
- Auto-detects candidate information
- Recognizes 100+ technical skills
- Handles various resume formats
- Distinguishes required vs optional skills

### Instant Feedback
- Real-time validation
- Loading indicators
- Clear error messages
- Success confirmations

### Data Privacy
- All processing happens locally
- No data stored on server
- No external API calls to AI services
- Your resume data stays with you

## Tips for Best Results

1. **Resume Format**
   - Include: Name, email, phone, experience, skills
   - Clear section headings help
   - One skill per line or comma-separated

2. **Job Descriptions**
   - Use complete JD text
   - Include "Required" and "Desired" sections
   - Skills clearly listed

3. **Skill Matching**
   - Be specific with skill names
   - Use standard terminology
   - Include version numbers if relevant (Java 8, Python 3.x)

4. **Multiple Jobs**
   - Paste several JDs separated by blank lines
   - System will match against all of them
   - Compare scores to find best fit

## Troubleshooting

### "API error" message
- Ensure server is running: `npm run api`
- Check that you're using `http://` not `https://`
- Reload the page

### Resume not uploading
- Check file is plain text (.txt)
- File size should be reasonable (<5MB)
- Try copying text directly instead

### No results showing
- Ensure resume has at least name and skills
- Check job descriptions have skill keywords
- Try pasting sample data first

### Scores seem low
- This is normal if few skills match
- The score represents how well-qualified you are
- Missing skills can often be learned

## API Endpoints Used

The web interface uses these endpoints:

```
POST /api/match
- Input: resume text, job descriptions
- Output: JSON with candidate info and match scores

POST /api/parse-resume
- Input: resume text
- Output: Parsed candidate information

POST /api/parse-jd
- Input: job description text
- Output: Extracted job details
```

## Next Steps

1. **Try the web interface:** Visit `http://localhost:3000`
2. **Paste sample data** from the "How to Use" section
3. **Test with your resume** and actual job postings
4. **Explore results** and adjust resume if needed

## Support

For detailed system information:
- [README.md](README.md) - Complete documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [QUICKSTART.md](QUICKSTART.md) - Quick reference

---

**Status:** ✅ Web interface ready
**Try it now:** `npm run api` then visit `http://localhost:3000`
