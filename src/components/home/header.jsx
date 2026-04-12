import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { name: "Home", target: "#home" },
  { name: "About", target: "#about" },
  { name: "Projects", target: "#projects" },
  { name: "Contact", target: "#contact" },
];

export default function Header() {
  const navRef = useRef(null);
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation
      gsap.from(".header-logo", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      // Nav items animation
      gsap.from(".nav-item", {
        opacity: 0,
        y: -15,
        duration: 0.8,
        delay: 0.8,
        ease: "power3.out",
        stagger: {
          each: 0.1,
          from: "end",
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (target) => {
    gsap.to(window, {
      scrollTo: target,
      duration: 0.8,
      ease: "power3.inOut",
    });
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-start bg-gradient-to-b from-black via-black to-transparent pointer-events-none"
    >
      <div className="header-logo font-display text-2xl md:text-3xl tracking-tight font-mono uppercase text-white pointer-events-auto">
        Ashish
      </div>

      <nav
        ref={navRef}
        className="flex flex-col items-end space-y-2 text-xs md:text-sm uppercase tracking-widest text-white/70 pointer-events-auto"
      >
        {navItems.map((item, i) => {
          return (
            <button
              key={i}
              onClick={() => handleNavClick(item.target)}
              className="nav-item relative group text-white/70 hover:text-white transition-colors duration-300"
              aria-label={`Navigate to ${item.name}`}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </button>
          );
        })}
      </nav>
    </header>
  );
}
