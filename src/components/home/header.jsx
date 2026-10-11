import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Github, Linkedin, Instagram } from "lucide-react";
gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { name: "Home", target: "#home" },
  { name: "Work", target: "#work" },
  { name: "Journey", target: "#journey" },
  { name: "Contact", target: "#contact" },
];

export default function Header() {
  const navRef = useRef(null);
  const headerRef = useRef(null);
  const panelRef = useRef(null);
  const [open, setOpen] = useState(false);

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
      gsap.from(".desktop-nav .nav-item", {
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

      // Mobile menu button (avoid being hidden by selector collisions)
      gsap.from(".mobile-menu-btn", {
        opacity: 0,
        y: -12,
        duration: 0.6,
        delay: 0.35,
        ease: "power3.out",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (open) {
      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" },
      );
    } else {
      gsap.set(panel, { autoAlpha: 0, y: -10 });
    }
  }, [open]);

  const handleNavClick = (target) => {
    gsap.to(window, {
      scrollTo: target,
      duration: 0.8,
      ease: "power3.inOut",
    });
    setOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full z-50 px-4 sm:px-6 md:px-12 py-5 sm:py-6 flex justify-between items-start bg-gradient-to-b from-black via-black to-transparent pointer-events-none"
    >
      <div className="header-logo font-display text-2xl md:text-3xl tracking-tight font-mono uppercase text-white pointer-events-auto">
        Ashish
      </div>

      {/* Desktop nav */}
      <nav
        ref={navRef}
        className="desktop-nav hidden md:flex flex-col items-end space-y-2 text-[11px] md:text-sm uppercase tracking-widest text-white/70 pointer-events-auto"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <button
            key={item.target}
            onClick={() => handleNavClick(item.target)}
            className="nav-item relative group text-white/70 hover:text-white transition-colors duration-300"
            aria-label={`Navigate to ${item.name}`}
          >
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/80 group-hover:w-full transition-all duration-300" />
          </button>
        ))}
        <div className="pt-2 flex items-center gap-3 text-white/50">
          <a
            href="https://github.com/Ashishkapoor1469"
            target="_blank"
            rel="me noopener noreferrer"
            aria-label="Ashish Kapoor on GitHub"
            title="Ashish Kapoor on GitHub"
            className="hover:text-white transition-colors"
          >
            <Github size={14} />
          </a>
          <a
            href="https://www.linkedin.com/in/ashishkapoor-dev"
            target="_blank"
            rel="me noopener noreferrer"
            aria-label="Ashish Kapoor on LinkedIn"
            title="Ashish Kapoor on LinkedIn"
            className="hover:text-white transition-colors"
          >
            <Linkedin size={14} />
          </a>
          <a
            href="https://www.instagram.com/ashish_kapoor_1"
            target="_blank"
            rel="me noopener noreferrer"
            aria-label="Ashish Kapoor on Instagram"
            title="Ashish Kapoor on Instagram"
            className="hover:text-white transition-colors"
          >
            <Instagram size={14} />
          </a>
        </div>
      </nav>

      {/* Mobile menu button */}
      <div className="md:hidden pointer-events-auto relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="mobile-menu-btn rounded-lg border border-white/20 bg-black/35 backdrop-blur-sm px-3 py-2 text-[11px] uppercase tracking-widest text-white/85 hover:text-white hover:border-white/35 hover:bg-white/10 transition"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          data-cursor="hover"
        >
          {open ? "Close" : "Menu"}
        </button>

        <div
          id="mobile-menu"
          ref={panelRef}
          className="absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-md p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              className="w-full text-left rounded-xl px-3 py-2 text-[11px] uppercase tracking-widest text-white/75 hover:text-white hover:bg-white/5 transition"
              aria-label={`Navigate to ${item.name}`}
            >
              {item.name}
            </button>
          ))}
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-around px-2 py-1 text-white/60">
            <a
              href="https://github.com/Ashishkapoor1469"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Ashish Kapoor on GitHub"
              className="p-1 hover:text-white transition-colors"
            >
              <Github size={15} />
            </a>
            <a
              href="https://www.linkedin.com/in/ashishkapoor-dev"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Ashish Kapoor on LinkedIn"
              className="p-1 hover:text-white transition-colors"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://www.instagram.com/ashish_kapoor_1"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Ashish Kapoor on Instagram"
              className="p-1 hover:text-white transition-colors"
            >
              <Instagram size={15} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
