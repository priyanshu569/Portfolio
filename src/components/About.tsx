import { useEffect, useRef, useState } from "react";
import { Code2, Sparkles, Rocket } from "lucide-react";

export const About = () => {
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

  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable code that stands the test of time",
    },
    {
      icon: Sparkles,
      title: "Creative Solutions",
      description: "Transforming complex problems into elegant digital experiences",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing every interaction for lightning-fast user experiences",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-4 relative"
    >
      <div className="max-w-6xl w-full">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gradient">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate full-stack developer who believes that great code
                is an art form. With expertise spanning from elegant frontends to
                robust backends, I create digital experiences that users love.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey in web development has been driven by curiosity and
                a relentless pursuit of excellence. I thrive on challenges and
                continuously push the boundaries of what's possible on the web.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-3xl" />
              <div className="relative border-gradient rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  What I Bring
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">▹</span>
                    <span className="text-muted-foreground">
                      5+ years of full-stack development experience
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary mt-1">▹</span>
                    <span className="text-muted-foreground">
                      Strong focus on UI/UX and performance optimization
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">▹</span>
                    <span className="text-muted-foreground">
                      Passionate about clean architecture and best practices
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="border-gradient rounded-xl p-6 hover:scale-105 transition-transform duration-300"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <feature.icon className="w-12 h-12 mb-4 text-primary glow-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
