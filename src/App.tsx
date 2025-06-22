import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Toaster } from "sonner";
import { Portfolio } from "./Portfolio";
import { Navigation } from "./components/Navigation";
import { StartupSequence } from "./components/StartupSequence";
import { useState, useEffect } from "react";

export default function App() {
  const [activeSection, setActiveSection] = useState("");
  const [showStartup, setShowStartup] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['education', 'skills', 'experience', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    if (!showStartup) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Call once to set initial active section
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showStartup]);

  const handleStartupComplete = () => {
    setShowStartup(false);
  };

  if (showStartup) {
    return <StartupSequence onComplete={handleStartupComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <Navigation activeSection={activeSection} />
      

      
      <main className="pt-20 p-4">
        <Content />
      </main>
      <Toaster />
    </div>
  );
}

function Content() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-green-400 text-2xl mb-2">
          ╔══════════════════════════════════════════════════════════════╗
        </div>
        <div className="text-green-400 text-2xl mb-2">
          ║              CYBERSECURITY ANALYTICS DASHBOARD               ║
        </div>
        <div className="text-green-400 text-2xl mb-4">
          ╚══════════════════════════════════════════════════════════════╝
        </div>
        
        <div className="text-yellow-400 mb-2">
          [INFO] Public portfolio access • Security professional profile
        </div>
        <div className="text-green-400 text-sm">
          [STATUS] All monitoring systems operational • Last sync: {new Date().toLocaleString()}
        </div>
      </div>

      <Portfolio />
    </div>
  );
}
