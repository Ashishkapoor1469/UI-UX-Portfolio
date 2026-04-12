import ReactLenis from "lenis/react";
import {
  Footer,
  Header,
  Hero,
  HrSection,
  Landing,
  Projects,
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
        <Footer />
      </main>
    </ReactLenis>
  );
}
