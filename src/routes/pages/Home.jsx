import ReactLenis from "lenis/react";
import {
  CTA,
  Footer,
  Header,
  Hero,
  HrSection,
  Journey,
  Landing,
  Projects,
  Proof,
  WorkGrid,
} from "../../components/home";

export default function Home() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <main
        className="bg-black text-white font-body w-full min-h-screen overflow-x-hidden"
        role="main"
      >
        <Landing />
        <Header />
        <Hero />
        <WorkGrid />
        <HrSection />
        <Projects />
        <Journey />
        <Proof />
        <CTA />
        <Footer />
      </main>
    </ReactLenis>
  );
}
