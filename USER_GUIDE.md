# 🎯 Resume Matcher - Web Interface User Guide

## What's New?

You can now use the Resume Matcher system in **three ways**:

1. **🌐 Web Browser** (Easiest) - Paste/upload resume, get instant results
2. **💻 Command Line** - Run scripts with sample data
3. **🔌 API** - Integrate with other systems

## 🌐 Using the Web Interface (Recommended)

### Step 1: Start the System

```bash
cd resume-matcher
npm install           # One-time setup
npm run api          # Start the server
```

You'll see:
```
Resume Matcher API running on http://localhost:3000
API Documentation: http://localhost:3000/api/docs
```

### Step 2: Open in Browser

Visit: **http://localhost:3000**

You'll see a beautiful interface with:
- Left side: Resume input + job descriptions
- Right side: Instructions & scoring guide

### Step 3: Input Your Resume

**Choose one of two ways:**

#### Option A: Paste Resume Text
1. Click "Paste Text" tab
2. Paste your resume content
3. Must include: Name, email, phone, experience, skills

```
Example:
Jane Smith
jane@example.com
(555) 987-6543

7 years experience
Senior Software Engineer

Skills: Java, Python, Spring Boot, Docker, Kubernetes, React, PostgreSQL
```

#### Option B: Upload File
1. Click "Upload File" tab
2. Drag & drop a .txt file OR click to browse
3. File content auto-loads into text area

### Step 4: Add Job Descriptions

1. In the "Job Descriptions" field, paste job postings
2. Separate multiple JDs with blank lines
3. Include: Job title, skills required, description

```
Example:
Senior Backend Engineer

Company: TechCorp

Required Skills:
Java, Spring Boot, Docker, Kubernetes, MySQL, REST APIs

Desired Skills:
Python, Microservices, CI/CD

---

Full Stack Developer

Company: StartupXYZ

Must Have:
React, JavaScript, Python, Docker

Nice to Have:
TypeScript, Kubernetes, AWS
```

### Step 5: Get Instant Results

1. Click **"🚀 Find Matches"**
2. Wait for results to appear
3. You'll see:
   - Your extracted information (name, email, experience, skills)
   - Each job with matching score
   - Green skills (you have) vs Red skills (gaps)

### Understanding Results

#### Matching Score Guide

| Score | Color | Meaning | Action |
|-------|-------|---------|--------|
| 90-100% | 🟢 Green | Excellent fit | Apply immediately |
| 75-89% | 🔵 Blue | Good match | Strong candidate |
| 60-74% | 🟡 Yellow | Decent match | Trainable gaps |
| <60% | 🔴 Red | Poor match | Consider development |

#### Skill Breakdown

- **Green skills** (✓) = You have them
- **Red skills** (✗) = Missing (but often trainable)

**Example Result:**
```
Senior Java Developer - Match: 80%

✓ Matched Skills (Excellent):
Java, Spring Boot, Docker, Kubernetes, MySQL, Git

✗ Missing Skills (Nice to Learn):
Kafka, Microservices, AWS
```

## 💻 Command Line Usage

### Quick Test with Sample Data

```bash
npm start
```

This runs with built-in sample resume and job descriptions.

Output shows:
- Parsed resume data
- Matching results for each job
- Results saved to `outputs/sample_output.json`

## 🔌 API Usage

### Direct API Calls

**Using curl:**
```bash
curl -X POST http://localhost:3000/api/match \
  -H "Content-Type: application/json" \
  -d '{
    "resume": "John Doe...",
    "jobDescriptions": ["Senior Java Developer..."]
  }'
```

**Using JavaScript:**
```javascript
fetch('http://localhost:3000/api/match', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    resume: resumeText,
    jobDescriptions: [jd1, jd2, ...]
  })
})
.then(res => res.json())
.then(data => console.log(data.data))
```

## 📝 Tips for Best Results

### Resume Tips
1. **Include key information:**
   - Name at the top
   - Email and phone
   - Years of experience
   - Clear skills list

2. **Skill format (any of these work):**
   ```
   Skills: Java, Python, Docker, Kubernetes
   
   OR
   
   Skills
   - Java
   - Python
   - Docker
   
   OR
   
   Proficient in Java, Python, and Docker
   ```

3. **Experience formats:**
   ```
   7 years of experience
   
   OR
   
   Senior Engineer (2017-2024) - 7 years
   
   OR
   
   From 2017 to 2024
   ```

### Job Description Tips
1. **Include the full JD** - More complete = better matching
2. **Clear structure** helps - Use sections like:
   - Requirements
   - Desired Skills
   - Responsibilities
   - About Role

3. **Multiple JDs** - Separate with blank lines (2+ line breaks)

### Skill Naming
- Use standard names: "Java" not "JAVA"
- Multi-word: "Spring Boot" (with space)
- Common abbreviations work: "REST API", "CI/CD"
- 100+ recognized skills in database

## 🎯 Real-World Examples

### Example 1: Getting 85% Match

**Your Resume:**
```
Senior Java Developer
john@example.com
(555) 123-4567

8 years of experience

Skills: Java, Spring Boot, Python, Docker, Kubernetes, 
MySQL, PostgreSQL, REST APIs, Git, Agile
```

**Job Description:**
```
Senior Backend Engineer

Required:
- Java (5+ years)
- Spring Boot
- Docker
- Kubernetes
- MySQL
- REST API development
- Git

Desired:
- Python
- Microservices architecture
```

**Result: 85% Match** ✅
- All required skills match
- Great candidate

### Example 2: Getting 60% Match

**Your Resume:**
```
Frontend Developer
jane@example.com

5 years experience

Skills: JavaScript, React, HTML, CSS, Node.js, MongoDB
```

**Job Description:**
```
Full Stack Engineer

Required:
- React
- Node.js
- Java
- MySQL
- Docker
- REST APIs
```

**Result: 60% Match** ⚠️
- Have: React, Node.js
- Missing: Java, MySQL, Docker, REST APIs
- Development opportunity

### Example 3: Getting Low Match

**Your Resume:**
```
Data Scientist
alex@example.com

3 years experience

Skills: Python, R, Pandas, Scikit-learn, Machine Learning
```

**Job Description:**
```
C++ Game Developer

Required:
- C++
- Game Engine (Unity/Unreal)
- Graphics Programming
- Windows SDK
```

**Result: 0% Match** ❌
- No overlapping skills
- Different career path

## 🔒 Privacy & Security

✅ **Your data is safe:**
- All processing happens **locally** on your computer
- Resume never leaves your system
- No external AI APIs or cloud services
- No data storage or logging

## 🐛 Troubleshooting

### "Cannot connect to server"
**Solution:**
- Ensure you ran `npm run api`
- Check `http://localhost:3000` (not https)
- Wait 5 seconds for server to start
- Try a different browser

### "Resume parsing failed"
**Solution:**
- Make sure resume has at least:
  - A name
  - Some skills
  - Some experience info
- Try the sample format from the guide

### "No job descriptions provided"
**Solution:**
- Paste job description text in the second field
- Must have actual job content (not empty)
- Try the sample JD format

### "Score seems wrong"
**Solution:**
- Score reflects skill match only
- Lower scores mean missing required skills
- This is accurate - don't assume the system is wrong
- Use as a guide to identify gaps

## 📊 Interpreting Results

### What Each Score Means

**95%+ - Perfect Match**
- You have almost all required skills
- Apply immediately
- High chance of getting interview

**80-94% - Strong Match**
- You meet most requirements
- Some advanced skills might be missing
- Still a great opportunity

**65-79% - Decent Match**
- You have core skills
- Some gaps but trainable
- Could learn quickly on the job

**50-64% - Possible Match**
- You have some relevant skills
- Significant learning required
- Consider if willing to upskill

**<50% - Poor Match**
- Major skill gaps
- Would require extensive training
- Better candidates probably available

## 💡 Next Steps

1. **Try it now:**
   ```bash
   npm run api
   # Open http://localhost:3000
   ```

2. **Add your resume** using one of the methods

3. **Paste some job descriptions** (copy from real job sites)

4. **Review results** and identify:
   - Your strongest matches
   - Skills to develop
   - Career growth areas

5. **Use insights to:**
   - Decide which jobs to apply for
   - Plan skill development
   - Update your resume

## 📚 Additional Resources

- **Full Documentation:** See [README.md](README.md)
- **Technical Details:** See [ARCHITECTURE.md](ARCHITECTURE.md)
- **API Reference:** Visit `/api/docs` in the running system
- **Examples:** See [EXAMPLES.js](EXAMPLES.js)

## Quick Commands Reference

```bash
# Install (one time)
npm install

# Start web interface
npm run api
# Then visit: http://localhost:3000

# Run CLI with samples
npm start

# Run tests
npm test

# Check API health
curl http://localhost:3000/health
```

---

**Ready to try?** → `npm run api` → Open `http://localhost:3000` ✨
