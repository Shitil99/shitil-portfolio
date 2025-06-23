// src/data/portfolioData.ts

const portfolioData = {
  personalInfo: {
    name: "SHITIL SHASHIDHAR SHETTY",
    location: "Newark, NJ, USA",
    phone: "862-381-0778",
    email: "shitilshetty99@gmail.com",
    linkedin: "linkedin.com/in/shitil-shetty",
  },
  skills: {
    "Security Operations": ["Splunk", "ELK Stack", "Suricata", "Graylog"],
    "EDR/XDR Tools": ["CrowdStrike", "SentinelOne", "Microsoft Defender", "Cisco SecureX"],
    "Incident Response & Forensics": ["MITRE ATT&CK", "IOC Analysis", "CyberChef", "UFED"],
    "Scripting & Automation": ["Python", "Bash", "PowerShell", "SQL"],
    "Vulnerability Assessment": ["Nmap", "Nessus", "OpenVAS", "SQLMap"],
    "Cloud Security": ["AWS (Security Hub, Config, GuardDuty)", "Azure"],
    "Security Tools": ["Wireshark", "Burp Suite", "OWASP ZAP"],
    "Compliance & Risk": ["ISO 27001", "SOC 2", "NIST", "HIPAA", "CIS Controls"],
    "Operating Systems": ["Windows", "Ubuntu", "CentOS"]
  },
  skillLevels: {
    "Security Operations": 85,
    "EDR/XDR Tools": 80,
    "Incident Response & Forensics": 90,
    "Scripting & Automation": 75,
    "Vulnerability Assessment": 85,
    "Cloud Security": 70,
    "Security Tools": 88,
    "Compliance & Risk": 82,
    "Operating Systems": 85
  },
  education: [
    {
      degree: "Master Of Science, Cyber Security and Privacy",
      duration: "Sep 2023 - May 2025",
      gpa: "3.33/4.00",
      institution: "New Jersey Institute of Technology",
      location: "New Jersey, USA",
      coursework: [
        "Cryptography Security",
        "Security and Privacy in Computer System",
        "Internet and Higher-Layer Protocols",
        "Counter Hacking Techniques"
      ]
    },
    {
      degree: "Bachelor of Technology, Computer Science",
      duration: "June 2019 - June 2023",
      gpa: "3.55/4.00",
      institution: "Sandip University",
      location: "Nashik, India",
      coursework: [
        "Network & Data Security",
        "Security & Digital Forensics",
        "Cyber Law",
        "Information Security Audit",
        "IT Application Security",
        "Operating Systems",
        "Computer Networks",
        "DBMS"
      ]
    }
  ],
  experience: [
    {
      company: "Maharashtra Cyber",
      location: "Mumbai, India",
      position: "Cybersecurity Intern",
      achievements: [
        "Investigated real-time SIEM alerts using Splunk and ELK Stack for malware, brute-force, and policy violations.",
        "Performed forensic analysis with Oxygen and UFED on mobile devices and endpoint logs.",
        "Conducted phishing awareness sessions for 200+ staff, resulting in a 30% reduction in simulated attack clicks.",
        "Drafted ISO 27001/NIST-based security policy templates used during internal audits.",
        "Supported threat hunting and IOC correlation within SOC workflows."
      ]
    },
    {
      company: "Infosys Ltd",
      location: "Bangalore, India",
      position: "Linux Administrator Intern",
      achievements: [
        "Monitored 50+ Unix/Linux servers, ensuring uptime and performance stability.",
        "Automated daily health checks and backup verification using Bash and PowerShell.",
        "Developed a lightweight monitoring dashboard for system metrics and backup failures.",
        "Gained foundational experience in system hardening and incident logging."
      ]
    }
  ],
  threatMetrics: {
    threatsBlocked: 1247,
    incidentsResolved: 89,
    systemsMonitored: 156,
    uptimePercentage: 99.7,
    vulnerabilitiesPatched: 234,
    securityAudits: 12
  },
  monthlyThreatData: [
    { month: 'Jan', threats: 98, incidents: 65 },
    { month: 'Feb', threats: 112, incidents: 87 },
    { month: 'Mar', threats: 134, incidents: 102 },
    { month: 'Apr', threats: 156, incidents: 120 },
    { month: 'May', threats: 189, incidents: 145 },
    { month: 'Jun', threats: 203, incidents: 162 }
  ],
  projects: [
    {
      title: "SIEM Implementation with Splunk",
      description: "",
      achievements: [
        "Configured Splunk for enterprise-level log ingestion and real-time security monitoring",
        "Developed dashboards for anomaly detection, brute-force tracking, and suspicious traffic correlation"
      ],
      technologies: ["Splunk", "SIEM", "Log Analysis", "Dashboard Development"]
    },
    {
      title: "Buffer Overflow Exploit & Mitigation",
      description: "",
      achievements: [
        "Exploited vulnerable C programs using GDB, Perl, and x86 assembly; bypassed ASLR, DEP, and stack canaries",
        "Documented mitigation strategies involving compiler flags and secure coding best practices"
      ],
      technologies: ["GDB", "Perl", "x86 Assembly", "ASLR", "DEP", "Stack Canaries"]
    },
    {
      title: "Network Defense with Security Onion & pfSense",
      description: "",
      achievements: [
        "Built a multi-VM lab with Kali (attacker), Ubuntu (target), Security Onion (IDS), and pfSense (firewall)",
        "Simulated attacks like ProFTPD RCE and Slowloris; wrote Lucene queries in Kibana to trigger alerts and enforce firewall blocks"
      ],
      technologies: ["Security Onion", "pfSense", "Kali Linux", "Ubuntu", "Kibana", "Lucene"]
    },
    {
      title: "Set-UID Privilege Escalation Simulation",
      description: "",
      achievements: [
        "Exploited misconfigured Set-UID binaries to read protected files by hijacking PATH and manipulating environment variables",
        "Demonstrated privilege escalation vectors and proposed hardening techniques"
      ],
      technologies: ["Set-UID", "Privilege Escalation", "PATH Hijacking", "Linux Security"]
    },
    {
      title: "Unix Monitoring & Automation Tool",
      description: "",
      achievements: [
        "Created a Bash-based system to monitor server health, backups, and process activity",
        "Automated recovery actions, reducing manual DevOps workload by 50%"
      ],
      technologies: ["Bash", "Unix/Linux", "System Monitoring", "Automation", "DevOps"]
    }
  ],
  certifications: [
    {
      name: "Certified Ethical Hacker (CEHv11)",
      issuer: "EC-Council",
      credentialId: "ECC3179846250",
      status: "Certified"
    },
    {
      name: "Penetration Testing, Incident Response and Forensics",
      issuer: "IBM",
      credentialId: "YMJPB2LXR4KM",
      status: "Certified"
    },
    {
      name: "Cloud Developing",
      issuer: "AWS Academy",
      credentialId: "",
      status: "Certified"
    },
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      credentialId: "",
      status: "In Progress"
    }
  ]
};

export default portfolioData;
