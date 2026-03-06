/**
 * Resume Parser Module
 * Extracts structured information from resume text
 */

const { extractName, extractEmail, extractPhone, extractSalary, extractYearsOfExperience } = require('../utils/extractors');
const { normalizeSkill, isKnownSkill } = require('../utils/skillDatabase');
const fs = require('fs');
const pdfParse = require('pdf-parse');

/**
 * Extract text from PDF buffer
 * @param {Buffer} pdfBuffer - PDF file buffer
 * @returns {Promise<string>} Extracted text
 */
async function extractTextFromPDF(pdfBuffer) {
  try {
    const data = await pdfParse(pdfBuffer);
    return data.text;
  } catch (error) {
    throw new Error('Failed to parse PDF: ' + error.message);
  }
}

/**
 * Extract skills from resume text using rule-based approach
 * @param {string} text - Resume text
 * @returns {string[]} Array of extracted skills
 */
function extractSkillsFromResume(text) {
  if (!text) return [];

  const skills = new Set();
  
  // Split text into sentences and words for analysis
  const words = text.split(/[\s,\-\/()]+/).filter(w => w.length > 0);
  
  // Look for known skills
  for (const word of words) {
    const normalized = normalizeSkill(word);
    if (isKnownSkill(word)) {
      // Preserve original case for multi-word skills
      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const skillMatch = text.match(new RegExp(`\\b${escapedWord}\\b`, 'gi'));
      if (skillMatch) {
        skills.add(skillMatch[0]);
      }
    }
  }

  // Look for multi-word skills
  const multiWordSkills = [
    'Spring Boot', 'Machine Learning', 'Deep Learning', 'Natural Language Processing',
    'Computer Vision', 'High Performance Computing', 'Real-time Systems', 'Version Control',
    'Unit Testing', 'Integration Testing', 'Cloud Computing', 'Agile', 'CI/CD',
    'Microservices', 'REST API', 'Web Services', 'Data Science', 'DevOps',
    'Full Stack', 'Front End', 'Back End', 'Embedded Systems', 'IoT'
  ];

  for (const skill of multiWordSkills) {
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedSkill}\\b`, 'gi');
    if (regex.test(text)) {
      const match = text.match(regex);
      if (match) {
        skills.add(match[0]);
      }
    }
  }

  return Array.from(skills);
}

/**
 * Parse resume text and extract all relevant information
 * @param {string|Buffer} resumeInput - Complete resume text or PDF buffer
 * @returns {Promise<object>} Parsed resume data
 */
async function parseResume(resumeInput) {
  if (!resumeInput) {
    throw new Error('Resume input must be provided');
  }

  let resumeText;

  // Handle PDF buffer
  if (Buffer.isBuffer(resumeInput)) {
    resumeText = await extractTextFromPDF(resumeInput);
  } else if (typeof resumeInput === 'string') {
    resumeText = resumeInput;
  } else {
    throw new Error('Resume input must be a string or Buffer');
  }

  if (!resumeText || typeof resumeText !== 'string') {
    throw new Error('Resume text must be a non-empty string');
  }

  const parsed = {
    name: extractName(resumeText),
    email: extractEmail(resumeText),
    phone: extractPhone(resumeText),
    salary: extractSalary(resumeText),
    yearOfExperience: extractYearsOfExperience(resumeText),
    resumeSkills: extractSkillsFromResume(resumeText),
    rawText: resumeText
  };

  return parsed;
}

/**
 * Parse multiple resumes
 * @param {string[]|Buffer[]} resumeInputs - Array of resume texts or PDF buffers
 * @returns {Promise<object[]>} Array of parsed resume data
 */
async function parseMultipleResumes(resumeInputs) {
  const promises = resumeInputs.map(input => parseResume(input));
  return await Promise.all(promises);
}

module.exports = {
  parseResume,
  parseMultipleResumes,
  extractSkillsFromResume,
  extractTextFromPDF
};
