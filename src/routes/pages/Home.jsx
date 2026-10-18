import { lazy, Suspense } from "react";
import ReactLenis from "lenis/react";
import NotchDock from "../../components/NotchDock";
import Landing from "../../components/home/LandingAnimation";
import Hero from "../../components/home/hero";

const WorkGrid = lazy(() => import("../../components/home/workgrid"));
const FlexCarousel = lazy(() => import("../../components/home/FlexCarouselSection"));
const HrSection = lazy(() => import("../../components/home/horizontalscrollsection"));
const Projects = lazy(() => import("../../components/home/projects"));
const Journey = lazy(() => import("../../components/home/journey"));
const Proof = lazy(() => import("../../components/home/proof"));
const CTA = lazy(() => import("../../components/home/cta"));
const Footer = lazy(() => import("../../components/home/footer"));

export default function Home() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <main
        className="bg-black text-white font-body w-full min-h-screen overflow-x-hidden"
        role="main"
      >
        <Landing />
        <NotchDock />
        <Hero />
        <Suspense fallback={<div id="selected" className="min-h-[500px] w-full" aria-hidden="true" />}>
          <WorkGrid />
        </Suspense>
        <Suspense fallback={<div id="craft" className="min-h-[540px] w-full" aria-hidden="true" />}>
          <FlexCarousel />
        </Suspense>
        <Suspense fallback={<div className="min-h-[300px] w-full" aria-hidden="true" />}>
          <HrSection />
        </Suspense>
        <Suspense fallback={<div id="work" className="min-h-[600px] w-full" aria-hidden="true" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<div id="journey" className="min-h-[500px] w-full" aria-hidden="true" />}>
          <Journey />
        </Suspense>
        <Suspense fallback={<div className="min-h-[250px] w-full" aria-hidden="true" />}>
          <Proof />
        </Suspense>
        <Suspense fallback={<div id="contact" className="min-h-[400px] w-full" aria-hidden="true" />}>
          <CTA />
        </Suspense>
        <Suspense fallback={<div className="min-h-[160px] w-full" aria-hidden="true" />}>
          <Footer />
        </Suspense>
      </main>
    </ReactLenis>
  );
}

