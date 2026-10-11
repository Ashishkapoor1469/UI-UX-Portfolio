import { useEffect, useRef } from "react";
import gsap from "gsap";

/* --- PLAYFUL DEVELOPER & ENGINEERING DOODLE SVGS --- */

// 1. Cute Laptop Dev Doodle with Eyes & Code Tag
function LaptopDoodle({ className = "" }) {
  return (
    <svg viewBox="0 0 100 85" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="10" width="64" height="46" rx="7" stroke="white" strokeWidth="2.5" fill="#0d0d0d" />
      <rect x="23" y="15" width="54" height="36" rx="4" fill="#141416" />
      <rect x="26" y="18" width="16" height="7" rx="2" fill="white" fillOpacity="0.18" />
      <path d="M29 22 L31 20 M39 22 L37 24" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="43" cy="32" rx="2.5" ry="3.5" fill="white" />
      <ellipse cx="57" cy="32" rx="2.5" ry="3.5" fill="white" />
      <path d="M47 38 Q50 42 53 38" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M8 60 L92 60 L84 72 L16 72 Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="#121214" />
      <rect x="42" y="63" width="16" height="5" rx="1.5" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// 2. Playful Saturn Planet with Orbit Ring
function PlanetDoodle({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="27" stroke="white" strokeWidth="2.5" fill="#0d0d0d" />
      <ellipse cx="38" cy="40" rx="5" ry="9" stroke="white" strokeWidth="2" fill="none" transform="rotate(-24 38 40)" />
      <ellipse cx="61" cy="59" rx="3.5" ry="6" stroke="white" strokeWidth="2" fill="none" transform="rotate(-24 61 59)" />
      <path
        d="M12 62 C 14 36, 72 20, 88 38 C 96 48, 80 64, 50 73 C 28 78, 8 72, 12 62"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M78 18 L80 12 L82 18 L88 20 L82 22 L80 28 L78 22 L72 20 Z" fill="white" />
      <circle cx="22" cy="26" r="1.5" fill="white" />
    </svg>
  );
}

// 3. Pixel Mascot with Checkered Flag
function PixelMascotDoodle({ className = "" }) {
  return (
    <svg viewBox="0 0 95 95" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="10" x2="50" y2="46" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="50" y="10" width="7" height="7" fill="white" />
      <rect x="64" y="10" width="7" height="7" fill="white" />
      <rect x="57" y="17" width="7" height="7" fill="white" />
      <rect x="71" y="17" width="7" height="7" fill="white" />
      <rect x="50" y="24" width="7" height="7" fill="white" />
      <rect x="64" y="24" width="7" height="7" fill="white" />
      <path d="M50 10 L78 10 L78 31 L50 31 Z" stroke="white" strokeWidth="2" fill="none" />
      <rect x="22" y="44" width="38" height="30" rx="4" stroke="white" strokeWidth="2.5" fill="#0d0d0d" />
      <rect x="14" y="52" width="8" height="12" rx="2" stroke="white" strokeWidth="2.5" fill="#0d0d0d" />
      <path d="M30 52 L34 49 L38 52" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 52 L48 49 L52 52" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="25" y="74" width="6" height="8" rx="2" fill="white" />
      <rect x="35" y="74" width="6" height="8" rx="2" fill="white" />
      <rect x="47" y="74" width="6" height="8" rx="2" fill="white" />
    </svg>
  );
}

// 4. Playful Design Vector Shape with Cursor
function CursorShapeDoodle({ className = "" }) {
  return (
    <svg viewBox="0 0 95 95" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26 42 C 20 30, 36 24, 46 32 C 58 22, 72 30, 68 42 C 78 50, 70 64, 56 62 C 46 68, 32 64, 32 54 C 20 52, 20 44, 26 42 Z"
        stroke="white"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="#0d0d0d"
      />
      <g transform="translate(48, 44)">
        <path d="M0 0 L15 15 L9 16 L13 25 L9 27 L5 18 L0 22 Z" fill="white" stroke="#000" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// 5. Cute Developer Wrench with Eyes
function WrenchDoodle({ className = "" }) {
  return (
    <svg viewBox="0 0 95 95" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(25 48 48)">
        <path
          d="M36 22 C 36 12, 60 12, 60 22 C 60 28, 54 30, 52 38 L 52 68 C 52 74, 44 74, 44 68 L 44 38 C 42 30, 36 28, 36 22 Z"
          stroke="white"
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill="#0d0d0d"
        />
        <circle cx="45" cy="24" r="2.5" fill="white" />
        <circle cx="51" cy="24" r="2.5" fill="white" />
      </g>
    </svg>
  );
}

export default function BigTextSlide({ title, subtitle, isActive = true }) {
  const itemsRef = useRef([]);
  const textRef = useRef(null);

  // Pick unique doodle elements per slide title
  const getDoodles = (slideTitle) => {
    switch (slideTitle) {
      case "SYSTEMS MINDSET":
        return [
          <WrenchDoodle key="w" className="w-full h-full" />,
          <PlanetDoodle key="p" className="w-full h-full" />,
          <LaptopDoodle key="l" className="w-full h-full" />,
          <PixelMascotDoodle key="m" className="w-full h-full" />,
        ];
      case "MOTION WITH PURPOSE":
        return [
          <CursorShapeDoodle key="c" className="w-full h-full" />,
          <PlanetDoodle key="p" className="w-full h-full" />,
          <PixelMascotDoodle key="m" className="w-full h-full" />,
          <LaptopDoodle key="l" className="w-full h-full" />,
        ];
      case "LET’S SHIP":
        return [
          <PixelMascotDoodle key="m" className="w-full h-full" />,
          <PlanetDoodle key="p" className="w-full h-full" />,
          <LaptopDoodle key="l" className="w-full h-full" />,
          <CursorShapeDoodle key="c" className="w-full h-full" />,
        ];
      default: // "PRODUCT FEEL"
        return [
          <LaptopDoodle key="l" className="w-full h-full" />,
          <PlanetDoodle key="p" className="w-full h-full" />,
          <PixelMascotDoodle key="m" className="w-full h-full" />,
          <CursorShapeDoodle key="c" className="w-full h-full" />,
        ];
    }
  };

  const doodles = getDoodles(title);

  useEffect(() => {
    // Entrance animation for corner doodles
    gsap.fromTo(
      itemsRef.current.filter(Boolean),
      {
        opacity: 0,
        scale: 0.7,
      },
      {
        opacity: 0.7,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        stagger: 0.1,
      }
    );

    // Ultra-smooth slow-motion floating for corner doodles
    const tweens = [];
    itemsRef.current.filter(Boolean).forEach((el, i) => {
      const direction = i % 2 === 0 ? 1 : -1;

      const yTween = gsap.to(el, {
        y: `+=${10 + i * 2}`,
        x: `+=${direction * (6 + i)}`,
        duration: 7 + i * 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const rotTween = gsap.to(el, {
        rotation: direction * (5 + i),
        duration: 9 + i * 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      tweens.push(yTween, rotTween);
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative flex h-full max-h-screen w-screen items-center justify-center bg-black overflow-hidden px-4 sm:px-8 md:px-12 select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-3xl" />
      </div>

      {/* 4 Corner Doodles: Safely positioned BELOW the fixed navbar (top-24) to avoid any header collision */}
      
      {/* 0. Top-Left Doodle: Clear of 'ASHISH' logo */}
      <div
        ref={(el) => (itemsRef.current[0] = el)}
        className="absolute top-22 sm:top-24 left-6 sm:left-12 z-10 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 pointer-events-none will-change-transform opacity-60 hover:opacity-100 transition-opacity filter drop-shadow-[0_0_12px_rgba(255,255,255,0.12)]"
      >
        {doodles[0]}
      </div>

      {/* 1. Top-Right Doodle: Clear of navigation links */}
      <div
        ref={(el) => (itemsRef.current[1] = el)}
        className="absolute top-22 sm:top-24 right-6 sm:right-12 z-10 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 pointer-events-none will-change-transform opacity-60 hover:opacity-100 transition-opacity filter drop-shadow-[0_0_12px_rgba(255,255,255,0.12)]"
      >
        {doodles[1]}
      </div>

      {/* 2. Bottom-Left Doodle */}
      <div
        ref={(el) => (itemsRef.current[2] = el)}
        className="absolute bottom-10 sm:bottom-12 left-6 sm:left-12 z-10 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 pointer-events-none will-change-transform opacity-60 hover:opacity-100 transition-opacity filter drop-shadow-[0_0_12px_rgba(255,255,255,0.12)]"
      >
        {doodles[2]}
      </div>

      {/* 3. Bottom-Right Doodle */}
      <div
        ref={(el) => (itemsRef.current[3] = el)}
        className="absolute bottom-10 sm:bottom-12 right-6 sm:right-12 z-10 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 pointer-events-none will-change-transform opacity-60 hover:opacity-100 transition-opacity filter drop-shadow-[0_0_12px_rgba(255,255,255,0.12)]"
      >
        {doodles[3]}
      </div>

      {/* CENTER CONTENT: Perfectly sized to fit cleanly on all screen heights */}
      <div
        ref={textRef}
        className="relative z-10 max-w-4xl text-center px-4 flex flex-col items-center justify-center my-auto"
      >
        {/* Placeholder spacer where the single travelling rocket parks */}
        <div className="h-16 sm:h-20 md:h-22 w-full mb-1" />

        {/* Big Section Title: Dynamic Glow & Reveal */}
        <h2
          style={{ fontFamily: "stain" }}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none uppercase tracking-tight transition-all duration-700 select-none ${
            isActive
              ? "text-white scale-100 opacity-100 drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]"
              : "text-white/40 scale-95 opacity-40"
          }`}
        >
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p
            className={`mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/70 leading-relaxed max-w-xl mx-auto transition-all duration-700 ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
