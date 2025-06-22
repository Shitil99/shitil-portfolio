import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const submitMessage = useMutation(api.portfolio.submitContactMessage);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await submitMessage(formData);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Failed to submit message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6">
      <h2 className="text-xl text-cyan-400 mb-6 flex items-center">
        <span className="mr-2">📡</span>
        SECURE COMMUNICATION CHANNEL
      </h2>
      
      <div className="bg-black border border-cyan-500/20 rounded-lg p-4 mb-6">
        <div className="text-cyan-400 text-sm mb-2">
          ┌─ CONTACT PROTOCOL INITIATED ─┐
        </div>
        <div className="text-green-400 text-xs">
          [INFO] All communications are encrypted and monitored for security
        </div>
        <div className="text-yellow-400 text-xs">
          [STATUS] Channel secure • Ready for transmission
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-cyan-400 text-sm mb-2">
              <span className="text-yellow-400">▸</span> OPERATOR NAME
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full bg-black border border-cyan-500/30 rounded px-3 py-2 text-green-400 focus:border-cyan-400 focus:outline-none transition-colors placeholder-gray-500"
              placeholder="Enter your name..."
            />
          </div>
          <div>
            <label className="block text-cyan-400 text-sm mb-2">
              <span className="text-yellow-400">▸</span> EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-black border border-cyan-500/30 rounded px-3 py-2 text-green-400 focus:border-cyan-400 focus:outline-none transition-colors placeholder-gray-500"
              placeholder="your.email@domain.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-cyan-400 text-sm mb-2">
            <span className="text-yellow-400">▸</span> SUBJECT LINE
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full bg-black border border-cyan-500/30 rounded px-3 py-2 text-green-400 focus:border-cyan-400 focus:outline-none transition-colors placeholder-gray-500"
            placeholder="Brief description of your inquiry..."
          />
        </div>

        <div>
          <label className="block text-cyan-400 text-sm mb-2">
            <span className="text-yellow-400">▸</span> MESSAGE PAYLOAD
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full bg-black border border-cyan-500/30 rounded px-3 py-2 text-green-400 focus:border-cyan-400 focus:outline-none transition-colors placeholder-gray-500 resize-none"
            placeholder="Enter your message here..."
          />
        </div>

        {submitStatus === "success" && (
          <div className="bg-green-900/30 border border-green-500/50 rounded p-3">
            <div className="text-green-400 text-sm flex items-center">
              <span className="mr-2">✓</span>
              [SUCCESS] Message transmitted successfully • Response expected within 24-48 hours
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="bg-red-900/30 border border-red-500/50 rounded p-3">
            <div className="text-red-400 text-sm flex items-center">
              <span className="mr-2">✗</span>
              [ERROR] Transmission failed • Please retry or use alternative contact method
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-gray-400 text-xs">
            <span className="text-cyan-400">●</span> Secure transmission protocol active
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-black font-bold px-6 py-2 rounded transition-colors disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                TRANSMITTING...
              </>
            ) : (
              <>
                <span className="mr-2">📤</span>
                SEND MESSAGE
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-cyan-500/20">
        <div className="text-center text-cyan-400 text-sm">
          <p className="mb-2">Alternative Communication Channels:</p>
          <div className="flex justify-center space-x-6 text-xs">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">📞</span>
              <span>862-381-0778</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">✉️</span>
              <span>shitilshetty99@gmail.com</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">🔗</span>
              <span>linkedin.com/in/shitil-shetty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
