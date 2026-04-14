import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function TextAn({
  children,
  className,
  animateOnScroll = true,
  delay = 0.1,
}) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return undefined;

    const allLines = [];

    const safeRevert = (split) => {
      if (!split) return;
      const firstLine = split?.lines?.[0];
      // If React already removed/replaced nodes, revert() can throw removeChild errors.
      if (!firstLine?.parentNode) return;
      try {
        split.revert();
      } catch (_) {
        /* noop */
      }
    };

    const ctx = gsap.context(() => {
      let elements = [];
      if (containerRef.current.hasAttribute("data-copy-wapper")) {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((el) => {
        // Revert previous split ONLY when it's safe (prevents stacking without cleanup crashes)
        safeRevert(el._rbSplitText);
        el._rbSplitText = null;

        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
        });
        el._rbSplitText = split;

        const computedStyle = window.getComputedStyle(el);
        const textIndent = computedStyle.textIndent;
        if (textIndent !== "0px") {
          if (split.lines.length > 0) split.lines[0].style.paddingLeft = textIndent;
          el.style.textIndent = "0px";
        }

        allLines.push(...split.lines);
      });

      gsap.set(allLines, { y: "100%", opacity: 0 });

      const animationProps = {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        delay,
        force3D: true,
        willChange: "transform, opacity",
        onComplete: () => gsap.set(allLines, { clearProps: "opacity,transform" }),
      };

      if (animateOnScroll) {
        gsap.to(allLines, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        });
      } else {
        gsap.to(allLines, animationProps);
      }
    }, containerRef);

    return () => {
      // Kill animations/ScrollTriggers, but DON'T revert SplitText on unmount.
      // In dev StrictMode/HMR, React may remove nodes before revert() runs -> removeChild error.
      try {
        ctx.revert();
      } catch (_) {
        /* noop */
      }
    };
  }, [animateOnScroll, delay]);

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children, {
      ref: containerRef,
    });
  }

  return (
    <div
      ref={containerRef}
      className={`flex flex-col ${className} lines items-center w-full sm:flex-row justify-between pb-4 sm:pb-0`}
      data-copy-wapper="true"
    >
      {children}
    </div>
  );
}
