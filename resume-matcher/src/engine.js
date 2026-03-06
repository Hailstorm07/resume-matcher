/**
 * Main processing engine that combines parsing and matching
 */

const { parseResume, parseMultipleResumes } = require('./parsers/resumeParser');
const { parseJobDescription, parseMultipleJobDescriptions } = require('./parsers/jobDescriptionParser');
const { matchResumeWithJD, matchResumeWithMultipleJDs } = require('./matchers/skillMatcher');

/**
 * Complete resume matching workflow
 * @param {string} resumeText - Resume text
 * @param {string[]} jobDescriptionTexts - Array of JD texts
 * @param {string[]} jobIds - Optional array of job IDs
 * @returns {object} Complete matching result in required format
 */
function processResumeAndJDs(resumeText, jobDescriptionTexts, jobIds = null) {
  // Parse resume
  const parsedResume = parseResume(resumeText);

  // Parse job descriptions
  const jdData = jobDescriptionTexts.map((text, index) => ({
    text: text,
    jobId: jobIds && jobIds[index] ? jobIds[index] : `JD${String(index).padStart(3, '0')}`
  }));
  const parsedJDs = parseMultipleJobDescriptions(jdData);

  // Match resume with all JDs
  const matches = matchResumeWithMultipleJDs(parsedResume, parsedJDs);

  // Build output in required format
  const output = {
    name: parsedResume.name,
    email: parsedResume.email,
    phone: parsedResume.phone,
    salary: parsedResume.salary,
    yearOfExperience: parsedResume.yearOfExperience,
    resumeSkills: parsedResume.resumeSkills,
    matchingJobs: matches.map(match => ({
      jobId: match.jobId,
      role: match.role,
      aboutRole: match.aboutRole,
      skillsAnalysis: match.skillsAnalysis,
      matchingScore: match.matchingScore
    }))
  };

  return output;
}

/**
 * Batch process multiple resumes against multiple JDs
 * @param {string[]} resumeTexts - Array of resume texts
 * @param {string[]} jobDescriptionTexts - Array of JD texts
 * @returns {object[]} Array of processing results
 */
function batchProcessResumes(resumeTexts, jobDescriptionTexts) {
  const parsedResumes = parseMultipleResumes(resumeTexts);
  const jdData = jobDescriptionTexts.map((text, index) => ({
    text: text,
    jobId: `JD${String(index).padStart(3, '0')}`
  }));
  const parsedJDs = parseMultipleJobDescriptions(jdData);

  const results = parsedResumes.map(resume => {
    const matches = matchResumeWithMultipleJDs(resume, parsedJDs);
    
    return {
      name: resume.name,
      email: resume.email,
      phone: resume.phone,
      salary: resume.salary,
      yearOfExperience: resume.yearOfExperience,
      resumeSkills: resume.resumeSkills,
      matchingJobs: matches.map(match => ({
        jobId: match.jobId,
        role: match.role,
        aboutRole: match.aboutRole,
        skillsAnalysis: match.skillsAnalysis,
        matchingScore: match.matchingScore
      }))
    };
  });

  return results;
}

module.exports = {
  processResumeAndJDs,
  batchProcessResumes,
  parseResume,
  parseJobDescription
};
