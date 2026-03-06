/**
 * Express API for Resume Matching System
 */

const express = require('express');
const path = require('path');
const { processResumeAndJDs, parseResume, parseJobDescription } = require('./engine');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files (web UI)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve static files (web UI)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Home page - send static file directly
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).json({ error: 'Failed to load home page' });
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Resume Matcher API is running' });
});

/**
 * POST /api/match
 * Match a resume against job descriptions
 * Body: {
 *   resume: "resume text",
 *   jobDescriptions: ["jd text 1", "jd text 2"],
 *   jobIds: ["JD001", "JD002"] (optional)
 * }
 */
app.post('/api/match', (req, res) => {
  try {
    const { resume, jobDescriptions, jobIds } = req.body;

    if (!resume || !jobDescriptions || !Array.isArray(jobDescriptions)) {
      return res.status(400).json({
        error: 'Missing or invalid fields. Required: resume (string), jobDescriptions (array)'
      });
    }

    if (jobDescriptions.length === 0) {
      return res.status(400).json({
        error: 'At least one job description is required'
      });
    }

    const result = processResumeAndJDs(resume, jobDescriptions, jobIds);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/parse-resume
 * Parse a resume without matching
 */
app.post('/api/parse-resume', (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({
        error: 'Resume text is required'
      });
    }

    const result = parseResume(resume);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/parse-jd
 * Parse a job description without matching
 */
app.post('/api/parse-jd', (req, res) => {
  try {
    const { jobDescription, jobId } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        error: 'Job description text is required'
      });
    }

    const result = parseJobDescription(jobDescription, jobId);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/docs
 * API documentation
 */
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'Resume Matching System API',
    version: '1.0.0',
    endpoints: [
      {
        method: 'POST',
        path: '/api/match',
        description: 'Match a resume against job descriptions',
        body: {
          resume: 'string (resume text)',
          jobDescriptions: 'array of strings (JD texts)',
          jobIds: 'array of strings (optional job IDs)'
        }
      },
      {
        method: 'POST',
        path: '/api/parse-resume',
        description: 'Parse a resume without matching',
        body: {
          resume: 'string (resume text)'
        }
      },
      {
        method: 'POST',
        path: '/api/parse-jd',
        description: 'Parse a job description',
        body: {
          jobDescription: 'string (JD text)',
          jobId: 'string (optional)'
        }
      },
      {
        method: 'GET',
        path: '/health',
        description: 'Health check'
      },
      {
        method: 'GET',
        path: '/api/docs',
        description: 'API documentation'
      }
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found. Use GET /api/docs for documentation'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Resume Matcher API running on http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api/docs`);
});

module.exports = app;
