import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Don’t show on touch devices.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    const tick = () => {
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      gsap.set(dot, { x, y });
      gsap.set(ring, { x: rx, y: ry });
    };
    gsap.ticker.add(tick);

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

    const onOver = (e) => {
      const target = e.target.closest(interactiveSelector);
      if (!target) return;
      ring.dataset.state = "hover";
      gsap.to(ring, { scale: 1.6, duration: 0.25, ease: "power3.out" });
      gsap.to(dot, { scale: 0.6, duration: 0.25, ease: "power3.out" });
    };

    const onOut = (e) => {
      const target = e.target.closest(interactiveSelector);
      if (!target) return;
      ring.dataset.state = "idle";
      gsap.to(ring, { scale: 1, duration: 0.25, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.25, ease: "power3.out" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block h-10 w-10 rounded-full border border-white/25 mix-blend-difference"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block h-2 w-2 rounded-full bg-white mix-blend-difference"
        aria-hidden="true"
      />
    </>
  );
}

