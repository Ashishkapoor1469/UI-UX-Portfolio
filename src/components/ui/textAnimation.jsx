import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function TextAn({
  children,
  className,
  animateOnScroll = true,
  delay = 0.1,
}) {
  const containerRef = useRef(null);
  const elementRef = useRef([]);
  const splitRef = useRef([]);
  const lines = useRef([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      splitRef.current = [];
      elementRef.current = [];
      lines.current = [];

      let element = [];
      if (containerRef.current.hasAttribute("data-copy-wapper")) {
        element = Array.from(containerRef.current.children);
      } else {
        element = [containerRef.current];
      }

      element.forEach((el) => {
        elementRef.current.push(el);
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
        });
        splitRef.current.push(split);
        const compuredStyle = window.getComputedStyle(el);
        const textIndent = compuredStyle.textIndent;
        if (textIndent !== "0px") {
          if (split.lines.length > 0) {
            split.lines[0].style.paddingLeft = textIndent;
          }
          el.style.textIndent = "0px";
        }
        lines.current.push(...split.lines);
      });

      gsap.set(lines.current, { y: "100%", opacity: 0 });
      
      const animationProps = {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        delay: delay,
        force3D: true,
        willChange: "transform, opacity",
      };

      if (animateOnScroll) {
        gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        });
      } else {
        gsap.to(lines.current, animationProps);
      }

      return () => {
        splitRef.current.forEach((split) => {
          if (split) {
            split.revert();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay],
    }
  );

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
