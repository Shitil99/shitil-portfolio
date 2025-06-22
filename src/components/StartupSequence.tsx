import { useState, useEffect } from 'react';

interface StartupSequenceProps {
  onComplete: () => void;
}

export function StartupSequence({ onComplete }: StartupSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const startupMessages = [
    '[    0.000000] Ubuntu 22.04.3 LTS Security Workstation starting...',
    '[    0.123456] Loading security framework... OK',
    '[    0.234567] Initializing cryptographic systems... OK',
    '[    0.345678] Starting threat detection... OK',
    '[    0.456789] Loading SIEM dashboard... OK',
    '[    0.567890] Welcome to Shitil Shetty\'s Security Portfolio',
    '[    0.678901] All security protocols operational - System ready'
  ];

  useEffect(() => {
    // Start immediately without sound
    setTimeout(() => {
      startBootSequence();
    }, 100);
  }, []);

  const startBootSequence = () => {
    let messageIndex = 0;
    let charIndex = 0;

    const typeMessage = () => {
      if (messageIndex < startupMessages.length) {
        const currentMessage = startupMessages[messageIndex];
        
        if (charIndex < currentMessage.length) {
          setDisplayText(prev => prev + currentMessage[charIndex]);
          charIndex++;
          // Much faster typing speed - 8ms for rapid display
          setTimeout(typeMessage, 8);
        } else {
          // Message complete, move to next after a shorter pause
          setTimeout(() => {
            setDisplayText(prev => prev + '\n');
            messageIndex++;
            charIndex = 0;
            setCurrentStep(messageIndex);
            
            if (messageIndex < startupMessages.length) {
              // Very short pause between messages - 20ms
              setTimeout(typeMessage, 20);
            } else {
              // All messages complete - minimal completion delay
              setTimeout(() => {
                setIsComplete(true);
                // Complete after 150ms for smooth transition
                setTimeout(onComplete, 150);
              }, 100);
            }
          }, 30); // Very short pause after each message
        }
      }
    };

    typeMessage();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Ubuntu-style background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-orange-900 opacity-20"></div>
      
      <div className="relative w-full max-w-4xl mx-auto p-8">
        {/* Ubuntu Logo Area */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🐧</div>
          <div className="text-orange-400 text-2xl font-bold mb-2">UBUNTU SECURITY</div>
          <div className="text-white text-lg">Cybersecurity Professional Workstation</div>
          <div className="text-cyan-400 text-sm mt-4 animate-pulse">
            Loading Shitil Shetty's Portfolio...
          </div>
        </div>

        {/* Terminal Output */}
        <div className="bg-black border border-green-500/30 rounded-lg p-6 min-h-[400px] font-mono">
          <div className="text-green-400 mb-4 text-sm">
            ┌─ SECURITY PROTOCOL INITIALIZATION ─┐
          </div>
          
          <div className="text-green-400 text-sm leading-relaxed whitespace-pre-line">
            {displayText}
            <span className="animate-pulse">█</span>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Portfolio Loading Progress</span>
              <span>{Math.round((currentStep / startupMessages.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-100"
                style={{ width: `${(currentStep / startupMessages.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* System Status Indicators */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${currentStep >= 2 ? 'bg-green-400' : 'bg-gray-600'}`}></span>
              <span className="text-gray-400">SECURITY</span>
            </div>
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${currentStep >= 3 ? 'bg-green-400' : 'bg-gray-600'}`}></span>
              <span className="text-gray-400">CRYPTO</span>
            </div>
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${currentStep >= 4 ? 'bg-green-400' : 'bg-gray-600'}`}></span>
              <span className="text-gray-400">THREATS</span>
            </div>
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${currentStep >= 5 ? 'bg-green-400' : 'bg-gray-600'}`}></span>
              <span className="text-gray-400">PORTFOLIO</span>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        {!isComplete && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center text-green-400">
              <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin mr-3"></div>
              <span className="text-sm">Loading Shitil's Cybersecurity Portfolio...</span>
            </div>
          </div>
        )}

        {/* Completion Message */}
        {isComplete && (
          <div className="text-center mt-8">
            <div className="text-green-400 text-lg mb-2">
              ✓ Portfolio Loading Complete
            </div>
            <div className="text-gray-400 text-sm">
              Launching Cybersecurity Analytics Dashboard...
            </div>
          </div>
        )}
      </div>

      {/* Matrix-style background effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="matrix-rain"></div>
      </div>
    </div>
  );
}
