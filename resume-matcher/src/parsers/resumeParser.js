/**
 * Resume Parser Module
 * Extracts structured information from resume text
 */

const { extractName, extractEmail, extractPhone, extractSalary, extractYearsOfExperience } = require('../utils/extractors');
const { normalizeSkill, isKnownSkill } = require('../utils/skillDatabase');

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
 * @param {string} resumeText - Complete resume text
 * @returns {object} Parsed resume data
 */
function parseResume(resumeText) {
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
 * @param {string[]} resumeTexts - Array of resume texts
 * @returns {object[]} Array of parsed resume data
 */
function parseMultipleResumes(resumeTexts) {
  return resumeTexts.map(text => parseResume(text));
}

module.exports = {
  parseResume,
  parseMultipleResumes,
  extractSkillsFromResume
};
