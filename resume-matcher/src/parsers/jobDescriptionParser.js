/**
 * Job Description Parser Module
 * Extracts structured information from job descriptions
 */

const { extractSalary, extractYearsOfExperience } = require('../utils/extractors');
const { normalizeSkill, isKnownSkill } = require('../utils/skillDatabase');

/**
 * Extract skills from job description text
 * @param {string} text - Job description text
 * @returns {object} Object with requiredSkills and optionalSkills
 */
function extractSkillsFromJD(text) {
  if (!text) return { requiredSkills: [], optionalSkills: [] };

  const requiredSkills = new Set();
  const optionalSkills = new Set();

  // Split text into sections
  const sections = text.split(/\n\n+/);
  let isOptionalSection = false;

  for (const section of sections) {
    // Detect optional section keywords
    if (/(?:desired|preferred|nice\s*to\s*have|optional|good\s*to\s*have)/gi.test(section)) {
      isOptionalSection = true;
    } else if (/(?:required|must\s*have|essential|mandatory|qualifications?)/gi.test(section)) {
      isOptionalSection = false;
    }

    // Extract individual words and check against skill database
    const words = section.split(/[\s,\-\/()]+/).filter(w => w.length > 0);
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      if (isKnownSkill(word)) {
        const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const skillMatch = text.match(new RegExp(`\\b${escapedWord}\\b`, 'gi'));
        if (skillMatch) {
          const skill = skillMatch[0];
          if (isOptionalSection) {
            optionalSkills.add(skill);
          } else {
            requiredSkills.add(skill);
          }
        }
      }

      // Check for multi-word skills
      if (i < words.length - 1) {
        const twoWord = `${word} ${words[i + 1]}`;
        if (isKnownSkill(twoWord)) {
          const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const escapedWord2 = words[i + 1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`\\b${escapedWord}\\s+${escapedWord2}\\b`, 'gi');
          const match = text.match(regex);
          if (match) {
            if (isOptionalSection) {
              optionalSkills.add(match[0]);
            } else {
              requiredSkills.add(match[0]);
            }
          }
        }
      }
    }
  }

  return {
    requiredSkills: Array.from(requiredSkills),
    optionalSkills: Array.from(optionalSkills)
  };
}

/**
 * Extract job description summary
 * @param {string} text - Job description text
 * @returns {string} Summary of the role
 */
function extractJobSummary(text) {
  if (!text) return '';

  const lines = text.split('\n').filter(l => l.trim().length > 0);
  
  // Look for role/position overview sections
  let summary = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    
    if (/(?:overview|position|role|description|about|responsibility)/i.test(line)) {
      // Collect next few lines as summary
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        if (lines[j].trim().length > 10) {
          summary += lines[j].trim() + ' ';
        }
      }
      if (summary) break;
    }
  }

  // If no specific section found, use first substantial paragraph
  if (!summary) {
    for (const line of lines) {
      if (line.trim().length > 50 && !line.match(/^[a-z\s]*:/i)) {
        summary = line.trim();
        break;
      }
    }
  }

  return summary.trim().substring(0, 300); // Limit to 300 chars
}

/**
 * Extract job title/role from text
 * @param {string} text - Job description text
 * @returns {string|null} Job title or null
 */
function extractJobTitle(text) {
  if (!text) return null;

  const lines = text.split('\n');
  
  // Look for explicit role/position/title mention
  for (const line of lines) {
    const match = line.match(/(?:role|position|title|job|opening)[:\s]+([A-Za-z\s\-\/()]+)/i);
    if (match) {
      return match[1].trim();
    }
  }

  // Try to extract from first line if it looks like a title
  const firstLine = lines[0].trim();
  if (firstLine && firstLine.length < 100 && !firstLine.includes('.') && !firstLine.includes(',')) {
    return firstLine;
  }

  return null;
}

/**
 * Parse job description and extract all relevant information
 * @param {string} jdText - Complete job description text
 * @param {string} jobId - Unique job identifier
 * @returns {object} Parsed job description data
 */
function parseJobDescription(jdText, jobId = null) {
  if (!jdText || typeof jdText !== 'string') {
    throw new Error('Job description text must be a non-empty string');
  }

  const skills = extractSkillsFromJD(jdText);
  
  const parsed = {
    jobId: jobId || `JD${Date.now()}`,
    role: extractJobTitle(jdText),
    salary: extractSalary(jdText),
    yearsOfExperience: extractYearsOfExperience(jdText),
    requiredSkills: skills.requiredSkills,
    optionalSkills: skills.optionalSkills,
    aboutRole: extractJobSummary(jdText),
    rawText: jdText
  };

  return parsed;
}

/**
 * Parse multiple job descriptions
 * @param {object[]} jdData - Array of {text: string, jobId?: string}
 * @returns {object[]} Array of parsed job descriptions
 */
function parseMultipleJobDescriptions(jdData) {
  return jdData.map((jd, index) => 
    parseJobDescription(jd.text, jd.jobId || `JD${String(index).padStart(3, '0')}`)
  );
}

module.exports = {
  parseJobDescription,
  parseMultipleJobDescriptions,
  extractSkillsFromJD,
  extractJobSummary,
  extractJobTitle
};
