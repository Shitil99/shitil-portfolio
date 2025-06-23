// src/Portfolio.tsx
import { useEffect, useState } from "react";
import staticPortfolioData from "./data/portfolioData";
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
`.trim();

export function Portfolio() {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [terminalLogs, setTerminalLogs] = useState<any[]>([]);
  const [terminalInput, setTerminalInput] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setPortfolioData(staticPortfolioData);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim();
    let output = "";

    switch (command.toLowerCase()) {
      case "":
        output = TERMINAL_HELP;
        break;
      case "whoami":
        output = "shitil_shetty";
        break;
      case "pwd":
        output = "/home/shitil/cybersec-portfolio";
        break;
      case "ls -la":
        output = [
          "drwxr-xr-x education/",
          "drwxr-xr-x skills/",
          "drwxr-xr-x experience/",
          "drwxr-xr-x projects/",
          "drwxr-xr-x certifications/",
          "drwxr-xr-x contact/"
        ].join("\n");
        break;
      case "ps aux":
        output = [
          "splunk     1234  0.5  threat_hunting",
          "wireshark  5678  0.3  packet_analysis",
          "nmap       9101  0.2  scanning"
        ].join("\n");
        break;
      case "netstat -an":
        output = [
          "tcp  0.0.0.0:443  LISTEN  [HTTPS_SECURE]",
          "tcp  0.0.0.0:22   LISTEN  [SSH_HARDENED]"
        ].join("\n");
        break;
      case "cat /etc/passwd | grep shitil":
        output = "shitil:x:1000:1000:Shitil Shetty:/home/shitil:/bin/bash";
        break;
      case "uname -a":
        output = "Linux cybersec-box 5.15.0 x86_64 GNU/Linux";
        break;
      case "help":
        output = TERMINAL_HELP;
        break;
      case "clear":
        setTerminalLogs([]);
        setTerminalInput("");
        return;
      default:
        output = `bash: ${command}: command not found`;
    }

    setTerminalLogs((prev) => [
      { command: command || "[ENTER]", output },
      ...prev.slice(0, 9)
    ]);
    setTerminalInput("");
  };

  if (!portfolioData) {
    return (
      <div className="text-green-400 text-center mt-10">
        [LOADING] Fetching data...
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 pt-4">
      {/* Header */}
      <div className="bg-black border border-green-500/30 rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-green-400">{portfolioData.personalInfo.name}</h1>
        <p className="text-blue-400">Cybersecurity Professional</p>
        <p className="text-green-400 text-sm">{portfolioData.personalInfo.email}</p>
        <p className="text-green-400 text-sm">{portfolioData.personalInfo.location}</p>
      </div>

      {/* System Status */}
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

      {/* Terminal */}
      <div className="bg-gray-900 border border-green-500/20 rounded p-4">
        <div className="text-green-400 text-sm mb-2">┌─ TERMINAL ─┐</div>
        <div className="text-xs text-green-400 h-24 overflow-y-auto mb-2 whitespace-pre-line">
          {terminalLogs.map((log, i) => (
            <div key={i}>
              <span className="text-blue-400">$ {log.command}</span>
              <br />
              <span className="ml-4">{log.output}</span>
              <br />
            </div>
          ))}
        </div>
        <form onSubmit={handleTerminalCommand}>
          <input
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            className="w-full bg-black text-green-400 border border-green-400 px-2 py-1 text-sm"
            placeholder="Press Enter for a help menu"
          />
        </form>
      </div>

      {/* Analytics */}
      <ThreatMetrics metrics={portfolioData.threatMetrics} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SkillsChart skillLevels={portfolioData.skillLevels} />
        <ThreatTrendChart data={portfolioData.monthlyThreatData} />
      </div>

      {/* Dynamic Sections */}
      <Section id="education" title="🎓 EDUCATION">
        {portfolioData.education.map((edu: any, i: number) => (
          <div key={i} className="mb-4">
            <h3 className="text-yellow-400 font-semibold">{edu.degree}</h3>
            <p className="text-green-400">{edu.institution} — {edu.location}</p>
            <p className="text-blue-400 text-sm">{edu.duration} | GPA: {edu.gpa}</p>
            <ul className="list-disc ml-5 text-sm text-green-400">
              {edu.coursework.map((course: string, j: number) => <li key={j}>{course}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <Section id="skills" title="🛡️ SKILLS & TOOLS">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(portfolioData.skills).map(([category, tools]: any) => (
            <div key={category} className="bg-black p-4 border border-green-500/20 rounded">
              <h4 className="text-yellow-400 font-semibold mb-2">{category}</h4>
              <ul className="list-disc ml-5 text-green-400 text-sm">
                {tools.map((tool: string, i: number) => <li key={i}>{tool}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="experience" title="💼 EXPERIENCE">
        {portfolioData.experience.map((exp: any, i: number) => (
          <div key={i} className="mb-4">
            <h3 className="text-yellow-400 font-semibold">{exp.position} @ {exp.company}</h3>
            <p className="text-green-400 text-sm">{exp.location}</p>
            <ul className="list-disc ml-5 text-green-400 text-sm">
              {exp.achievements.map((a: string, j: number) => <li key={j}>{a}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <Section id="projects" title="🚀 PROJECTS">
        {portfolioData.projects.map((proj: any, i: number) => (
          <div key={i} className="mb-4">
            <h3 className="text-yellow-400 font-semibold">{proj.title}</h3>
            <ul className="list-disc ml-5 text-green-400 text-sm">
              {proj.achievements.map((a: string, j: number) => <li key={j}>{a}</li>)}
            </ul>
            <p className="text-blue-400 text-xs mt-1">Tech Used: {proj.technologies.join(", ")}</p>
          </div>
        ))}
      </Section>

      <Section id="certifications" title="🏆 CERTIFICATES">
        {portfolioData.certifications.map((cert: any, i: number) => (
          <div key={i} className="mb-2">
            <h4 className="text-yellow-400">{cert.name}</h4>
            <p className="text-green-400 text-sm">{cert.issuer} • {cert.status}</p>
            {cert.credentialId && (
              <p className="text-blue-400 text-xs">ID: {cert.credentialId}</p>
            )}
          </div>
        ))}
      </Section>

      <Section id="contact" title="📡 CONTACT">
        <ContactForm />
      </Section>

      <div className="text-center text-green-400 text-xs pt-4 border-t border-green-500/30">
        [INFO] Portfolio Dashboard Rendered • {new Date().toLocaleString()}
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <h2 className="text-green-400 text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">{title.split(" ")[0]}</span>{" "}
        {title.split(" ").slice(1).join(" ")}
      </h2>
      {children}
    </div>
  );
}
