import { useState, useEffect } from "react";

interface NavigationProps {
  activeSection: string;
}

export function Navigation({ activeSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "education", label: "EDUCATION", icon: "🎓" },
    { id: "skills", label: "SKILLS & TOOLS", icon: "🛡️" },
    { id: "experience", label: "EXPERIENCE", icon: "💼" },
    { id: "projects", label: "PROJECTS", icon: "🚀" },
    { id: "certifications", label: "CERTIFICATES", icon: "🏆" },
    { id: "contact", label: "GET IN TOUCH", icon: "📡" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-sm border-b border-green-500/30"
          : "bg-black/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center">
          <div className="flex space-x-1 bg-gray-900/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-2 my-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded text-xs font-bold transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-green-600 text-black shadow-lg shadow-green-500/20"
                    : "text-green-400 hover:bg-green-500/20 hover:text-green-300"
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
