import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState, useEffect } from "react";
import { SkillsChart } from "./components/SkillsChart";
import { ThreatMetrics } from "./components/ThreatMetrics";
import { ThreatTrendChart } from "./components/ThreatTrendChart";
import { ContactForm } from "./components/ContactForm";

const TERMINAL_HELP = `
Available commands:
  whoami         - Show current user
  pwd            - Show current directory
  ls -la         - List dashboard sections
  ps aux         - Show running security processes
  netstat -an    - Show network connections
  cat /etc/passwd | grep shitil
                 - Show user info
  uname -a       - Show system info
  clear          - Clear terminal
  help           - Show this help message
(Press Enter with no command to see this help)
`.trim();

export function Portfolio() {
  const portfolioData = useQuery(api.portfolio.getPortfolioData);
  const terminalLogs = useQuery(api.portfolio.getTerminalLogs);
  const addLog = useMutation(api.portfolio.addTerminalLog);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [terminalInput, setTerminalInput] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTerminalCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim();
    let output = "";

    if (!command) {
      output = TERMINAL_HELP;
    } else {
      switch (command.toLowerCase()) {
        case "whoami":
          output = "shitil_shetty";
          break;
        case "pwd":
          output = "/home/shitil/cybersec-portfolio";
          break;
        case "ls -la":
          output =
            "drwxr-xr-x education/\ndrwxr-xr-x skills/\ndrwxr-xr-x experience/\ndrwxr-xr-x projects/\ndrwxr-xr-x certifications/\ndrwxr-xr-x contact/";
          break;
        case "ps aux":
          output =
            "splunk     1234  0.5  2.1  threat_hunting\nwireshark  5678  0.3  1.8  packet_analysis\nburpsuite  9012  0.2  1.5  web_security\nnmap       3456  0.1  0.8  vuln_scan";
          break;
        case "netstat -an":
          output =
            "tcp  0.0.0.0:443  LISTEN  [HTTPS_SECURE]\ntcp  0.0.0.0:22   LISTEN  [SSH_HARDENED]\ntcp  0.0.0.0:8089 LISTEN  [SPLUNK_WEB]";
          break;
        case "cat /etc/passwd | grep shitil":
          output = "shitil:x:1000:1000:Shitil Shetty,,,:/home/shitil:/bin/bash";
          break;
        case "uname -a":
          output =
            "Linux cybersec-workstation 5.15.0-kali3-amd64 #1 SMP Debian 5.15.15-2kali1 x86_64 GNU/Linux";
          break;
        case "help":
          output = TERMINAL_HELP;
          break;
        case "clear":
          output = "[TERMINAL CLEARED]";
          break;
        default:
          output = `bash: ${command}: command not found`;
      }
    }

    await addLog({
      command: command || "[ENTER]",
      output,
      user: "shitil",
    });

    setTerminalInput("");
  };

  if (!portfolioData || !portfolioData.personalInfo) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-pulse text-green-400 text-xl mb-4">
            [SYSTEM] Loading security analytics dashboard...
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4">
      {/* Personal Header */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-green-500/30 rounded-lg p-6">
        <div className="text-center mb-6">
          <h1
            className="text-4xl font-bold text-green-400 mb-2 glitch"
            data-text={portfolioData.personalInfo.name}
          >
            {portfolioData.personalInfo.name}
          </h1>
          <div className="text-blue-400 text-lg mb-4">
            Cybersecurity Professional
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center justify-center">
              <span className="text-yellow-400 mr-2">📍</span>
              <span className="text-green-400">
                {portfolioData.personalInfo.location}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-yellow-400 mr-2">📞</span>
              <span className="text-green-400">
                {portfolioData.personalInfo.phone}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-yellow-400 mr-2">✉️</span>
              <span className="text-green-400">
                {portfolioData.personalInfo.email}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-yellow-400 mr-2">🔗</span>
              <a 
                href={`https://${portfolioData.personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-blue-400 transition-colors duration-200 underline"
              >
                {portfolioData.personalInfo.linkedin}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-900 border border-green-500/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-green-400 font-bold">SYSTEM STATUS</h3>
              <div className="text-green-400 text-sm">
                {currentTime.toLocaleString()}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-yellow-400 text-xs">THREAT LEVEL</div>
                <div className="text-green-400 font-bold">● LOW</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 text-xs">SECURITY STATUS</div>
                <div className="text-green-400 font-bold">● OPERATIONAL</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 text-xs">UPTIME</div>
                <div className="text-green-400 font-bold">
                  {portfolioData.threatMetrics.uptimePercentage}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 text-xs">SYSTEMS</div>
                <div className="text-green-400 font-bold">
                  {portfolioData.threatMetrics.systemsMonitored}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black border border-green-500/30 rounded-lg p-4">
          <div className="text-green-400 mb-2 text-sm">┌─ Terminal ─┐</div>
          <div className="h-24 overflow-y-auto mb-2 text-xs">
            {terminalLogs?.slice(0, 3).map((log, index) => (
              <div key={index} className="mb-1">
                <span className="text-blue-400">shitil@cybersec:~$ </span>
                <span className="text-white">{log.command}</span>
                <div className="text-green-400 ml-4 truncate" style={{ whiteSpace: "pre-line" }}>
                  {log.output}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleTerminalCommand} className="flex text-xs">
            <span className="text-blue-400 mr-1">$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              className="flex-1 bg-transparent text-white outline-none"
              placeholder="Press Enter or type 'help' for commands…"
            />
          </form>
        </div>
      </div>

      {/* Threat Metrics Dashboard */}
      <ThreatMetrics metrics={portfolioData.threatMetrics} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillsChart skillLevels={portfolioData.skillLevels} />
        <ThreatTrendChart data={portfolioData.monthlyThreatData} />
      </div>

      {/* Education Section */}
      <div id="education" className="bg-gray-900 border border-blue-500/30 rounded-lg p-6 scroll-mt-24">
        <h2 className="text-xl text-blue-400 mb-6 flex items-center">
          <span className="mr-2">🎓</span>
          EDUCATION
        </h2>
        <div className="space-y-6">
          {portfolioData.education.map((edu, index) => (
            <div
              key={index}
              className="bg-black border border-blue-500/20 rounded-lg p-4"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-yellow-400 font-bold text-lg">
                    {edu.degree}
                  </h3>
                  <p className="text-blue-400 font-semibold">
                    {edu.institution}
                  </p>
                  <p className="text-green-400 text-sm">📍 {edu.location}</p>
                </div>
                <div className="text-right mt-2 lg:mt-0">
                  <div className="text-green-400 font-bold">{edu.duration}</div>
                  <div className="text-yellow-400">GPA: {edu.gpa}</div>
                </div>
              </div>
              <div>
                <h4 className="text-green-400 font-semibold mb-2">
                  Relevant Coursework:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {edu.coursework.map((course, courseIndex) => (
                    <div
                      key={courseIndex}
                      className="text-green-400 text-sm flex items-center"
                    >
                      <span className="text-blue-400 mr-2">▸</span>
                      {course}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Skills */}
      <div id="skills" className="bg-gray-900 border border-green-500/30 rounded-lg p-6 scroll-mt-24">
        <h2 className="text-xl text-green-400 mb-6 flex items-center">
          <span className="mr-2">🛡️</span>
          TECHNICAL SKILLS & TOOLS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(portfolioData.skills).map(([category, tools]) => (
            <div
              key={category}
              className="bg-black border border-green-500/20 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-yellow-400 font-bold text-sm">{category}</h3>
                <div className="text-green-400 text-xs">
                  {
                    portfolioData.skillLevels[
                      category as keyof typeof portfolioData.skillLevels
                    ]
                  }
                  %
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1 mb-3">
                <div
                  className="bg-green-400 h-1 rounded-full transition-all duration-1000"
                  style={{
                    width: `${
                      portfolioData.skillLevels[
                        category as keyof typeof portfolioData.skillLevels
                      ]
                    }%`,
                  }}
                ></div>
              </div>
              <div className="space-y-1">
                {tools.map((tool, index) => (
                  <div
                    key={index}
                    className="text-green-400 text-xs flex items-center"
                  >
                    <span className="text-green-500 mr-2">▸</span>
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Experience */}
      <div id="experience" className="bg-gray-900 border border-green-500/30 rounded-lg p-6 scroll-mt-24">
        <h2 className="text-xl text-green-400 mb-6 flex items-center">
          <span className="mr-2">💼</span>
          PROFESSIONAL EXPERIENCE
        </h2>
        <div className="space-y-6">
          {portfolioData.experience.map((exp, index) => (
            <div
              key={index}
              className="bg-black border border-green-500/20 rounded-lg p-4"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-yellow-400 font-bold text-lg">
                    {exp.company}
                  </h3>
                  <p className="text-blue-400 font-semibold">{exp.position}</p>
                </div>
                <div className="text-green-400 text-sm mt-2 md:mt-0">
                  📍 {exp.location}
                </div>
              </div>
              <div className="space-y-2">
                {exp.achievements.map((achievement, achIndex) => (
                  <div
                    key={achIndex}
                    className="text-green-400 text-sm flex items-start"
                  >
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 scroll-mt-24">
        <h2 className="text-xl text-purple-400 mb-6 flex items-center">
          <span className="mr-2">🚀</span>
          PROJECTS
        </h2>
        <div className="space-y-6">
          {portfolioData.projects.map((project, index) => (
            <div
              key={index}
              className="bg-black border border-purple-500/20 rounded-lg p-4"
            >
              <div className="mb-4">
                <h3 className="text-yellow-400 font-bold text-lg mb-2">
                  {project.title}
                </h3>
                <p className="text-purple-400 text-sm mb-3">
                  {project.description}
                </p>
                <div className="space-y-2 mb-4">
                  {project.achievements.map((achievement, achIndex) => (
                    <div
                      key={achIndex}
                      className="text-green-400 text-sm flex items-start"
                    >
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded text-xs border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div id="certifications" className="bg-gray-900 border border-orange-500/30 rounded-lg p-6 scroll-mt-24">
        <h2 className="text-xl text-orange-400 mb-6 flex items-center">
          <span className="mr-2">🏆</span>
          CERTIFICATIONS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioData.certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-black border border-orange-500/20 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-yellow-400 font-bold text-sm">
                  {cert.name}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    cert.status === "Certified"
                      ? "bg-green-900/30 text-green-300 border border-green-500/30"
                      : "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30"
                  }`}
                >
                  {cert.status}
                </span>
              </div>
              <p className="text-orange-400 text-sm mb-2">{cert.issuer}</p>
              {cert.credentialId && (
                <p className="text-green-400 text-xs">
                  <span className="text-gray-400">Credential ID:</span>{" "}
                  {cert.credentialId}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact" className="scroll-mt-24">
        <ContactForm />
      </div>

      {/* Footer */}
      <div className="text-center text-green-400 text-sm border-t border-green-500/30 pt-4">
        <p>└─ End of Security Analytics Dashboard ─┘</p>
        <p className="text-gray-500 mt-2">
          [INFO] Real-time monitoring active • Threat intelligence updated • All communications encrypted
        </p>
      </div>
    </div>
  );
}
