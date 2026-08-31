"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Project } from "@/data/portfolio";

type CursorMode = "default" | "view" | "open";

type ExperienceContextValue = {
  loaded: boolean;
  setLoaded: (value: boolean) => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
  cursorMode: CursorMode;
  setCursorMode: (mode: CursorMode) => void;
  activeProject: Project | null;
  openProject: (project: Project) => void;
  closeProject: () => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const openProject = useCallback((project: Project) => {
    setActiveProject(project);
    window.__portfolioLenis?.stop();
    document.documentElement.classList.add("project-open");
    window.history.pushState({ project: project.slug }, "", `/projects/${project.slug}`);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
    window.__portfolioLenis?.start();
    document.documentElement.classList.remove("project-open");
    if (window.location.pathname.startsWith("/projects/")) {
      window.history.pushState({}, "", "/");
    }
  }, []);

  const value = useMemo(
    () => ({
      loaded,
      setLoaded,
      activeSection,
      setActiveSection,
      cursorMode,
      setCursorMode,
      activeProject,
      openProject,
      closeProject,
    }),
    [loaded, activeSection, cursorMode, activeProject, openProject, closeProject],
  );

  return (
    <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error("useExperience must be used within ExperienceProvider");
  }
  return ctx;
}
