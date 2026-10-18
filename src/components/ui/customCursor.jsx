import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [isTouchOrMobile, setIsTouchOrMobile] = useState(true);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

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

  useEffect(() => {
    // Don’t run on touch or mobile devices.
    if (isTouchOrMobile) return undefined;
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;
    if (window.matchMedia("(hover: none)").matches) return undefined;

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
  }, [isTouchOrMobile]);

  if (isTouchOrMobile) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="default-custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block h-10 w-10 rounded-full border border-white/25 mix-blend-difference"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="default-custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block h-2 w-2 rounded-full bg-white mix-blend-difference"
        aria-hidden="true"
      />
    </>
  );
}

