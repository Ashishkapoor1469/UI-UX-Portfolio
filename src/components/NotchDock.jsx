import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  Home,
  Briefcase,
  User,
  Sparkles,
  FolderGit2,
  Compass,
} from "lucide-react";

import { useLenis } from "lenis/react";

const DESKTOP_ITEMS = [
  { id: "selected", label: "Work", target: "#selected", icon: Briefcase },
  { id: "journey", label: "About", target: "#journey", icon: User },
  { id: "craft", label: "Craft", target: "#craft", icon: Sparkles },
  { id: "work", label: "Projects", target: "#work", icon: FolderGit2 },
  { id: "journey-timeline", label: "Journey", target: "#journey", icon: Compass },
];

const MOBILE_ITEMS = [
  { id: "home", label: "Home", target: "#home", icon: Home },
  { id: "selected", label: "Work", target: "#selected", icon: Briefcase },
  { id: "craft", label: "Craft", target: "#craft", icon: Sparkles },
  { id: "work", label: "Projects", target: "#work", icon: FolderGit2 },
];

export default function NotchDock() {
  const [activeTab, setActiveTab] = useState("home");
  const lenis = useLenis();

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = ["home", "selected", "craft", "work", "journey", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleScroll = (target, id) => {
    // Set active tab immediately on click so the white pill does not lag
    setActiveTab(id);
    const el = document.querySelector(target);
    if (!el) return;

    // Small top offset so section heading is not hidden under the desktop top dock (72px)
    const isDesktop = window.innerWidth >= 768;
    const offset = isDesktop ? 76 : 16;
    const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);

    if (lenis) {
      lenis.scrollTo(targetY, { immediate: true });
    } else {
      window.scrollTo({ top: targetY, behavior: "instant" });
    }
  };

  return (
    <>
      {/* =========================================================================
          DESKTOP NOTCHED DOCK (min-width: 768px): Notch at TOP CENTER
          - position: fixed; top: 0; left: 50%; transform: translateX(-50%).
          - Top edge flat and flush with the screen top, bottom corners rounded 24px.
          - Fillets on top-left and top-right:
            radial-gradient(circle at 0 100%, transparent 24px, #000 24.5px)
            radial-gradient(circle at 100% 100%, transparent 24px, #000 24.5px)
          - Items with icon + label: Work, About, Craft, Projects, Journey,
            then Let's talk button (bg #1a2fd0, text white), then avatar with green dot.
          ========================================================================= */}
      <header
        className="hidden md:block fixed top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none"
        role="banner"
      >
        <div className="relative flex items-center justify-center">
          {/* Top-left fillet (::before equivalent) */}
          <div
            aria-hidden="true"
            className="absolute -left-6 top-0 w-6 h-6 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 0 100%, transparent 24px, #000000 24.5px)",
            }}
          />

          {/* Desktop Solid #000 Dock */}
          <nav
            aria-label="Desktop Portfolio Navigation"
            className="relative flex items-center gap-1.5 px-3 py-1.5 bg-[#000000] border-x border-b border-[rgba(255,255,255,0.08)] rounded-b-[24px] shadow-[0_0_40px_rgba(26,47,208,0.45)]"
          >
            {DESKTOP_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeTab === item.id ||
                (item.id === "journey-timeline" && activeTab === "journey");

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleScroll(item.target, item.id)}
                  className={`relative px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-mono transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-[#000000] font-semibold"
                      : "text-[#8a8a85] bg-[#111111] hover:text-[#f5f5f5]"
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Framer Motion layoutId sliding pill animation */}
                  {isActive && (
                    <Motion.div
                      layoutId="desktop-notch-active-pill"
                      className="absolute inset-0 bg-[#f5f5f5] rounded-2xl shadow-sm z-0"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isActive ? "text-[#000000]" : "text-[#8a8a85]"
                      }`}
                    />
                    <span className="tracking-wider uppercase text-[11px]">
                      {item.label}
                    </span>
                  </span>
                </button>
              );
            })}

            {/* Let's talk button: bg #1a2fd0, text white, hover glow blue */}
            <button
              type="button"
              onClick={() => handleScroll("#contact", "contact")}
              className="h-8 px-4 rounded-2xl bg-[#1a2fd0] text-[#f5f5f5] text-[11px] font-mono uppercase tracking-wider font-semibold hover:shadow-[0_0_24px_rgba(26,47,208,0.7)] hover:bg-[#1a2fd0]/90 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center ml-1"
              title="Let's Talk"
            >
              <span>Let&apos;s talk</span>
            </button>

            {/* Avatar with 1px border ring and green online dot */}
            <div
              className="relative ml-1 w-7 h-7 rounded-full p-[1px] border border-[rgba(255,255,255,0.08)] bg-[#0a0a0a] flex-shrink-0"
              title="Ashish Kapoor • Online"
            >
              <img
                src="/assets/boy.webp"
                alt="Ashish Kapoor"
                className="w-full h-full object-cover rounded-full"
              />
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#22c55e] ring-2 ring-[#000000]"
                aria-label="Online"
              />
            </div>
          </nav>

          {/* Top-right fillet (::after equivalent) */}
          <div
            aria-hidden="true"
            className="absolute -right-6 top-0 w-6 h-6 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 100% 100%, transparent 24px, #000000 24.5px)",
            }}
          />
        </div>
      </header>

      {/* =========================================================================
          MOBILE NOTCHED DOCK (max-width: 767px): Notch at BOTTOM
          - position: fixed; bottom: 0; left: 50%; transform: translateX(-50%).
          - Top corners rounded 24px, bottom corners square, flush with the screen bottom.
          - Fillets on bottom-left and bottom-right:
            radial-gradient(circle at 0 0, transparent 24px, #000 24.5px)
            radial-gradient(circle at 100% 0, transparent 24px, #000 24.5px)
          - padding-bottom: env(safe-area-inset-bottom).
          - ICONS ONLY. No text labels at all (keep aria-label on each button).
            Active = white (#f5f5f5) rounded pill with a black icon.
            Inactive = #111 pill with a #8a8a85 icon.
          - Items: Home, Work, Craft, Projects, Talk (avatar with green online dot).
          ========================================================================= */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="relative flex items-center justify-center">
          {/* Bottom-left fillet (::before equivalent) */}
          <div
            aria-hidden="true"
            className="absolute -left-6 bottom-0 w-6 h-6 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 0 0, transparent 24px, #000000 24.5px)",
            }}
          />

          {/* Mobile Solid #000 Dock: top corners rounded 24px, bottom flush */}
          <div className="relative flex items-center gap-2 px-3 py-2 bg-[#000000] border-x border-t border-[rgba(255,255,255,0.08)] rounded-t-[24px] shadow-[0_0_40px_rgba(26,47,208,0.45)]">
            {MOBILE_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleScroll(item.target, item.id)}
                  className={`relative w-10 h-10 rounded-2xl flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-[#000000]"
                      : "text-[#8a8a85] bg-[#111111] hover:text-[#f5f5f5]"
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Framer Motion layoutId sliding pill animation */}
                  {isActive && (
                    <Motion.div
                      layoutId="mobile-notch-active-pill"
                      className="absolute inset-0 bg-[#f5f5f5] rounded-2xl shadow-sm z-0"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}

                  <span className="relative z-10 flex items-center justify-center">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-[#000000]" : "text-[#8a8a85]"
                      }`}
                    />
                  </span>
                </button>
              );
            })}

            {/* Talk (avatar with green online dot): Active = white pill border/glow */}
            <button
              type="button"
              onClick={() => handleScroll("#contact", "contact")}
              className={`relative w-10 h-10 rounded-2xl flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                activeTab === "contact"
                  ? "text-[#000000]"
                  : "bg-[#111111] text-[#8a8a85]"
              }`}
              aria-label="Navigate to Contact and Talk"
              aria-current={activeTab === "contact" ? "page" : undefined}
            >
              {activeTab === "contact" && (
                <Motion.div
                  layoutId="mobile-notch-active-pill"
                  className="absolute inset-0 bg-[#f5f5f5] rounded-2xl shadow-sm z-0"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 34,
                  }}
                />
              )}

              <div className="relative z-10 w-6 h-6 rounded-full overflow-hidden p-[1px] border border-[rgba(255,255,255,0.15)] bg-[#0a0a0a]">
                <img
                  src="/assets/boy.webp"
                  alt="Ashish"
                  className="w-full h-full object-cover rounded-full"
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#22c55e] ring-1 ring-[#000000]"
                  aria-label="Online"
                />
              </div>
            </button>
          </div>

          {/* Bottom-right fillet (::after equivalent) */}
          <div
            aria-hidden="true"
            className="absolute -right-6 bottom-0 w-6 h-6 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 100% 0, transparent 24px, #000000 24.5px)",
            }}
          />
        </div>
      </nav>
    </>
  );
}
