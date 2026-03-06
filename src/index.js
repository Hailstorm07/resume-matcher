/**
 * Main CLI entry point
 */

const { processResumeAndJDs } = require('./engine');
const fs = require('fs');
const path = require('path');

// Sample resume and JDs for testing
const sampleResume = `
John Doe
Email: john.doe@example.com
Phone: (555) 123-4567

Professional Summary:
Experienced Software Engineer with 5+ years of experience developing scalable web applications using Java, Spring Boot, and microservices architecture. Proficient in Python, Docker, and Kubernetes. Strong background in REST API development and cloud-native applications.

Skills:
- Languages: Java, Python, JavaScript, TypeScript, C++
- Frameworks: Spring Boot, React, Angular, Node.js, FastAPI
- Databases: MySQL, PostgreSQL, MongoDB, Redis
- DevOps: Docker, Kubernetes, Jenkins, CI/CD, AWS, Azure
- Tools: Git, GitHub, JIRA, Kafka, Apache Spark
- Methodologies: Agile, Scrum, TDD, Microservices

Experience:
Senior Software Engineer (2020-Present)
- Developed microservices using Spring Boot and Java
- Implemented REST APIs and gRPC services
- Managed Docker containers and Kubernetes clusters
- Experience with Kafka for event streaming

Software Engineer (2018-2020)
- Built full-stack applications using React and Node.js
- Database design and optimization with PostgreSQL
- Implemented CI/CD pipelines using Jenkins
- Python scripting for automation

Junior Developer (2016-2018)
- Web development with JavaScript and HTML/CSS
- MySQL database management
- Version control with Git

Education:
Bachelor's degree in Computer Science, State University (2016)
`;

const sampleJDs = [
  {
    text: `
Senior Software Engineer - Backend

Riverside Research is seeking a Software Engineer to support development of high-performance scientific simulation codes.

Position Overview:
The Applied Mathematics and Physics Solutions group is seeking a Scientific Programmer/Software Engineer to support development of high-performance large scale scientific simulation codes.

Responsibilities:
- Supports all aspects of the software development lifecycle from requirements, design, development, documentation, testing and debugging efficient scientific software applications
- Maintains code quality by participating in peer reviews and helping develop unit tests
- Applies new methods, algorithms, and evaluates conclusions
- Becomes a subject matter expert in computational methods, software engineering, high performance computing

Required Qualifications:
- Bachelor's with 5+ years of experience
- Applied programming experience with C, C++ and/or Fortran
- Applied software development on Linux or other Unix-like systems
- Experience with Python, Unix shell scripting
- Experienced with version control software applications
- Excellent interpersonal and communications skills

Desired Qualifications:
- Active Security Clearance
- Experience with parallel programming on high-performance computers (MPI and/or OpenMP)
- Experience developing cross-platform software
- Familiarity with linear algebra and numerical solutions techniques

Salary: $180,000 - $220,000
    `,
    jobId: 'JD001'
  },
  {
    text: `
Full Stack Software Engineer

Meta is seeking talented engineers to join our teams in building cutting-edge products that connect billions of people around the world.

The Opportunity:
As a Full Stack Software Engineer on our Build Reliability team, you will engage with other engineers to design, develop, and continuously improve software solutions.

Responsibilities:
- Design and develop code for large scale complex software solutions
- Lead and execute complex software projects
- Define software specifications and test plans
- Troubleshoot and improve complex systems

Requirements:
- Bachelor's degree in Computer Science or related field
- 5+ years of relevant experience in web applications development
- Expertise in C#, .NET, SQL, HTML, CSS, AngularJS, TypeScript
- Expertise in Python, PostgreSQL
- Deep understanding of object oriented programming and design principles
- Experience with testing, continuous integration, build, deployment

Preferred Skills:
- Experience with Docker and Kubernetes
- Experience scaling web applications and optimizing for performance
- Expertise in React or Angular
- Experience with DevOps

Compensation: $140,000 - $180,000 per year
    `,
    jobId: 'JD002'
  },
  {
    text: `
Software Engineer - Data Science

Adobe is seeking talented Software Engineers to help plan, design, develop, and test software systems.

What You'll Do:
- Develop high-performance, reliable, testable, and maintainable code
- Participate in all aspects of software development including design, coding, code review, testing
- Collaborate with engineers in daily standup and meetings
- Provide thoughtful feedback

What You Need:
- Bachelor's or Master's in Computer Science or equivalent experience
- 5-7+ years of relevant experience
- Proficient in Python, Java, C++
- Strong technical background with analytical and problem-solving skills
- Interest in AI/ML concepts and exposure to AI tools

Salary: $139,000 - $257,550 annually
    `,
    jobId: 'JD003'
  }
];

function main() {
  console.log('===== RESUME PARSING AND JOB MATCHING SYSTEM =====\n');
  
  try {
    // Process resume with JDs
    const result = processResumeAndJDs(
      sampleResume,
      sampleJDs.map(jd => jd.text),
      sampleJDs.map(jd => jd.jobId)
    );

    console.log('PARSED RESUME:');
    console.log('Name:', result.name);
    console.log('Email:', result.email);
    console.log('Phone:', result.phone);
    console.log('Salary:', result.salary);
    console.log('Years of Experience:', result.yearOfExperience);
    console.log('Skills:', result.resumeSkills.join(', '));
    console.log('\n');

    console.log('MATCHING RESULTS:\n');
    result.matchingJobs.forEach((job, index) => {
      console.log(`--- Job ${index + 1}: ${job.role} (${job.jobId}) ---`);
      console.log('About Role:', job.aboutRole);
      console.log('Matching Score:', job.matchingScore + '%');
      console.log('Skills Analysis:');
      
      const matchedSkills = job.skillsAnalysis.filter(s => s.presentInResume);
      const unmatchedSkills = job.skillsAnalysis.filter(s => !s.presentInResume);
      
      if (matchedSkills.length > 0) {
        console.log('  ✓ Matched:', matchedSkills.map(s => s.skill).join(', '));
      }
      if (unmatchedSkills.length > 0) {
        console.log('  ✗ Missing:', unmatchedSkills.map(s => s.skill).join(', '));
      }
      console.log('');
    });

    // Save output to file
    const outputPath = path.join(__dirname, '..', 'outputs', 'sample_output.json');
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log(`\nOutput saved to: ${outputPath}`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { sampleResume, sampleJDs };
