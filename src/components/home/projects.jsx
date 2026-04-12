import Section from "../ui/section";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".project-section").forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-black text-white flex flex-col gap-8 p-4 md:p-8 py-24 md:py-32 justify-center items-center"
      role="region"
      aria-label="Projects section"
    >
      <div className="w-full max-w-7xl">
        <h2
          style={{ fontFamily: "stain" }}
          className="text-4xl md:text-7xl uppercase mb-20 text-center font-bold"
        >
          Featured Work
        </h2>
      </div>

      <div className="w-full flex flex-col gap-12 max-w-7xl mx-auto">
        <div className="project-section">
          <Section
            title="Fullstack Application"
            role="Full Stack Developer"
            year="2025"
            description="A complete full-stack web application featuring secure authentication, user profiles, content posting, and optimized API performance. Built with scalability, clean architecture, and real-world backend practices in mind."
            image="/assets/z.svg"
            techStack={[
              "React",
              "Node.js",
              "Express.js",
              "MongoDB",
              "JWT Authentication",
              "REST APIs",
            ]}
            liveLink="https://minitwitter-psi.vercel.app/"
            githubLink="https://github.com/Ashishkapoor1469/Fullstackapplication"
          />
        </div>

        <div className="project-section">
          <Section
            title="CODEAXE"
            role="Frontend & Logic Developer"
            year="2024"
            description="An interactive coding-focused platform designed to improve problem-solving and logical thinking. Emphasizes clean UI, structured content flow, and smooth user experience."
            image="/assets/code.png"
            techStack={[
              "React",
              "JavaScript",
              "Tailwind CSS",
              "Component-Based Design",
            ]}
            liveLink="https://codeaxe.vercel.app/"
            githubLink="https://github.com/Ashishkapoor1469/CODEAXE"
          />
        </div>

        <div className="project-section">
          <Section
            title="SkillBoost"
            role="Full Stack Developer"
            year="2024"
            description="A skill development platform focused on structured learning and user engagement. Designed with modular components, scalable backend logic, and clean API handling."
            image="/assets/candle.gif"
            techStack={[
              "React",
              "Node.js",
              "Express.js",
              "MongoDB",
              "Modular Architecture",
            ]}
            liveLink="https://skill-boost-eight.vercel.app/"
            githubLink="https://github.com/Ashishkapoor1469/SkillBoost"
          />
        </div>

        <div className="project-section">
          <Section
            title="Batekaro"
            role="Frontend Developer"
            year="2024"
            description="A modern communication-focused web application emphasizing clean UI, smooth interactions, and responsive design. Built to deliver a fast and intuitive user experience."
            image="/assets/3.webp"
            techStack={[
              "React",
              "Tailwind CSS",
              "Responsive Design",
              "UI/UX Principles",
            ]}
            liveLink="https://chatttkero.vercel.app/"
            githubLink="https://github.com/Ashishkapoor1469/Batekaro"
          />
        </div>
      </div>
    </div>
  );
}