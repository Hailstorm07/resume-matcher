# 🚀 WEB INTERFACE - QUICK START (2 MINUTES)

## Installation (One Time)

```bash
cd d:\hidani\resume-matcher
npm install
```

## Start the Web Interface

```bash
npm run api
```

Wait for message:
```
Resume Matcher API running on http://localhost:3000
```

## Open in Browser

Go to: **http://localhost:3000**

You'll see a beautiful interface!

## How to Use (3 Steps)

### Step 1: Enter Your Resume
**Choose ONE:**
- **Paste Text:** Copy-paste your resume content
- **Upload File:** Drag & drop or browse a .txt file

Example:
```
John Doe
john@example.com
(555) 123-4567
5 years experience
Skills: Java, Python, Spring Boot, Docker, React
```

### Step 2: Add Job Descriptions
Paste job postings in the second field.

Example:
```
Senior Java Developer
Company: TechCorp
Required: Java, Spring Boot, Docker, MySQL
```

### Step 3: Click "Find Matches"
See instant results with:
- Your extracted information
- Matching percentage for each job
- Green skills (you have) vs Red skills (gaps)

## Score Guide

| Score | Status |
|-------|--------|
| 🟢 90-100% | Excellent Match |
| 🔵 75-89% | Good Match |
| 🟡 60-74% | Decent Match |
| 🔴 Below 60% | Poor Match |

## Example Usage

**Resume:**
```
Alice Johnson
alice@email.com
(555) 987-6543
7 years
Skills: Java, Spring Boot, Docker, Kubernetes, Python, MySQL
```

**Job Description:**
```
Senior Backend Engineer
Required: Java, Spring Boot, Docker, MySQL, REST APIs
Desired: Python, Kubernetes
```

**Result:** 85% Match ✅
- Matched: Java, Spring Boot, Docker, MySQL, Python
- Missing: REST APIs (usually can infer)

## Features

✨ **What You Get:**
- Paste OR upload resume
- Multiple job descriptions at once
- Instant matching results
- Color-coded skills
- Extracted candidate info
- Beautiful, responsive design
- Works on mobile too

🔒 **Privacy:**
- All processing is LOCAL
- Your data NEVER leaves your computer
- No external services used
- No data stored anywhere

⚡ **Performance:**
- Results in seconds
- No waiting or delays
- Smooth, instant updates

## Troubleshooting

**Can't access http://localhost:3000?**
- Make sure `npm run api` is running
- Wait 5 seconds after starting
- Try refreshing the page
- Check that nothing else is using port 3000

**Resume not uploading?**
- Use plain text files (.txt)
- Try copying text instead
- Keep file size reasonable

**Getting low scores?**
- This is accurate! Low score = missing many required skills
- Use it to identify skill gaps
- Plan your learning accordingly

## Commands

```bash
# Start web interface (recommended)
npm run api
# Then: http://localhost:3000

# Or use CLI (samples only)
npm start

# Or run tests
npm test
```

## What's Different From CLI?

| Feature | CLI | Web Interface |
|---------|-----|---------------|
| Easy to use | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Beautiful UI | ❌ | ✅ |
| Upload files | ❌ | ✅ |
| See results instantly | ❌ | ✅ |
| Color-coded results | ❌ | ✅ |
| Mobile friendly | ❌ | ✅ |
| Requires coding | ❌ | ✅ |

## Next Steps

1. Run: `npm run api`
2. Open: `http://localhost:3000`
3. Paste your resume
4. Paste job descriptions
5. Click "Find Matches"
6. Review results!

## More Information

- Full guide: [USER_GUIDE.md](USER_GUIDE.md)
- Web interface details: [WEB_INTERFACE_GUIDE.md](WEB_INTERFACE_GUIDE.md)
- Full documentation: [README.md](README.md)

---

**🎯 That's it!** You're ready to go. Start matching! 🚀
