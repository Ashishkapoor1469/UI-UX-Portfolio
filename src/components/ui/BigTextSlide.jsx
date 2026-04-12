import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BigTextSlide({ title, subtitle }) {
  const itemsRef = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Decorative elements animation
    gsap.fromTo(
      itemsRef.current,
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 0.6,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
      }
    );

    // Floating animation for decorative elements
    itemsRef.current.forEach((el, i) => {
      const direction = i % 2 === 0 ? 1 : -1;

      gsap.to(el, {
        y: `+=${8 + i * 1.5}`,
        duration: 5 + i,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(el, {
        rotation: direction * (8 + i * 2),
        duration: 7 + i,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    // Text entrance animation
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-black overflow-hidden px-6 md:px-12">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Decorative images */}
      {[0, 1, 2, 3].map((i) => (
        <img
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
          src="/assets/2.png"
          className="absolute w-20 md:w-32 lg:w-44 -rotate-45 opacity-40 md:opacity-50 will-change-transform"
          alt=""
          loading="lazy"
          style={{
            top: i < 2 ? "2rem" : "auto",
            bottom: i >= 2 ? "2rem" : "auto",
            left: i % 2 === 0 ? "1.5rem" : "auto",
            right: i % 2 === 1 ? "1.5rem" : "auto",
          }}
        />
      ))}

      {/* TEXT CONTENT */}
      <div ref={textRef} className="relative z-10 max-w-5xl text-center">
        <h2
          style={{ fontFamily: "stain" }}
          className="text-4xl md:text-6xl lg:text-8xl font-bold leading-none text-white mb-4 md:mb-6"
        >
          {title}
        </h2>

        {subtitle && (
          <p className="text-base md:text-lg lg:text-xl text-white/60 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
