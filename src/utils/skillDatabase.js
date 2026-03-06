/**
 * Comprehensive skill database for matching and categorization
 */

const SKILLS_DATABASE = {
  // Programming Languages
  'programming_languages': [
    'Java', 'Python', 'C++', 'C#', 'JavaScript', 'TypeScript', 'Go', 'Rust',
    'Ruby', 'PHP', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Fortran',
    'Bash', 'Shell', 'PowerShell', 'Groovy', 'Perl', 'Lua', 'Haskell', 'Elixir'
  ],

  // Web Frameworks & Technologies
  'web_frameworks': [
    'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask',
    'Spring', 'Spring Boot', 'ASP.NET', '.NET', 'Laravel', 'Symfony', 'Rails',
    'FastAPI', 'Gin', 'Echo', 'NestJS'
  ],

  // Databases
  'databases': [
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Cassandra',
    'Oracle', 'SQL Server', 'MariaDB', 'DynamoDB', 'Firebase', 'Memcached',
    'UDBDB2', 'Neo4j', 'CouchDB', 'DuckDB'
  ],

  // Cloud & DevOps
  'cloud_devops': [
    'AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Jenkins',
    'GitLab', 'GitHub', 'Terraform', 'Ansible', 'CloudFormation',
    'CI/CD', 'DevOps', 'Helm', 'Docker Swarm', 'ECS', 'EKS'
  ],

  // Data & Analytics
  'data_analytics': [
    'Kafka', 'Spark', 'Hadoop', 'Apache Flink', 'Datadog', 'Kibana',
    'Logstash', 'ELK', 'Tableau', 'Power BI', 'Splunk', 'Prometheus',
    'Grafana', 'InfluxDB', 'Airflow'
  ],

  // APIs & Messaging
  'apis_messaging': [
    'REST', 'GraphQL', 'gRPC', 'SOAP', 'ActiveMQ', 'RabbitMQ', 'MQTT',
    'WebSocket', 'OAuth', 'JWT', 'OpenAPI', 'Protobuf'
  ],

  // Data Science & ML
  'data_science_ml': [
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn',
    'NLP', 'Computer Vision', 'AI', 'Keras', 'XGBoost', 'NLTK', 'spaCy',
    'NumPy', 'Pandas', 'SciPy'
  ],

  // Frontend Technologies
  'frontend': [
    'HTML', 'CSS', 'SASS', 'Bootstrap', 'Tailwind', 'jQuery', 'AngularJS',
    'React', 'Vue', 'Next.js', 'Vite', 'Webpack', 'npm', 'yarn'
  ],

  // Version Control
  'version_control': [
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN', 'Mercurial', 'ClearCase'
  ],

  // Testing & Quality
  'testing_quality': [
    'Unit Testing', 'Integration Testing', 'TDD', 'Jest', 'Mocha', 'Pytest',
    'JUnit', 'TestNG', 'Selenium', 'Cypress', 'Load Testing', 'QA'
  ],

  // Domain Specific
  'domain_specific': [
    'Microservices', 'High Performance Computing', 'HPC', 'Embedded Systems',
    'Real-time Systems', 'RTOS', 'Linux', 'Unix', 'Windows', 'IoT',
    'Blockchain', 'Cryptocurrency', 'Security', 'Cybersecurity',
    'Aerospace', 'Defense', 'Financial', 'Healthcare', 'Banking', 'FinTech',
    'Manufacturing', 'Robotics', 'Electromagnetic', 'CEM'
  ]
};

/**
 * Normalize skill name for matching (lowercase, trim special chars)
 * @param {string} skill - Skill name to normalize
 * @returns {string} Normalized skill name
 */
function normalizeSkill(skill) {
  return skill
    .toLowerCase()
    .trim()
    .replace(/[^\w\s+#.]/g, ''); // Remove special chars except +, #, .
}

/**
 * Check if a skill exists in the database
 * @param {string} skill - Skill to check
 * @returns {boolean} True if skill exists
 */
function isKnownSkill(skill) {
  const normalized = normalizeSkill(skill);
  for (const category of Object.values(SKILLS_DATABASE)) {
    if (category.some(s => normalizeSkill(s) === normalized)) {
      return true;
    }
  }
  return false;
}

/**
 * Get all skills from database
 * @returns {string[]} All unique skills
 */
function getAllSkills() {
  const allSkills = new Set();
  for (const category of Object.values(SKILLS_DATABASE)) {
    category.forEach(skill => allSkills.add(skill));
  }
  return Array.from(allSkills);
}

module.exports = {
  SKILLS_DATABASE,
  normalizeSkill,
  isKnownSkill,
  getAllSkills
};
