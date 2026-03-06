/**
 * Comprehensive Test Suite for Resume Matching System
 * Tests all functionality including extraction and matching
 */

const { processResumeAndJDs } = require('../src/engine');
const { parseResume } = require('../src/parsers/resumeParser');
const { parseJobDescription } = require('../src/parsers/jobDescriptionParser');
const { sampleResumes } = require('./sampleResumes');
const { sampleJDs } = require('./sampleJobDescriptions');
const fs = require('fs');
const path = require('path');

console.log('\n' + '='.repeat(80));
console.log('RESUME MATCHING SYSTEM - COMPREHENSIVE TEST SUITE');
console.log('='.repeat(80) + '\n');

// Test 1: Parse resume and extract information
console.log('TEST 1: Resume Parsing - Extract Information');
console.log('-'.repeat(80));

async function testResumeParsing() {
  const resume = sampleResumes.resume1;
  console.log(`Testing: ${resume.name}\n`);

  try {
    const parsed = await parseResume(resume.text);
    
    console.log('✓ Name:', parsed.name);
    console.log('✓ Email:', parsed.email);
    console.log('✓ Phone:', parsed.phone);
    console.log('✓ Years of Experience:', parsed.yearOfExperience);
    console.log('✓ Salary:', parsed.salary);
    console.log('✓ Skills Extracted:', parsed.resumeSkills.length, 'skills');
    console.log('  Skills:', parsed.resumeSkills.slice(0, 10).join(', ') + (parsed.resumeSkills.length > 10 ? '...' : ''));
    console.log('\n✅ Resume parsing successful\n');
    return true;
  } catch (error) {
    console.error('❌ Error parsing resume:', error.message);
    return false;
  }
}

// Test 2: Parse job description and extract information
console.log('TEST 2: Job Description Parsing - Extract Information');
console.log('-'.repeat(80));

function testJDParsing() {
  const jd = sampleJDs.jd002;
  console.log(`Testing: ${jd.title}\n`);

  try {
    const parsed = parseJobDescription(jd.text, jd.jobId);
    
    console.log('✓ Job ID:', parsed.jobId);
    console.log('✓ Role:', parsed.role);
    console.log('✓ Salary:', parsed.salary);
    console.log('✓ Years of Experience Required:', parsed.yearsOfExperience);
    console.log('✓ Required Skills:', parsed.requiredSkills.length, 'skills');
    console.log('  Skills:', parsed.requiredSkills.slice(0, 10).join(', ') + (parsed.requiredSkills.length > 10 ? '...' : ''));
    console.log('✓ Optional Skills:', parsed.optionalSkills.length, 'skills');
    console.log('  Skills:', parsed.optionalSkills.join(', '));
    console.log('✓ About Role:', parsed.aboutRole.substring(0, 100) + '...');
    console.log('\n✅ Job description parsing successful\n');
    return true;
  } catch (error) {
    console.error('❌ Error parsing JD:', error.message);
    return false;
  }
}

// Test 3: Match resume with single job description
console.log('TEST 3: Single Resume to Single JD Matching');
console.log('-'.repeat(80));

async function testSingleMatching() {
  const resume = sampleResumes.resume1;
  const jd = sampleJDs.jd002;
  console.log(`Matching: ${resume.name} → ${jd.title}\n`);

  try {
    const result = await processResumeAndJDs(resume.text, [jd.text], [jd.jobId]);
    
    console.log('Resume Information:');
    console.log('  Name:', result.name);
    console.log('  Experience:', result.yearOfExperience, 'years');
    console.log('  Skills:', result.resumeSkills.length);
    
    const match = result.matchingJobs[0];
    console.log('\nJob Matching Result:');
    console.log('  Job ID:', match.jobId);
    console.log('  Role:', match.role);
    console.log('  Matching Score:', match.matchingScore + '%');
    console.log('  Skills Analysis:');
    
    const matchedCount = match.skillsAnalysis.filter(s => s.presentInResume).length;
    const totalCount = match.skillsAnalysis.length;
    
    console.log(`    Matched: ${matchedCount}/${totalCount}`);
    console.log('    Sample analysis:');
    match.skillsAnalysis.slice(0, 5).forEach(skill => {
      const status = skill.presentInResume ? '✓' : '✗';
      console.log(`      ${status} ${skill.skill}`);
    });
    
    console.log('\n✅ Single matching test successful\n');
    return true;
  } catch (error) {
    console.error('❌ Error in matching:', error.message);
    console.error(error.stack);
    return false;
  }
}

// Test 4: Match resume with multiple job descriptions
console.log('TEST 4: Single Resume to Multiple JDs Matching');
console.log('-'.repeat(80));

async function testMultipleMatching() {
  const resume = sampleResumes.resume2;
  const jdTexts = [sampleJDs.jd001.text, sampleJDs.jd003.text, sampleJDs.jd004.text];
  const jobIds = [sampleJDs.jd001.jobId, sampleJDs.jd003.jobId, sampleJDs.jd004.jobId];
  
  console.log(`Matching: ${resume.name} → Multiple JDs\n`);

  try {
    const result = await processResumeAndJDs(resume.text, jdTexts, jobIds);
    
    console.log('Resume Information:');
    console.log('  Name:', result.name);
    console.log('  Experience:', result.yearOfExperience, 'years');
    console.log('  Skills:', result.resumeSkills.length);
    
    console.log('\nMatching Results:');
    result.matchingJobs.forEach(match => {
      console.log(`  ${match.jobId}: ${match.role}`);
      console.log(`    Matching Score: ${match.matchingScore}%`);
      const matched = match.skillsAnalysis.filter(s => s.presentInResume).length;
      const total = match.skillsAnalysis.length;
      console.log(`    Matched: ${matched}/${total} skills`);
    });
    
    // Find best match
    const bestMatch = result.matchingJobs.reduce((best, current) => 
      current.matchingScore > best.matchingScore ? current : best
    );
    console.log(`\nBest Match: ${bestMatch.jobId} with ${bestMatch.matchingScore}% score`);
    console.log('\n✅ Multiple matching test successful\n');
    return true;
  } catch (error) {
    console.error('❌ Error in matching:', error.message);
    return false;
  }
}

// Test 5: Extract years of experience from different formats
console.log('TEST 5: Years of Experience Extraction - Various Formats');
console.log('-'.repeat(80));

async function testExperienceExtraction() {
  const testCases = [
    { text: 'Software Engineer with 5+ years of experience', expected: 5 },
    { text: 'Fresher, Entry-Level position', expected: 0 },
    { text: '7 years of professional experience', expected: 7 },
    { text: 'Senior Developer (2015-2023)', expected: 8 },
    { text: 'Experience: 3.5 years in development', expected: 3.5 }
  ];

  let passed = 0;
  for (const testCase of testCases) {
    const parsed = await parseResume(testCase.text);
    const success = parsed.yearOfExperience === testCase.expected;
    const status = success ? '✓' : '✗';
    console.log(`${status} "${testCase.text}"`);
    console.log(`  Expected: ${testCase.expected}, Got: ${parsed.yearOfExperience}`);
    if (success) passed++;
  }

  console.log(`\n${passed}/${testCases.length} tests passed\n`);
  return passed === testCases.length;
}

// Test 6: Extract salary from different formats
console.log('TEST 6: Salary Extraction - Various Formats');
console.log('-'.repeat(80));

async function testSalaryExtraction() {
  const testCases = [
    { text: 'Salary: $120,000 per annum', expected: true },
    { text: 'CTC: ₹50,00,000 per annum', expected: true },
    { text: 'Pay range: $100,000 - $150,000', expected: true },
    { text: '12 LPA', expected: true },
    { text: 'No salary information provided', expected: false }
  ];

  let passed = 0;
  for (const testCase of testCases) {
    const parsed = await parseResume(testCase.text);
    const hasSalary = parsed.salary !== null;
    const success = hasSalary === testCase.expected;
    const status = success ? '✓' : '✗';
    console.log(`${status} "${testCase.text}"`);
    console.log(`  Expected salary: ${testCase.expected ? 'Found' : 'Not found'}, Got: ${parsed.salary || 'Not found'}`);
    if (success) passed++;
  }

  console.log(`\n${passed}/${testCases.length} tests passed\n`);
  return passed === testCases.length;
}

// Test 7: Generate complete output JSON
console.log('TEST 7: Complete Output JSON Generation');
console.log('-'.repeat(80));

async function testCompleteOutput() {
  const resume = sampleResumes.resume1;
  const jd = sampleJDs.jd002;

  try {
    const result = await processResumeAndJDs(resume.text, [jd.text], [jd.jobId]);
    
    // Verify output structure
    const requiredFields = ['name', 'salary', 'yearOfExperience', 'resumeSkills', 'matchingJobs'];
    const jobFields = ['jobId', 'role', 'aboutRole', 'skillsAnalysis', 'matchingScore', 'fullDescription'];
    const skillFields = ['skill', 'presentInResume'];

    let structureValid = true;
    
    // Check top-level fields
    requiredFields.forEach(field => {
      if (!(field in result)) {
        console.log(`✗ Missing field: ${field}`);
        structureValid = false;
      }
    });

    // Check job fields
    if (result.matchingJobs.length > 0) {
      const job = result.matchingJobs[0];
      jobFields.forEach(field => {
        if (!(field in job)) {
          console.log(`✗ Missing job field: ${field}`);
          structureValid = false;
        }
      });

      // Check skills analysis structure
      if (job.skillsAnalysis.length > 0) {
        const skill = job.skillsAnalysis[0];
        skillFields.forEach(field => {
          if (!(field in skill)) {
            console.log(`✗ Missing skill field: ${field}`);
            structureValid = false;
          }
        });
      }
    }

    if (structureValid) {
      console.log('✓ Output structure is valid');
      console.log('\nSample JSON Output:');
      console.log(JSON.stringify(result, null, 2).substring(0, 500) + '...\n');
      console.log('✅ Complete output test successful\n');
      return true;
    } else {
      console.log('❌ Output structure is invalid\n');
      return false;
    }
  } catch (error) {
    console.error('❌ Error generating output:', error.message);
    return false;
  }
}

// Run all tests
console.log('Running test suite...\n');

async function runTests() {
  const results = {
    'Resume Parsing': await testResumeParsing(),
    'JD Parsing': testJDParsing(),
    'Single Matching': await testSingleMatching(),
    'Multiple Matching': await testMultipleMatching(),
    'Experience Extraction': await testExperienceExtraction(),
    'Salary Extraction': await testSalaryExtraction(),
    'Complete Output': await testCompleteOutput()
  };

  // Summary
  console.log('='.repeat(80));
  console.log('TEST SUMMARY');
  console.log('='.repeat(80));

  let totalPassed = 0;
  let totalTests = Object.keys(results).length;

  Object.entries(results).forEach(([testName, passed]) => {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${testName}`);
    if (passed) totalPassed++;
  });

  console.log('-'.repeat(80));
  console.log(`Total: ${totalPassed}/${totalTests} tests passed`);

  if (totalPassed === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED! System is working correctly.\n');
  } else {
    console.log(`\n⚠️  ${totalTests - totalPassed} test(s) failed. Review the output above.\n`);
  }

  console.log('='.repeat(80) + '\n');
}

// Execute suite
runTests().catch(console.error);
