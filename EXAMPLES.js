/**
 * COMPREHENSIVE EXAMPLES
 * Demonstrates all features of the Resume Matching System
 */

// ============================================================================
// EXAMPLE 1: Basic CLI Usage
// ============================================================================

const { processResumeAndJDs } = require('./src/engine');

const sampleResume = `
Alice Johnson
Email: alice.johnson@email.com
Phone: +1-555-987-6543

Summary:
Senior Software Engineer with 7 years of experience in full-stack development.
Expert in Java, Spring Boot, React, and cloud technologies.

Skills:
- Backend: Java, Spring Boot, Python, C++
- Frontend: React, Angular, HTML, CSS, JavaScript
- Databases: MySQL, PostgreSQL, MongoDB
- DevOps: Docker, Kubernetes, Jenkins, AWS, Azure
- Other: REST APIs, Microservices, Agile, Git, CI/CD

Experience:
Senior Full Stack Engineer (2018-Present) - 6 years
- Led microservices migration
- Managed Docker and Kubernetes deployments
- React frontend development
- Mentored junior developers

Software Developer (2015-2018) - 3 years
- Java backend development
- Database optimization with MySQL
- REST API design

Education:
B.S. Computer Science, Tech University (2015)
`;

const sampleJDs = [
  {
    text: `
Senior Backend Engineer - Java/Spring Boot

Company: TechCorp
Location: San Francisco, CA

Position Overview:
We're seeking an experienced backend engineer to lead our microservices platform.

Responsibilities:
- Design and develop scalable microservices using Java and Spring Boot
- Lead architectural decisions for distributed systems
- Mentor junior engineers
- Optimize database performance

Required Skills:
- Java (minimum 5+ years)
- Spring Boot framework
- Microservices architecture
- MySQL or PostgreSQL
- Docker and Kubernetes
- REST API design
- Git version control

Desired Skills:
- Python scripting
- AWS or Azure experience
- Message queues (Kafka, RabbitMQ)
- Agile/Scrum experience

Salary: $150,000 - $180,000
Experience: 5+ years
    `,
    jobId: 'JD_BACKEND_001'
  },
  {
    text: `
Full Stack Engineer

Company: StartupXYZ
Location: Remote

About the Role:
Join our team to build next-generation web applications.

What You'll Do:
- Develop full-stack applications using React and Java
- Implement responsive user interfaces with React
- Design backend services with Spring Boot
- Work with PostgreSQL and MongoDB
- Deploy using Docker and Jenkins

Must Have:
- React expertise
- Java or Python backend experience
- HTML/CSS/JavaScript skills
- REST API development experience
- Git and version control

Nice to Have:
- Angular or Vue.js knowledge
- Kubernetes experience
- AWS cloud experience
- Agile methodology experience

Compensation: $120,000 - $150,000 annually
    `,
    jobId: 'JD_FULLSTACK_002'
  }
];

console.log('═══════════════════════════════════════════════════');
console.log('EXAMPLE 1: BASIC PROCESSING');
console.log('═══════════════════════════════════════════════════\n');

const result1 = processResumeAndJDs(
  sampleResume,
  sampleJDs.map(jd => jd.text),
  sampleJDs.map(jd => jd.jobId)
);

console.log('Candidate Name:', result1.name);
console.log('Email:', result1.email);
console.log('Years of Experience:', result1.yearOfExperience);
console.log('Number of Skills:', result1.resumeSkills.length);
console.log('\nMatching Results:');

result1.matchingJobs.forEach((job, i) => {
  const matchedCount = job.skillsAnalysis.filter(s => s.presentInResume).length;
  const totalCount = job.skillsAnalysis.length;
  
  console.log(`\n${i + 1}. ${job.role} (${job.jobId})`);
  console.log(`   Match Score: ${job.matchingScore}%`);
  console.log(`   Matched Skills: ${matchedCount}/${totalCount}`);
});

// ============================================================================
// EXAMPLE 2: Individual Component Usage
// ============================================================================

console.log('\n\n═══════════════════════════════════════════════════');
console.log('EXAMPLE 2: USING INDIVIDUAL COMPONENTS');
console.log('═══════════════════════════════════════════════════\n');

const { parseResume } = require('./src/parsers/resumeParser');
const { parseJobDescription } = require('./src/parsers/jobDescriptionParser');
const { matchResumeWithJD } = require('./src/matchers/skillMatcher');

// Step 1: Parse resume
const parsedResume = parseResume(sampleResume);
console.log('Step 1: Parse Resume');
console.log('  Name:', parsedResume.name);
console.log('  Email:', parsedResume.email);
console.log('  Skills Found:', parsedResume.resumeSkills.length);

// Step 2: Parse job description
const parsedJD = parseJobDescription(sampleJDs[0].text, 'JD_BACKEND_001');
console.log('\nStep 2: Parse Job Description');
console.log('  Role:', parsedJD.role);
console.log('  Required Skills:', parsedJD.requiredSkills.length);
console.log('  Optional Skills:', parsedJD.optionalSkills.length);

// Step 3: Match them
const match = matchResumeWithJD(parsedResume, parsedJD);
console.log('\nStep 3: Match Resume with JD');
console.log('  Matching Score:', match.matchingScore + '%');
console.log('  Matched:', match.matchedSkillsCount + ' of ' + match.totalRequiredSkills);

// ============================================================================
// EXAMPLE 3: API Usage with Express
// ============================================================================

console.log('\n\n═══════════════════════════════════════════════════');
console.log('EXAMPLE 3: REST API USAGE');
console.log('═══════════════════════════════════════════════════\n');

console.log(`
To use the REST API, start the server:
  npm run api

Then make requests:

1. Match Resume with Multiple JDs:
   POST http://localhost:3000/api/match
   
   Body:
   {
     "resume": "${sampleResume.substring(0, 50)}...",
     "jobDescriptions": [
       "${sampleJDs[0].text.substring(0, 50)}...",
       "${sampleJDs[1].text.substring(0, 50)}..."
     ],
     "jobIds": ["JD_BACKEND_001", "JD_FULLSTACK_002"]
   }

2. Parse Just a Resume:
   POST http://localhost:3000/api/parse-resume
   
   Body:
   {
     "resume": "${sampleResume.substring(0, 50)}..."
   }

3. Parse Just a Job Description:
   POST http://localhost:3000/api/parse-jd
   
   Body:
   {
     "jobDescription": "${sampleJDs[0].text.substring(0, 50)}...",
     "jobId": "JD_BACKEND_001"
   }

4. Get API Documentation:
   GET http://localhost:3000/api/docs
`);

// ============================================================================
// EXAMPLE 4: Batch Processing Multiple Resumes
// ============================================================================

console.log('\n═══════════════════════════════════════════════════');
console.log('EXAMPLE 4: BATCH PROCESSING');
console.log('═══════════════════════════════════════════════════\n');

const { batchProcessResumes } = require('./src/engine');

const resume2 = `
Bob Smith
Email: bob.smith@email.com
Phone: (555) 123-4567
5 years experience
Skills: React, JavaScript, Angular, HTML, CSS, Node.js, Python
`;

const resume3 = `
Carol Davis
Email: carol@email.com
8 years experience
Skills: C++, Python, Linux, Unix, Bash, Docker, Kubernetes, Microservices
`;

const allResumes = [sampleResume, resume2, resume3];
const allJDs = sampleJDs.map(jd => jd.text);

const batchResults = batchProcessResumes(allResumes, allJDs);

console.log(`Processing ${batchResults.length} resumes against ${allJDs.length} JDs:\n`);

batchResults.forEach((candidate, i) => {
  console.log(`Candidate ${i + 1}: ${candidate.name}`);
  console.log(`  Best Match: ${candidate.matchingJobs[0].role}`);
  console.log(`  Best Score: ${candidate.matchingJobs[0].matchingScore}%`);
  console.log('');
});

// ============================================================================
// EXAMPLE 5: Advanced Matching Analysis
// ============================================================================

console.log('═══════════════════════════════════════════════════');
console.log('EXAMPLE 5: DETAILED SKILL ANALYSIS');
console.log('═══════════════════════════════════════════════════\n');

const detailedMatch = matchResumeWithJD(parsedResume, parsedJD);

console.log(`Job: ${detailedMatch.role}`);
console.log(`Total Matching Score: ${detailedMatch.matchingScore}%\n`);

console.log('Skill-by-Skill Analysis:');
console.log('-'.repeat(50));

const matchedSkills = detailedMatch.skillsAnalysis.filter(s => s.presentInResume);
const missingSkills = detailedMatch.skillsAnalysis.filter(s => !s.presentInResume);

if (matchedSkills.length > 0) {
  console.log('\n✓ MATCHED SKILLS:');
  matchedSkills.forEach(skill => {
    console.log(`  ✓ ${skill.skill}`);
  });
}

if (missingSkills.length > 0) {
  console.log('\n✗ MISSING SKILLS (Gaps to Address):');
  missingSkills.forEach(skill => {
    console.log(`  ✗ ${skill.skill}`);
  });
}

console.log('\n' + '-'.repeat(50));
console.log(`Match Coverage: ${detailedMatch.matchedSkillsCount}/${detailedMatch.totalRequiredSkills} required skills`);

// ============================================================================
// EXAMPLE 6: Using Extractors Directly
// ============================================================================

console.log('\n\n═══════════════════════════════════════════════════');
console.log('EXAMPLE 6: DIRECT EXTRACTOR USAGE');
console.log('═══════════════════════════════════════════════════\n');

const { extractSalary, extractYearsOfExperience, extractEmail } = require('./src/utils/extractors');

const testText = `
John Doe
john.doe@example.com
Salary: $120,000 per annum
Experience: 7 years in software development
`;

console.log('Extracting data from text:');
console.log('Text:', testText);
console.log('\nExtracted:');
console.log('  Email:', extractEmail(testText));
console.log('  Salary:', extractSalary(testText));
console.log('  Years:', extractYearsOfExperience(testText));

// ============================================================================
// EXAMPLE 7: Scoring Interpretation Guide
// ============================================================================

console.log('\n\n═══════════════════════════════════════════════════');
console.log('EXAMPLE 7: MATCHING SCORE INTERPRETATION');
console.log('═══════════════════════════════════════════════════\n');

console.log(`
Score Ranges and Interpretation:

90-100%: EXCELLENT MATCH
  - Candidate has nearly all required skills
  - Strong fit for the position
  - Recommendation: High priority interview

75-89%: GOOD MATCH
  - Candidate has most required skills
  - Some gaps but strong foundation
  - Recommendation: Schedule interview

60-74%: DECENT MATCH
  - Candidate has several required skills
  - Notable skill gaps but trainable
  - Recommendation: Interview if specific skills are trainable

40-59%: PARTIAL MATCH
  - Candidate missing multiple required skills
  - May need significant training
  - Recommendation: Consider only if willing to train

0-39%: POOR MATCH
  - Major skill gaps
  - Not recommended for this role
  - Recommendation: Look for better matches
`);

// ============================================================================
// CONCLUSION
// ============================================================================

console.log('\n═══════════════════════════════════════════════════');
console.log('END OF EXAMPLES');
console.log('═══════════════════════════════════════════════════\n');

console.log(`
For more information:
- README.md - Complete documentation
- QUICKSTART.md - Quick start guide
- ARCHITECTURE.md - System design and algorithms
- src/index.js - CLI implementation
- src/api.js - API server implementation
`);
