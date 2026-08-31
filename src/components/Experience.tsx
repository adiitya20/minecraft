"use client";

import type { ReactNode } from "react";
import { useLenis } from "@/lib/useLenis";
import { ExperienceProvider } from "@/context/ExperienceContext";
import { LoadingScreen } from "./LoadingScreen";
import { Navbar } from "./Navbar";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { Hero } from "./Hero";
import { About } from "./About";
import { CareerObjective } from "./CareerObjective";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { ProjectDetail } from "./projects/ProjectDetail";
import { EducationTimeline } from "./EducationTimeline";
import { Leadership } from "./Leadership";
import { Resume } from "./Resume";
import { Achievements } from "./Achievements";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { EasterEggs } from "./EasterEggs";

function SmoothRoot({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}

export function Experience({ children }: { children?: ReactNode }) {
  return (
    <ExperienceProvider>
      <SmoothRoot>
        <a href="#about" className="skip-link">
          Skip to content
        </a>
        <LoadingScreen />
        <Navbar />
        <CustomCursor />
        <ScrollProgress />
        <EasterEggs />
        <div className="grain" />
        <main>
          <Hero />
          <About />
          <CareerObjective />
          <Skills />
          <Projects />
          <EducationTimeline />
          <Leadership />
          <Resume />
          <Achievements />
          <Contact />
        </main>
        <Footer />
        <ProjectDetail />
        {children}
      </SmoothRoot>
    </ExperienceProvider>
  );
}
