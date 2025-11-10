import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

export const Projects = () => {
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

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      gradient: "from-primary/20 to-secondary/20",
    },
    {
      title: "Social Media Dashboard",
      description:
        "Analytics dashboard for social media management with real-time data visualization and automated reporting.",
      tech: ["Next.js", "PostgreSQL", "GraphQL", "D3.js"],
      gradient: "from-secondary/20 to-accent/20",
    },
    {
      title: "AI-Powered Chatbot",
      description:
        "Intelligent chatbot using natural language processing for customer support automation.",
      tech: ["Python", "TensorFlow", "React", "WebSocket"],
      gradient: "from-accent/20 to-primary/20",
    },
    {
      title: "Project Management Tool",
      description:
        "Collaborative project management platform with real-time updates, task tracking, and team collaboration features.",
      tech: ["Vue.js", "Express", "MySQL", "Socket.io"],
      gradient: "from-primary/20 via-secondary/20 to-accent/20",
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-6xl w-full">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gradient text-center">
            Featured Projects
          </h2>
          
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Showcasing my latest work and innovations
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-2xl border-gradient p-8 hover:scale-[1.02] transition-all duration-300"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}
                />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm rounded-full bg-muted text-foreground border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
                      <Github className="w-5 h-5" />
                      <span className="font-medium">Code</span>
                    </button>
                    <button className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
                      <ExternalLink className="w-5 h-5" />
                      <span className="font-medium">Live Demo</span>
                    </button>
                  </div>
                </div>

                {/* Floating decoration */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
