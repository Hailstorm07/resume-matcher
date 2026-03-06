/**
 * Generate Sample Output JSON
 * Creates example output files showing the expected JSON format
 */

const { processResumeAndJDs } = require('../src/engine');
const { sampleResumes } = require('./sampleResumes');
const { sampleJDs } = require('./sampleJobDescriptions');
const fs = require('fs');
const path = require('path');

console.log('\n' + '='.repeat(80));
console.log('GENERATING SAMPLE OUTPUT JSON FILES');
console.log('='.repeat(80) + '\n');

// Generate output for each resume against all JDs
const outputDir = path.join(__dirname, '..', 'outputs');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Test 1: Alex Kumar (Perfect match for JD002)
console.log('1. Generating output for Alex Kumar matching against all JDs...');
try {
  const resume1 = sampleResumes.resume1;
  const allJDTexts = Object.values(sampleJDs).map(jd => jd.text);
  const allJobIds = Object.values(sampleJDs).map(jd => jd.jobId);
  
  const result1 = processResumeAndJDs(resume1.text, allJDTexts, allJobIds);
  
  const outputPath1 = path.join(outputDir, 'sample_output_alex_kumar.json');
  fs.writeFileSync(outputPath1, JSON.stringify(result1, null, 2));
  console.log(`   ✓ Saved to: ${outputPath1}`);
  console.log(`   - Name: ${result1.name}`);
  console.log(`   - Experience: ${result1.yearOfExperience} years`);
  console.log(`   - Skills found: ${result1.resumeSkills.length}`);
  console.log(`   - Job matches: ${result1.matchingJobs.length}`);
  
  // Show best matches
  const sorted = [...result1.matchingJobs].sort((a, b) => b.matchingScore - a.matchingScore);
  console.log(`   - Top 3 matches:`);
  sorted.slice(0, 3).forEach((job, idx) => {
    console.log(`     ${idx + 1}. ${job.jobId}: ${job.role} (${job.matchingScore}%)`);
  });
} catch (error) {
  console.error('   ❌ Error:', error.message);
}

console.log('');

// Test 2: Dr. Sarah Chen (Match for scientific/HPC roles)
console.log('2. Generating output for Dr. Sarah Chen matching against all JDs...');
try {
  const resume2 = sampleResumes.resume2;
  const allJDTexts = Object.values(sampleJDs).map(jd => jd.text);
  const allJobIds = Object.values(sampleJDs).map(jd => jd.jobId);
  
  const result2 = processResumeAndJDs(resume2.text, allJDTexts, allJobIds);
  
  const outputPath2 = path.join(outputDir, 'sample_output_sarah_chen.json');
  fs.writeFileSync(outputPath2, JSON.stringify(result2, null, 2));
  console.log(`   ✓ Saved to: ${outputPath2}`);
  console.log(`   - Name: ${result2.name}`);
  console.log(`   - Experience: ${result2.yearOfExperience} years`);
  console.log(`   - Skills found: ${result2.resumeSkills.length}`);
  console.log(`   - Job matches: ${result2.matchingJobs.length}`);
  
  // Show best matches
  const sorted = [...result2.matchingJobs].sort((a, b) => b.matchingScore - a.matchingScore);
  console.log(`   - Top 3 matches:`);
  sorted.slice(0, 3).forEach((job, idx) => {
    console.log(`     ${idx + 1}. ${job.jobId}: ${job.role} (${job.matchingScore}%)`);
  });
} catch (error) {
  console.error('   ❌ Error:', error.message);
}

console.log('');

// Test 3: Michael Johnson (General purpose match)
console.log('3. Generating output for Michael Johnson matching against all JDs...');
try {
  const resume3 = sampleResumes.resume3;
  const allJDTexts = Object.values(sampleJDs).map(jd => jd.text);
  const allJobIds = Object.values(sampleJDs).map(jd => jd.jobId);
  
  const result3 = processResumeAndJDs(resume3.text, allJDTexts, allJobIds);
  
  const outputPath3 = path.join(outputDir, 'sample_output_michael_johnson.json');
  fs.writeFileSync(outputPath3, JSON.stringify(result3, null, 2));
  console.log(`   ✓ Saved to: ${outputPath3}`);
  console.log(`   - Name: ${result3.name}`);
  console.log(`   - Experience: ${result3.yearOfExperience} years`);
  console.log(`   - Skills found: ${result3.resumeSkills.length}`);
  console.log(`   - Job matches: ${result3.matchingJobs.length}`);
  
  // Show best matches
  const sorted = [...result3.matchingJobs].sort((a, b) => b.matchingScore - a.matchingScore);
  console.log(`   - Top 3 matches:`);
  sorted.slice(0, 3).forEach((job, idx) => {
    console.log(`     ${idx + 1}. ${job.jobId}: ${job.role} (${job.matchingScore}%)`);
  });
} catch (error) {
  console.error('   ❌ Error:', error.message);
}

console.log('');

// Test 4: James Lee (Python/DevOps focused)
console.log('4. Generating output for James Lee matching against all JDs...');
try {
  const resume4 = sampleResumes.resume4;
  const allJDTexts = Object.values(sampleJDs).map(jd => jd.text);
  const allJobIds = Object.values(sampleJDs).map(jd => jd.jobId);
  
  const result4 = processResumeAndJDs(resume4.text, allJDTexts, allJobIds);
  
  const outputPath4 = path.join(outputDir, 'sample_output_james_lee.json');
  fs.writeFileSync(outputPath4, JSON.stringify(result4, null, 2));
  console.log(`   ✓ Saved to: ${outputPath4}`);
  console.log(`   - Name: ${result4.name}`);
  console.log(`   - Experience: ${result4.yearOfExperience} years`);
  console.log(`   - Skills found: ${result4.resumeSkills.length}`);
  console.log(`   - Job matches: ${result4.matchingJobs.length}`);
  
  // Show best matches
  const sorted = [...result4.matchingJobs].sort((a, b) => b.matchingScore - a.matchingScore);
  console.log(`   - Top 3 matches:`);
  sorted.slice(0, 3).forEach((job, idx) => {
    console.log(`     ${idx + 1}. ${job.jobId}: ${job.role} (${job.matchingScore}%)`);
  });
} catch (error) {
  console.error('   ❌ Error:', error.message);
}

console.log('');

// Create a comprehensive example output showing expected JSON structure
console.log('5. Generating comprehensive example output with detailed structure...');
try {
  const resume = sampleResumes.resume1;
  const jd = sampleJDs.jd002;
  
  const result = processResumeAndJDs(resume.text, [jd.text], [jd.jobId]);
  
  // Create a detailed example that would match the assignment requirements
  const detailedExample = {
    name: result.name,
    email: result.email,
    phone: result.phone,
    salary: result.salary || "Not specified in resume",
    yearOfExperience: result.yearOfExperience,
    resumeSkills: result.resumeSkills,
    matchingJobs: result.matchingJobs.map(job => ({
      jobId: job.jobId,
      role: job.role || "Software Engineer",
      aboutRole: job.aboutRole || "High-demand engineering position",
      skillsAnalysis: job.skillsAnalysis,
      matchingScore: job.matchingScore,
      summary: {
        totalRequiredSkills: job.skillsAnalysis.length,
        matchedSkills: job.skillsAnalysis.filter(s => s.presentInResume).length,
        unmatchedSkills: job.skillsAnalysis.filter(s => !s.presentInResume).map(s => s.skill)
      }
    }))
  };
  
  const detailPath = path.join(outputDir, 'sample_output_DETAILED_EXAMPLE.json');
  fs.writeFileSync(detailPath, JSON.stringify(detailedExample, null, 2));
  console.log(`   ✓ Saved detailed example to: ${detailPath}`);
} catch (error) {
  console.error('   ❌ Error:', error.message);
}

console.log('');

// Summary
console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log(`✓ Generated 5 sample output JSON files in: ${outputDir}`);
console.log('\nFiles created:');
console.log('  1. sample_output_alex_kumar.json');
console.log('  2. sample_output_sarah_chen.json');
console.log('  3. sample_output_michael_johnson.json');
console.log('  4. sample_output_james_lee.json');
console.log('  5. sample_output_DETAILED_EXAMPLE.json');
console.log('\nOutput JSON Format includes:');
console.log('  - name: Candidate name');
console.log('  - email: Candidate email');
console.log('  - phone: Candidate phone');
console.log('  - salary: Extracted salary or null');
console.log('  - yearOfExperience: Total years of experience (numeric)');
console.log('  - resumeSkills: Array of extracted skills from resume');
console.log('  - matchingJobs: Array of job matches with:');
console.log('    - jobId: Unique job identifier');
console.log('    - role: Job title/role');
console.log('    - aboutRole: Job description summary');
console.log('    - skillsAnalysis: Array of skill matches with presence flags');
console.log('    - matchingScore: Percentage match (0-100)');
console.log('\n' + '='.repeat(80) + '\n');
