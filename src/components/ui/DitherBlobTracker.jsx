import { useEffect, useRef, useState } from "react";

/* --- 4x4 BAYER MATRIX FOR AUTHENTIC 1-BIT DITHER MODE --- */
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export default function DitherBlobTracker() {
  const [isTouchOrMobile, setIsTouchOrMobile] = useState(true);

  useEffect(() => {
    const checkTouchOrMobile = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isHoverNone = window.matchMedia("(hover: none)").matches;
      const isSmall = window.innerWidth <= 767;
      setIsTouchOrMobile(Boolean(isCoarse || isHoverNone || isSmall));
    };

    checkTouchOrMobile();
    window.addEventListener("resize", checkTouchOrMobile, { passive: true });
    return () => window.removeEventListener("resize", checkTouchOrMobile);
  }, []);

  // Mode options: "liquid" | "ambient" | "dither" | "off"
  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") return "off";
    try {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isHoverNone = window.matchMedia("(hover: none)").matches;
      const isSmall = window.innerWidth <= 767;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isCoarse || isHoverNone || isSmall || prefersReducedMotion) return "off";

      const saved = localStorage.getItem("portfolio_fx_mode");
      if (saved && ["liquid", "ambient", "dither", "off"].includes(saved)) {
        return saved;
      }
      return "liquid";
    } catch {
      return "off";
    }
  });

  const canvasRef = useRef(null);
  const svgRef = useRef(null);

  // Sync mode with localStorage & HTML root class for cursor coordination
  useEffect(() => {
    if (isTouchOrMobile) return;
    try {
      localStorage.setItem("portfolio_fx_mode", mode);
    } catch {
      /* noop */
    }

    const root = document.documentElement;
    if (mode === "liquid") {
      root.classList.add("cursor-fx-liquid");
    } else {
      root.classList.remove("cursor-fx-liquid");
    }

    return () => {
      root.classList.remove("cursor-fx-liquid");
    };
  }, [mode, isTouchOrMobile]);

  /* -------------------------------------------------------------
     MODE 1: LIQUID METABALL CURSOR (SVG Gooey Filter + Mercury Physics)
     ------------------------------------------------------------- */
  useEffect(() => {
    if (isTouchOrMobile) return undefined;
    if (mode !== "liquid") return undefined;
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const svg = svgRef.current;
    if (!svg) return undefined;

    const c0 = svg.querySelector("#node-0");
    const c1 = svg.querySelector("#node-1");
    const c2 = svg.querySelector("#node-2");
    const c3 = svg.querySelector("#node-3");
    const c4 = svg.querySelector("#node-4");
    const circleEls = [c0, c1, c2, c3, c4].filter(Boolean);

    let animId = null;
    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
      isHovering: false,
      isClicking: false,
      hasMoved: false,
    };

    const nodes = [
      { x: mouse.x, y: mouse.y, vx: 0, vy: 0, r: 13, targetR: 13, mass: 1 },
      { x: mouse.x, y: mouse.y, vx: 0, vy: 0, r: 10, targetR: 10, mass: 1.4 },
      { x: mouse.x, y: mouse.y, vx: 0, vy: 0, r: 7.5, targetR: 7.5, mass: 1.9 },
      { x: mouse.x, y: mouse.y, vx: 0, vy: 0, r: 5.5, targetR: 5.5, mass: 2.5 },
      { x: mouse.x, y: mouse.y, vx: 0, vy: 0, r: 4, targetR: 4, mass: 3.2 },
    ];

    const onMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (!mouse.hasMoved) {
        mouse.hasMoved = true;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        nodes.forEach((n) => {
          n.x = e.clientX;
          n.y = e.clientY;
        });
      }
    };

    const onMouseDown = () => {
      mouse.isClicking = true;
    };
    const onMouseUp = () => {
      mouse.isClicking = false;
    };

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

    const onMouseOver = (e) => {
      if (e.target.closest(interactiveSelector)) {
        mouse.isHovering = true;
      }
    };
    const onMouseOut = (e) => {
      if (e.target.closest(interactiveSelector)) {
        mouse.isHovering = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    const render = () => {
      if (!mouse.hasMoved) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Snappy lead tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.38;
      mouse.y += (mouse.targetY - mouse.y) * 0.38;

      const hoverScale = mouse.isHovering ? 1.7 : mouse.isClicking ? 0.75 : 1;

      // Spring physics through the chain of metaballs
      nodes.forEach((node, i) => {
        const leader = i === 0 ? mouse : nodes[i - 1];
        const springK = 0.32 / node.mass;
        const damping = 0.64;

        node.vx = (node.vx + (leader.x - node.x) * springK) * damping;
        node.vy = (node.vy + (leader.y - node.y) * springK) * damping;
        node.x += node.vx;
        node.y += node.vy;

        // Dynamic fluid stretch
        const speed = Math.hypot(node.vx, node.vy);
        const stretch = Math.min(speed * 0.25, 6);
        const desiredR = node.targetR * hoverScale + stretch;
        node.r += (desiredR - node.r) * 0.18;

        const el = circleEls[i];
        if (el) {
          el.setAttribute("cx", node.x.toFixed(2));
          el.setAttribute("cy", node.y.toFixed(2));
          el.setAttribute("r", Math.max(1, node.r).toFixed(2));
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [mode, isTouchOrMobile]);

  /* -------------------------------------------------------------
     MODE 2 & 3: AMBIENT GLOW / 1-BIT MICRO-DITHER (Canvas)
     ------------------------------------------------------------- */
  useEffect(() => {
    if (isTouchOrMobile) return undefined;
    if (mode !== "ambient" && mode !== "dither") return undefined;
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { willReadFrequently: mode === "dither" });
    if (!ctx) return undefined;

    let animId = null;
    let width = 0;
    let height = 0;
    // Ambient uses 1:1 smooth rendering; Dither uses 2x scale for fine micro-stipples
    const scale = mode === "dither" ? 2 : 1;

    const mouse = {
      x: -500,
      y: -500,
      targetX: -500,
      targetY: -500,
      isHovering: false,
    };

    // Ambient/Dither trailing orbs
    const orbs = [
      { x: -500, y: -500, vx: 0, vy: 0, r: 42, mass: 1 },
      { x: -500, y: -500, vx: 0, vy: 0, r: 28, mass: 1.6 },
      { x: -500, y: -500, vx: 0, vy: 0, r: 18, mass: 2.3 },
    ];

    const resize = () => {
      width = Math.ceil(window.innerWidth / scale);
      height = Math.ceil(window.innerHeight / scale);
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouseMove = (e) => {
      mouse.targetX = e.clientX / scale;
      mouse.targetY = e.clientY / scale;
      if (mouse.x < 0) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
        orbs.forEach((o) => {
          o.x = mouse.targetX;
          o.y = mouse.targetY;
        });
      }
    };

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

    const onMouseOver = (e) => {
      if (e.target.closest(interactiveSelector)) mouse.isHovering = true;
    };
    const onMouseOut = (e) => {
      if (e.target.closest(interactiveSelector)) mouse.isHovering = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.24;
      mouse.y += (mouse.targetY - mouse.y) * 0.24;

      orbs.forEach((orb, i) => {
        const leader = i === 0 ? mouse : orbs[i - 1];
        const k = 0.26 / orb.mass;
        const damping = 0.68;
        orb.vx = (orb.vx + (leader.x - orb.x) * k) * damping;
        orb.vy = (orb.vy + (leader.y - orb.y) * k) * damping;
        orb.x += orb.vx;
        orb.y += orb.vy;
      });

      ctx.clearRect(0, 0, width, height);

      if (mouse.x > -100) {
        if (mode === "ambient") {
          // --- AMBIENT GLOW MODE: Soft, atmospheric radial light behind/over cards ---
          ctx.save();
          orbs.forEach((orb, i) => {
            const rad = orb.r * (mouse.isHovering ? 1.5 : 1.2);
            const grad = ctx.createRadialGradient(
              orb.x,
              orb.y,
              0,
              orb.x,
              orb.y,
              rad * 1.8
            );
            if (i === 0) {
              grad.addColorStop(0, "rgba(255, 255, 255, 0.16)");
              grad.addColorStop(0.4, "rgba(99, 102, 241, 0.10)");
              grad.addColorStop(1, "rgba(0, 0, 0, 0)");
            } else {
              grad.addColorStop(0, "rgba(129, 140, 248, 0.12)");
              grad.addColorStop(0.5, "rgba(56, 189, 248, 0.06)");
              grad.addColorStop(1, "rgba(0, 0, 0, 0)");
            }
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, rad * 1.8, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.restore();
        } else if (mode === "dither") {
          // --- 1-BIT MICRO-DITHER MODE: Refined stipple halo (never solid white disc) ---
          let minX = width;
          let minY = height;
          let maxX = 0;
          let maxY = 0;

          orbs.forEach((o) => {
            const pad = o.r * 1.8;
            minX = Math.max(0, Math.min(minX, Math.floor(o.x - pad)));
            minY = Math.max(0, Math.min(minY, Math.floor(o.y - pad)));
            maxX = Math.min(width, Math.max(maxX, Math.ceil(o.x + pad)));
            maxY = Math.min(height, Math.max(maxY, Math.ceil(o.y + pad)));
          });

          if (minX < maxX && minY < maxY) {
            const boxW = maxX - minX;
            const boxH = maxY - minY;
            const imgData = ctx.createImageData(boxW, boxH);
            const data = imgData.data;

            for (let py = 0; py < boxH; py++) {
              const worldY = minY + py;
              const bayerRow = BAYER_4X4[worldY & 3];

              for (let px = 0; px < boxW; px++) {
                const worldX = minX + px;
                let intensity = 0;

                // Stipple ring around cursor orbs
                for (let b = 0; b < orbs.length; b++) {
                  const dx = worldX - orbs[b].x;
                  const dy = worldY - orbs[b].y;
                  const dist = Math.hypot(dx, dy);
                  const targetRad = orbs[b].r;

                  // Soft annular stippling falloff
                  if (dist < targetRad * 1.6) {
                    const normDist = dist / (targetRad * 1.6);
                    intensity += Math.sin(normDist * Math.PI) * (0.55 / (b + 1));
                  }
                }

                // Micro-stipple Bayer thresholding
                if (intensity > 0.12) {
                  const threshold = (bayerRow[worldX & 3] + 0.5) / 16.0;
                  if (intensity > threshold * 0.8) {
                    const idx = (py * boxW + px) * 4;
                    data[idx] = 255;
                    data[idx + 1] = 255;
                    data[idx + 2] = 255;
                    // Delicate alpha so it never obscures text
                    data[idx + 3] = 45;
                  }
                }
              }
            }
            ctx.putImageData(imgData, minX, minY);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [mode, isTouchOrMobile]);

  return (
    <>
      {/* -------------------------------------------------------------
          MODE 1: LIQUID METABALL CURSOR LAYER (mix-blend-difference)
          Inverts text underneath with organic fluid surface tension
          ------------------------------------------------------------- */}
      {mode === "liquid" && (
        <svg
          ref={svgRef}
          className="pointer-events-none fixed inset-0 z-[9999] w-screen h-screen mix-blend-difference select-none"
          aria-hidden="true"
        >
          <defs>
            <filter id="liquid-goo-filter" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
          <g filter="url(#liquid-goo-filter)" fill="#ffffff">
            <circle id="node-0" cx="-100" cy="-100" r="13" />
            <circle id="node-1" cx="-100" cy="-100" r="10" />
            <circle id="node-2" cx="-100" cy="-100" r="7.5" />
            <circle id="node-3" cx="-100" cy="-100" r="5.5" />
            <circle id="node-4" cx="-100" cy="-100" r="4" />
          </g>
        </svg>
      )}

      {/* -------------------------------------------------------------
          MODE 2 & 3: AMBIENT GLOW / 1-BIT DITHER CANVAS
          ------------------------------------------------------------- */}
      {(mode === "ambient" || mode === "dither") && (
        <canvas
          ref={canvasRef}
          className={`pointer-events-none fixed inset-0 z-20 w-screen h-screen select-none ${
            mode === "ambient" ? "mix-blend-screen opacity-90 blur-xl" : "mix-blend-screen opacity-70"
          }`}
          style={mode === "dither" ? { imageRendering: "pixelated" } : undefined}
          aria-hidden="true"
        />
      )}

      {/* -------------------------------------------------------------
          LUXURY FLOATING FX DOCK (Desktop only with mouse; never rendered on touch/mobile)
          ------------------------------------------------------------- */}
      {!isTouchOrMobile && (
        <div className="fixed bottom-6 left-6 z-50 hidden md:flex items-center gap-2 select-none">
        {/* Sleek FX badge (No React logo) */}
        <div
          className="h-10 px-3.5 rounded-full bg-[#0c0c0e]/90 backdrop-blur-xl border border-white/15 flex items-center justify-center text-xs font-mono font-bold tracking-widest text-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
          title="Motion & Cursor Effects"
        >
          <span className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                mode !== "off" ? "bg-white animate-pulse" : "bg-white/30"
              }`}
            />
            <span>FX</span>
          </span>
        </div>

        {/* Capsule pill container: active button changes background to crisp white */}
        <nav
          aria-label="Cursor & Background Effect Switcher"
          className="h-10 rounded-full bg-[#0c0c0e]/90 backdrop-blur-xl border border-white/15 p-1 flex items-center gap-1 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
        >
          {[
            { key: "liquid", label: "Liquid" },
            { key: "ambient", label: "Ambient" },
            { key: "dither", label: "1-Bit" },
            { key: "off", label: "Off" },
          ].map((item) => {
            const isActive = mode === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setMode(item.key)}
                className={`h-full px-3.5 rounded-full flex items-center justify-center text-xs font-sans font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-[0_2px_12px_rgba(255,255,255,0.3)] scale-[1.02]"
                    : "text-white/60 hover:text-white hover:bg-white/[0.08]"
                }`}
                title={`Switch effect to ${item.label}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      )}
    </>
  );
}
