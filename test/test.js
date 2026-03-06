/**
 * Test suite for Resume Matching System
 */

const { parseResume } = require('../src/parsers/resumeParser');
const { parseJobDescription } = require('../src/parsers/jobDescriptionParser');
const { matchResumeWithJD } = require('../src/matchers/skillMatcher');
const { processResumeAndJDs } = require('../src/engine');

// Test data
const testResume = `
Jane Smith
Email: jane.smith@test.com
Phone: +1-555-234-5678

Summary: Software Engineer with 4 years of experience. Proficient in Java, Spring Boot, Python, and React.

Skills: Java, Spring Boot, MySQL, Python, React, Docker, Kubernetes, REST APIs, Git, Agile

Experience:
Software Engineer at TechCorp (2020-Present, 4 years)
- Developed microservices using Spring Boot and Java
- Created React-based user interfaces
- Worked with Docker containers
- Database design with MySQL and PostgreSQL

Previous roles in JavaScript, HTML, CSS
`;

const testJD = `
Senior Java Developer

Position Overview:
We're looking for an experienced Java developer to join our backend team.

Responsibilities:
- Develop enterprise applications using Java and Spring Boot
- Write clean, maintainable code
- Participate in code reviews
- Work with REST APIs

Required Skills:
- Java (essential)
- Spring Boot (required)
- MySQL (mandatory)
- Agile (must have)
- Git (required)

Desired Skills:
- Docker (preferred)
- Kubernetes (nice to have)
- Python (good to have)

Salary: $90,000 - $120,000 per annum
Experience: 4+ years
`;

function runTests() {
  console.log('🧪 RUNNING TESTS FOR RESUME MATCHING SYSTEM\n');
  
  let passed = 0;
  let failed = 0;

  // Test 1: Resume parsing
  console.log('Test 1: Resume Parsing');
  try {
    const parsed = parseResume(testResume);
    
    if (parsed.name && parsed.email && parsed.resumeSkills.length > 0) {
      console.log('✓ Resume parsing successful');
      console.log('  - Name:', parsed.name);
      console.log('  - Email:', parsed.email);
      console.log('  - Skills found:', parsed.resumeSkills.length);
      console.log('  - Years of experience:', parsed.yearOfExperience);
      passed++;
    } else {
      console.log('✗ Resume parsing failed - missing data');
      failed++;
    }
  } catch (error) {
    console.log('✗ Resume parsing error:', error.message);
    failed++;
  }
  console.log('');

  // Test 2: Job description parsing
  console.log('Test 2: Job Description Parsing');
  try {
    const parsed = parseJobDescription(testJD, 'TEST001');
    
    if (parsed.requiredSkills.length > 0 && parsed.role) {
      console.log('✓ Job description parsing successful');
      console.log('  - Job ID:', parsed.jobId);
      console.log('  - Role:', parsed.role);
      console.log('  - Required skills:', parsed.requiredSkills.length);
      console.log('  - Optional skills:', parsed.optionalSkills.length);
      console.log('  - Salary:', parsed.salary);
      passed++;
    } else {
      console.log('✗ Job description parsing failed');
      failed++;
    }
  } catch (error) {
    console.log('✗ Job description parsing error:', error.message);
    failed++;
  }
  console.log('');

  // Test 3: Resume-JD matching
  console.log('Test 3: Resume and Job Description Matching');
  try {
    const resume = parseResume(testResume);
    const jd = parseJobDescription(testJD, 'TEST001');
    const match = matchResumeWithJD(resume, jd);
    
    if (match.matchingScore >= 0 && match.matchingScore <= 100) {
      console.log('✓ Matching successful');
      console.log('  - Matching score:', match.matchingScore + '%');
      console.log('  - Matched skills:', match.matchedSkillsCount + '/' + match.totalRequiredSkills);
      console.log('  - Skills analysis entries:', match.skillsAnalysis.length);
      passed++;
    } else {
      console.log('✗ Matching calculation failed');
      failed++;
    }
  } catch (error) {
    console.log('✗ Matching error:', error.message);
    failed++;
  }
  console.log('');

  // Test 4: Full workflow
  console.log('Test 4: Complete Processing Workflow');
  try {
    const result = processResumeAndJDs(testResume, [testJD], ['TEST001']);
    
    if (result.name && result.resumeSkills && result.matchingJobs && result.matchingJobs.length > 0) {
      console.log('✓ Complete workflow successful');
      console.log('  - Candidate name:', result.name);
      console.log('  - Resume skills:', result.resumeSkills.length);
      console.log('  - Matching jobs:', result.matchingJobs.length);
      console.log('  - Top match score:', result.matchingJobs[0].matchingScore + '%');
      passed++;
    } else {
      console.log('✗ Complete workflow failed');
      failed++;
    }
  } catch (error) {
    console.log('✗ Complete workflow error:', error.message);
    failed++;
  }
  console.log('');

  // Summary
  console.log('====== TEST SUMMARY ======');
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${passed + failed}`);
  
  if (failed === 0) {
    console.log('\n✓ All tests passed!');
  } else {
    console.log(`\n✗ ${failed} test(s) failed`);
  }
}

// Run tests
if (require.main === module) {
  runTests();
}

module.exports = { runTests };
