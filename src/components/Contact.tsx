import { useEffect, useRef, useState } from "react";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";

export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:contact@example.com" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-4xl w-full">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gradient text-center">
            Let's Connect
          </h2>
          
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Have a project in mind? Let's build something amazing together.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="border-gradient rounded-2xl p-8 backdrop-blur-sm">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform glow-primary flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="border-gradient rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Get in Touch
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I'm always open to discussing new projects, creative ideas,
                  or opportunities to be part of your vision.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">
                      contact@example.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary">📍</span>
                    <span className="text-muted-foreground">
                      Available for remote work worldwide
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-gradient rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-all hover:scale-105 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <social.icon className="w-5 h-5 text-primary group-hover:text-secondary transition-colors" />
                      <span className="text-sm font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              © 2025 Full-Stack Developer. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
