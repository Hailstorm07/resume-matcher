/**
 * Skill Matcher Module
 * Matches resume skills against job description skills
 */

const { normalizeSkill } = require('../utils/skillDatabase');

/**
 * Calculate similarity between two skills using Levenshtein distance
 * @param {string} skill1 - First skill
 * @param {string} skill2 - Second skill
 * @returns {number} Similarity score (0-1)
 */
function calculateSkillSimilarity(skill1, skill2) {
  const s1 = normalizeSkill(skill1);
  const s2 = normalizeSkill(skill2);

  if (s1 === s2) return 1;

  // Check if one is substring of other
  if (s1.includes(s2) || s2.includes(s1)) {
    return Math.max(s1.length, s2.length) > 0 
      ? Math.min(s1.length, s2.length) / Math.max(s1.length, s2.length)
      : 0;
  }

  // Levenshtein distance
  const matrix = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(0));

  for (let i = 0; i <= s1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= s2.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= s2.length; j++) {
    for (let i = 1; i <= s1.length; i++) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }

  const distance = matrix[s2.length][s1.length];
  const maxLength = Math.max(s1.length, s2.length);
  
  return Math.max(0, 1 - (distance / maxLength));
}

/**
 * Match a single resume skill against JD skills
 * @param {string} resumeSkill - Skill from resume
 * @param {string[]} jdSkills - Array of JD skills
 * @param {number} threshold - Similarity threshold (0-1)
 * @returns {boolean} True if skill matches
 */
function matchSkill(resumeSkill, jdSkills, threshold = 0.85) {
  for (const jdSkill of jdSkills) {
    const similarity = calculateSkillSimilarity(resumeSkill, jdSkill);
    if (similarity >= threshold) {
      return true;
    }
  }
  return false;
}

/**
 * Escape regex special characters
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Match all resume skills against JD skills
 * @param {string[]} resumeSkills - Array of skills from resume
 * @param {string[]} jdSkills - Array of skills from JD
 * @returns {object[]} Array of skill analysis with presence flag
 */
function analyzeSkills(resumeSkills, jdSkills) {
  const skillsAnalysis = [];

  for (const jdSkill of jdSkills) {
    const isPresent = matchSkill(jdSkill, resumeSkills);
    skillsAnalysis.push({
      skill: jdSkill,
      presentInResume: isPresent
    });
  }

  return skillsAnalysis;
}

/**
 * Calculate matching score based on skill match
 * @param {object[]} skillsAnalysis - Array of skill analysis objects
 * @returns {number} Matching score (0-100)
 */
function calculateMatchingScore(skillsAnalysis) {
  if (!skillsAnalysis || skillsAnalysis.length === 0) {
    return 0;
  }

  const matchedCount = skillsAnalysis.filter(s => s.presentInResume).length;
  const totalCount = skillsAnalysis.length;

  const score = (matchedCount / totalCount) * 100;
  return Math.round(score * 100) / 100; // Round to 2 decimals
}

/**
 * Match resume with job description
 * @param {object} parsedResume - Parsed resume object
 * @param {object} parsedJD - Parsed job description object
 * @returns {object} Match result with analysis and score
 */
function matchResumeWithJD(parsedResume, parsedJD) {
  const skillsAnalysis = analyzeSkills(parsedResume.resumeSkills, parsedJD.requiredSkills);
  const matchingScore = calculateMatchingScore(skillsAnalysis);

  return {
    jobId: parsedJD.jobId,
    role: parsedJD.role,
    aboutRole: parsedJD.aboutRole,
    skillsAnalysis: skillsAnalysis,
    matchingScore: matchingScore,
    matchedSkillsCount: skillsAnalysis.filter(s => s.presentInResume).length,
    totalRequiredSkills: skillsAnalysis.length,
    optionalSkills: parsedJD.optionalSkills
  };
}

/**
 * Match resume against multiple job descriptions
 * @param {object} parsedResume - Parsed resume
 * @param {object[]} parsedJDs - Array of parsed job descriptions
 * @returns {object[]} Array of match results
 */
function matchResumeWithMultipleJDs(parsedResume, parsedJDs) {
  return parsedJDs.map(jd => matchResumeWithJD(parsedResume, jd));
}

module.exports = {
  matchSkill,
  analyzeSkills,
  calculateMatchingScore,
  matchResumeWithJD,
  matchResumeWithMultipleJDs,
  calculateSkillSimilarity
};
