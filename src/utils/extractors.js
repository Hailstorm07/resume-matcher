/**
 * Rule-based extractors for structured information from text
 */

/**
 * Extract salary from text
 * @param {string} text - Text containing salary information
 * @returns {string|null} Extracted salary or null
 */
function extractSalary(text) {
  if (!text) return null;

  // Patterns for salary extraction
  const patterns = [
    /salary[:\s]*[$£€₹]?\s*([0-9,]+(?:\.[0-9]{2})?)\s*(?:per\s*annum|annually|per year|LPA|yearly|p\.a\.)?/gi,
    /ctc[:\s]*[$£€₹]?\s*([0-9,]+(?:\.[0-9]{2})?)/gi,
    /[$£€₹]\s*([0-9,]+(?:\.[0-9]{2})?)\s*(?:per\s*annum|annually|per year|LPA|yearly)?/gi,
    /pay\s*(?:range|:)\s*(?:\$|£|€|₹)?\s*([0-9,]+)\s*-\s*(?:\$|£|€|₹)?\s*([0-9,]+)/gi,
    /([0-9,]+)\s*(?:LPA|per annum)/gi
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }

  return null;
}

/**
 * Extract years of experience from text
 * @param {string} text - Text containing experience information
 * @returns {number|null} Years of experience or null
 */
function extractYearsOfExperience(text) {
  if (!text) return null;

  // Check for fresher/entry-level
  if (/\b(fresher|entry[\s-]?level|0\s*(?:years?|yrs?))\b/gi.test(text)) {
    return 0;
  }

  // Patterns for explicit years
  const patterns = [
    /(\d+(?:\.\d+)?)\s*(?:\+)?\s*years?\s*of\s*(?:professional\s+)?experience/gi,
    /(\d+(?:\.\d+)?)\s*yrs?\b/gi,
    /(\d+(?:\.\d+)?)\s*years?/gi
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const years = parseFloat(match[1]);
      if (!isNaN(years) && years >= 0) {
        return years;
      }
    }
  }

  // Try to extract from date ranges (e.g., "2015-2023")
  const dateRangePattern = /(\d{4})\s*-\s*(?:(current|present)|\d{4})/gi;
  const dateMatches = text.matchAll(dateRangePattern);
  
  for (const match of dateMatches) {
    const startYear = parseInt(match[1]);
    const endYear = match[2] && (match[2].toLowerCase() === 'current' || match[2].toLowerCase() === 'present') 
      ? new Date().getFullYear() 
      : parseInt(match[2]);
    
    if (!isNaN(startYear) && !isNaN(endYear)) {
      const years = endYear - startYear;
      if (years >= 0) return years;
    }
  }

  return null;
}

/**
 * Extract name from text (typically first line or after "Name:" keyword)
 * @param {string} text - Text containing name
 * @returns {string|null} Extracted name or null
 */
function extractName(text) {
  if (!text) return null;

  const lines = text.split('\n');
  
  // Look for "Name:" pattern
  for (const line of lines) {
    const nameMatch = line.match(/^\s*name[:\s]+([A-Za-z\s\.]+)/i);
    if (nameMatch) {
      return nameMatch[1].trim();
    }
  }

  // First non-empty line might be the name
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && trimmed.length > 0 && trimmed.length < 100) {
      // Check if it looks like a name (no special chars, reasonable length)
      if (/^[A-Za-z\s\.]+$/.test(trimmed) && trimmed.split(/\s+/).length <= 4) {
        return trimmed;
      }
    }
  }

  return null;
}

/**
 * Extract email from text
 * @param {string} text - Text containing email
 * @returns {string|null} Extracted email or null
 */
function extractEmail(text) {
  if (!text) return null;

  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailPattern);
  
  return matches ? matches[0] : null;
}

/**
 * Extract phone number from text
 * @param {string} text - Text containing phone number
 * @returns {string|null} Extracted phone number or null
 */
function extractPhone(text) {
  if (!text) return null;

  const phonePatterns = [
    /(?:\+\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\b/g,
    /(?:\+\d{1,3}[-.\s]?)?\d{10,}/g
  ];

  for (const pattern of phonePatterns) {
    const matches = text.match(pattern);
    if (matches) {
      return matches[0];
    }
  }

  return null;
}

module.exports = {
  extractSalary,
  extractYearsOfExperience,
  extractName,
  extractEmail,
  extractPhone
};
