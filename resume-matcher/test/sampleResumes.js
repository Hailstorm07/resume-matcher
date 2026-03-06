/**
 * Sample Resumes for Testing
 * Different candidates with varying skill matches
 */

const sampleResumes = {
  // Perfect match for JD002 (Capgemini - Java/Spring Boot/React)
  resume1: {
    name: 'Alex Kumar',
    text: `ALEX KUMAR
Email: alex.kumar@email.com
Phone: (555) 234-5678

Professional Summary:
Highly skilled Software Engineer with 7+ years of hands-on experience developing enterprise applications using Java and Spring Boot. Expert in modern web development with React and Angular. Strong background in microservices architecture, Kafka streaming, REST API development, and containerization with Docker and Kubernetes. Proven experience in Core Banking domain.

Technical Skills:
Languages: Java, Python, JavaScript, TypeScript
Frameworks: Spring Boot, React, Angular, Express.js
Databases: Microsoft SQL Server, NoSQL, MongoDB, PostgreSQL
Messaging: Kafka, RabbitMQ
Containerization: Docker, Kubernetes
Cloud: AWS, Azure
API Design: REST, GraphQL
DevOps: CI/CD, Jenkins, TeamCity
Domain Knowledge: Core Banking, Financial Services, Wealth Management

Professional Experience:
Senior Software Engineer - TechCorp (2018-Present) [7 years total experience]
- Architected and developed microservices using Spring Boot and Java
- Implemented REST APIs with Spring Framework
- Designed and implemented Kafka-based event streaming solutions
- Containerized applications using Docker
- Orchestrated Kubernetes clusters for production deployments
- Maintained Microsoft SQL Server and NoSQL databases
- Led team of 3 developers in Agile environment
- Banking and Financial domain expertise

Software Engineer - DataSystems Inc (2016-2018)
- Full-stack development with React and Angular
- REST API development and integration
- Database design with PostgreSQL
- CI/CD pipeline implementation using Jenkins

Junior Developer - StartupXyz (2015-2016)
- Web development with React
- Database fundamentals

Education:
Bachelor's in Computer Science, State University (2015)

Certifications:
- Spring Professional Developer
- Docker Certified Associate
`
  },

  // Good match for JD001 (Riverside - C++/Python/Linux/HPC)
  resume2: {
    name: 'Dr. Sarah Chen',
    text: `DR. SARAH CHEN
Email: sarah.chen@email.com
Phone: (555) 345-6789

Professional Summary:
PhD Research Scientist with 6+ years of experience in high-performance computing and scientific simulation development. Strong background in C++, Python, and Unix/Linux systems. Expertise in parallel programming with MPI and OpenMP. Published researcher in computational electromagnetics field.

Technical Skills:
Languages: C++, Python, Fortran, C, Bash/Shell
Operating Systems: Linux, Unix, Windows
High-Performance Computing: MPI, OpenMP, Parallel Programming
Scientific Computing: Numerical Methods, Linear Algebra
Simulation: Finite Element Methods, Electromagnetic Simulation
Testing: Unit Testing, Verification & Validation
Version Control: Git, GitHub
Methodologies: SDLC, Agile, TDD

Professional Experience:
Senior Research Scientist - NationalLabs (2019-Present) [6 years since PhD completion]
- Developed high-performance scientific simulation codes in C++ and Python
- Implemented parallel algorithms using MPI and OpenMP
- Linux/Unix system programming and optimization
- Code review and quality assurance
- Mentored junior developers in scientific computing
- Experience with electromagnetic simulation tools
- Cross-platform development (Windows and Linux)

Research Associate - Academic Institution (2017-2019)
- Python scientific computing
- Unix shell scripting for automation
- Design and testing of numerical algorithms

Education:
PhD in Computational Science, top university (2017)
Bachelor's in Physics, State University (2013)

Publications:
- 12+ peer-reviewed papers in computational electromagnetics
- Contributor to open-source scientific projects

Security Clearance: Currently pursuing Top Secret clearance
`
  },

  // Good match for JD003 (Adobe - 5-7 years Python/Java/C++)
  resume3: {
    name: 'Michael Johnson',
    text: `MICHAEL JOHNSON
Email: michael.johnson@email.com
Phone: (555) 456-7890

Professional Summary:
Experienced Software Engineer with 6 years of hands-on expertise in full-stack development. Proficient in multiple programming languages including Python, Java, and C++. Strong experience with modern web frameworks, cloud platforms, and DevOps practices. Passionate about writing high-quality, maintainable code and solving complex problems.

Technical Skills:
Languages: Python, Java, C++, JavaScript, TypeScript
Web Frameworks: React, Angular, Spring Boot, Flask, Django
Databases: PostgreSQL, MySQL, MongoDB
Cloud & DevOps: AWS, Docker, CI/CD pipelines
AI/ML: TensorFlow, Scikit-learn, Machine Learning basics
APIs: REST APIs, GraphQL, gRPC
Frontend: React, Angular, jQuery, HTML5, CSS3
Testing: Unit Testing, Integration Testing, Pytest, Jest
Developer Tools: Git, JIRA, Linux

Professional Experience:
Senior Developer - TechVenture (2020-Present) [6 years total experience]
- Developed high-performance Python applications
- Java backend development with Spring Boot framework
- Created responsive web interfaces using React and Angular
- Implemented REST APIs with proper documentation
- Code reviews and mentoring junior developers
- Improved code quality and test coverage
- AWS deployment and DevOps practices
- CI/CD pipeline improvements

Software Engineer - WebSolutions (2018-2020)
- Full-stack web development
- Python Flask development
- Frontend design with React and jQuery
- Database design and optimization

Junior Developer - StartupA (2017-2018)
- Web development fundamentals
- Basic Python scripting
- HTML/CSS/JavaScript

Education:
Bachelor's in Computer Science, Tech University (2017)

Additional:
- Strong problem-solving and debugging skills
- Experience with SaaS environment
- Customer-focused approach to development
`
  },

  // Good match for JD004 (Astra - Python/APIs/Cloud/Docker)
  resume4: {
    name: 'James Lee',
    text: `JAMES LEE
Email: james.lee@email.com
Phone: (555) 567-8901

Professional Summary:
Skilled Software Engineer with 5+ years of production-level Python development and system design experience. Expertise in building scalable cloud-native applications, data pipelines, and real-time systems. Strong background with Kubernetes, Docker, AWS, and API design. Proven ability to work in high-stakes environments with complex technical requirements.

Technical Skills:
Languages: Python, Go, TypeScript, C++, Bash
APIs: REST, gRPC, Protocol Buffers, JSON, YAML
Cloud Services: AWS (EC2, S3, Lambda), Kubernetes, Docker
Data Systems: Time-series databases, Event streaming, Data pipelines
DevOps: CI/CD, GitHub Actions, Infrastructure as Code
Testing: Unit testing, Integration testing, Load testing
System Design: Microservices, Data pipelines, Real-time systems

Professional Experience:
Senior Software Engineer - CloudSystems Inc (2020-Present) [5+ years total experience]
- Developed Python-based automation systems for complex infrastructure
- Built real-time telemetry and monitoring tools
- REST and gRPC API development and deployment
- Kubernetes cluster management and container orchestration
- AWS cloud platform expertise
- Data pipeline design for time-series data processing
- Cross-functional collaboration with operations teams
- High-reliability system development

Software Engineer - DataOps Co (2018-2020) [during these years]
- Python application development
- Docker containerization
- AWS infrastructure management
- RESTful API design

Junior Developer - TechStartup (2017-2018)
- Python scripting and automation
- Basic cloud platform usage

Education:
Bachelor's in Computer Science, University of Tech (2017)

Open Source:
- Contributor to Kubernetes projects
- Published several utility tools on GitHub
- Active in technical community

Additional Strengths:
- Strong communication and teamwork abilities
- Proactive problem solver
- Experience in fast-paced environments
`
  },

  // Partial match (fewer skills)
  resume5: {
    name: 'Emma Wilson',
    text: `EMMA WILSON
Email: emma.wilson@email.com
Phone: (555) 678-9012

Professional Summary:
Software Developer with 3 years of experience in web application development. Familiar with multiple programming languages and modern development practices.

Technical Skills:
Languages: JavaScript, Java, Python
Frameworks: React, Spring Boot
Databases: PostgreSQL, MongoDB
Tools: Git, Docker
Other: HTML5, CSS3, REST APIs, Agile

Work Experience:
Software Developer - WebDev Co (2021-Present)
- Built web applications using React
- Java backend with Spring framework
- REST API development

Junior Developer - TechCorp (2020-2021)
- Web development with JavaScript
- Basic Python scripting

Education:
Bachelor's in Information Technology, State College (2020)
`
  }
};

module.exports = { sampleResumes };
