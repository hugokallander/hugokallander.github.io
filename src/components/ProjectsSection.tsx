import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

// Responsive images with srcset for better performance & quality
import secureDatasetSharingSrcSet from "@/assets/Secure_dataset_sharing.png?w=600;800;1200;1600&format=webp&as=srcset&quality=100";
import secureDatasetSharingImg from "@/assets/Secure_dataset_sharing.png?w=800&format=webp&quality=100"; // Fallback

import dpoSrcSet from "@/assets/dpo.png?w=600;800;1200;1600&format=webp&as=srcset&quality=100";
import dpoImg from "@/assets/dpo.png?w=800&format=webp&quality=100"; // Fallback

import ptexImg from "@/assets/ptex.png?w=800&format=webp";
import startupImg from "@/assets/startup.jpg?w=800&format=webp";
import artifactsImg from "@/assets/artifacts.jpg?w=800&format=webp";

import modelhubSrcSet from "@/assets/riscale-modelhub.png?w=600;800;1200;1600&format=webp&as=srcset&quality=100";
import modelhubImg from "@/assets/riscale-modelhub.png?w=800&format=webp&quality=100"; // Fallback

import hyphaImg from "@/assets/hypha-logo-black.svg";

import Agents24SrcSet from "@/assets/24agents.png?w=600;800;1200;1600&format=webp&as=srcset&quality=100";
import Agents24 from "@/assets/24agents.png?w=800&format=webp&quality=100"; // Fallback

import pantheonImg from "@/assets/pantheon.png?w=800&format=webp";

import { FadeIn } from "./FadeIn";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  subtitle?: string;
  date: string;
  description: string;
  image?: string;
  srcSet?: string;
  url?: string;
  background?: string;
  role?: string;
}

const projects: Project[] = [
    {
      id: 0,
      title: "RI-SCALE Model Hub",
      subtitle: "AI Agent & Model Sharing Platform",
      role: "Creator",
      date: "Since February 2026",
      description: "A centralized platform for sharing scientific AI agents and models, which I architected and built for the RI-SCALE European research initiative.",
      image: modelhubImg,
      srcSet: modelhubSrcSet,
      url: "https://modelhub.riscale.eu",
    },
    {
      id: 1,
      title: "Safe Colab",
      subtitle: "AI-Protected Dataset Collaboration Platform",
      role: "Creator",
      date: "Since November 2025",
      description: "A secure collaboration platform for sensitive datasets. I designed the architecture to guarantee privacy through AI-enforced access controls.",
      image: secureDatasetSharingImg,
      srcSet: secureDatasetSharingSrcSet,
      url: "https://safe-colab.aicell.io",
    },
    {
      id: 2,
      title: "24Agents",
      subtitle: "AI Agent & Tool Research Repository",
      role: "Creator",
      date: "Since September 2025",
      description: "A repository of zero-install, always-on AI agents and hundreds of scientific tools. I built the platform to democratize access to advanced research utilities.",
      image: Agents24,
      srcSet: Agents24SrcSet,
      url: "https://24agents.aicell.io",
    },
    {
      id: 3,
      title: "PantheonOS",
      subtitle: "AI Data Scientist",
      role: "Key Contributor",
      date: "August 2025",
      description: "An open-source ecosystem of scientific AI agents developed with Stanford. I engineered the critical communication layer using Hypha, enabling seamless agent interoperability.",
      image: pantheonImg,
      url: "https://pantheonos.stanford.edu",
    },
    {
      id: 4,
      title: "Hypha Artifact",
      subtitle: "Filesystem API for Hypha Artifacts",
      role: "Creator",
      date: "Since May 2025",
      description: "A filesystem-like Python library for interacting with Hypha artifacts. I built it for Pyodide installation and as an intuitive API for AI agents. 17,000 downloads on PyPi.",
      image: artifactsImg,
      url: "https://clickpy.clickhouse.com/dashboard/hypha-artifact",
    },
    {
      id: 5,
      title: "Hypha Weaviate",
      subtitle: "Vector Database Services for Hypha",
      role: "Creator",
      date: "Since March 2025",
      description: "AI-first integration of Weaviate into Hypha. I implemented fine-grained access control and virtual collections, enabling performant cell segmentation search.",
      image: startupImg,
      url: "https://github.com/aicell-lab/hypha-startup-services",
    },
    {
      id: 6,
      title: "Hypha",
      subtitle: "AI-First Data Management System",
      role: "Key Contributor",
      date: "Since September 2024",
      description: "A serverless application platform designed for scalable AI workflows. I engineer core backend services and frontend interfaces, ensuring robust data management for scientific applications.",
      image: hyphaImg,
      background: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
      url: "https://hypha.aicell.io",
    },
    {
      id: 7,
      title: "DPO Titles",
      subtitle: "Engaging News Article Title Generator using DPO",
      role: "Author",
      date: "June 2024",
      description: "My master's thesis. In collaboration with the Norwegian newspaper Aftenposten, I fine-tuned a model to generate engaging article titles using Direct Preference Optimization (DPO).",
      image: dpoImg,
      srcSet: dpoSrcSet,
      url: "https://kth.diva-portal.org/smash/record.jsf?pid=diva2%3A1895800",
    },
    {
      id: 8,
      title: "Ptex Traverse/Discard",
      subtitle: "Real-time Texture Rendering Without UV Unwrapping",
      role: "Author",
      date: "June 2022",
      description: "My bachelor's thesis. Two novel implementations of per-face texture mapping (Ptex) for real-time graphics applications without UV unwrapping.",
      image: ptexImg,
      url: "https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1701157&dswid=-3287",
    },
];

interface ProjectCardProps {
  project: Project;
  isTouchDevice: boolean;
  isTouchFocused: boolean;
  onTouchFocus: (projectId: number) => void;
}

const ProjectCard = ({
  project,
  isTouchDevice,
  isTouchFocused,
  onTouchFocus,
}: ProjectCardProps) => {
  const displayTitle = project.subtitle
    ? `${project.title}: ${project.subtitle}`
    : project.title;
  
  return (
    <div
      className={cn(
        "group h-[22rem] sm:h-[26rem] block w-full transform-gpu transition-transform duration-700 ease-out active:scale-[0.96] focus:outline-none",
        isTouchFocused && "is-touch-focused"
      )}
      tabIndex={-1}
      onTouchStart={() => {}} // Enables hover state on touch devices
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl h-full bg-black isolation-isolate"
        )}
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-20 block cursor-pointer focus:outline-none"
          aria-label={`View project: ${displayTitle}`}
          onClick={(e) => {
            if (isTouchDevice && !isTouchFocused) {
              e.preventDefault();
              onTouchFocus(project.id);
            }
          }}
        >
          <span className="sr-only">View Project</span>
        </a>


        {project.image && (
          <>
            <img
              src={project.image}
              srcSet={project.srcSet}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
              alt=""
              aria-hidden="true"
              className={cn(
                "absolute -inset-[1px] h-[calc(100%+2px)] w-[calc(100%+2px)] max-w-none object-cover object-center transition-transform duration-500 will-change-transform [backface-visibility:hidden]",
                project.background ? [project.background, "object-contain p-12 opacity-100"] : "bg-zinc-950"
              )}
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
            />
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 bg-black/10 transition-colors duration-700 delay-200 group-hover:bg-black/50 group-focus-within:bg-black/50",
                isTouchFocused && "bg-black/50"
              )}
            />
            <div
              aria-hidden="true"
              className={cn("absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent")}
            />
          </>
        )}


        <div
          aria-hidden="true"
          className={cn("absolute bottom-6 right-6 z-30 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 overflow-hidden pointer-events-none",
            "w-[2.7rem] h-[2.7rem]"
          )}
        >
          <div
            className={cn(
              "absolute w-full h-full bg-[linear-gradient(to_right,transparent_30%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.05)_55%,transparent_70%)] -translate-x-[150%] group-hover:animate-shimmer-slide group-focus-within:animate-shimmer-slide",
              isTouchFocused && "animate-shimmer-slide"
            )}
          />
          <ChevronRight className="pl-[0.2rem] w-8 h-8 text-foreground relative z-10" />
        </div>

        <div className={cn("relative z-10 h-full p-6 pr-16 flex flex-col justify-end")}>
          <div className={cn("flex flex-wrap items-start justify-between gap-3 mb-1")}>
            <h3
              className={cn("text-lg sm:text-xl lg:text-3xl font-semibold text-foreground font-heading flex-1 min-w-0")}
              data-text={displayTitle}
            >
              <span className="block text-white leading-tight">{project.title}</span>
              {project.subtitle && (
                <span className="mt-1 block text-sm sm:text-base lg:text-xl font-medium text-amber-100 leading-tight">
                  {project.subtitle}
                </span>
              )}
            </h3>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <p className={cn("text-sm sm:text-base md:text-lg text-foreground/70 font-medium")}>
              {project.date}
            </p>
            {project.role && (
              <span className="text-xs sm:text-sm font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-white/80 border border-white/10 whitespace-nowrap backdrop-blur-sm">
                {project.role}
              </span>
            )}
          </div>

          <div
            className={cn(
              "grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 delay-300 group-hover:grid-rows-[1fr] group-hover:delay-0 group-focus-within:grid-rows-[1fr] group-focus-within:delay-0 [will-change:grid-template-rows]",
              isTouchFocused && "grid-rows-[1fr] delay-0"
            )}
          >
            <div className="overflow-hidden flex flex-col justify-end">
              <p
                className={cn(
                  "text-sm sm:text-base md:text-lg lg:text-xl text-foreground/90 leading-relaxed mt-2 drop-shadow-md max-w-[90%] opacity-0 transition-opacity duration-300 delay-0 group-hover:opacity-100 group-hover:delay-500 group-focus-within:opacity-100 group-focus-within:delay-500 will-change-[opacity]",
                  isTouchFocused && "opacity-100 delay-500"
                )}
              >
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [focusedProjectId, setFocusedProjectId] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia("(hover: none)");

    const updateTouchState = () => {
      const touchOnly = mediaQuery.matches;
      setIsTouchDevice(touchOnly);
      if (!touchOnly) {
        setFocusedProjectId(null);
      }
    };

    updateTouchState();
    mediaQuery.addEventListener("change", updateTouchState);

    return () => {
      mediaQuery.removeEventListener("change", updateTouchState);
    };
  }, []);

  return (
    
    <section className="mb-8 pb-20 md:px-6">
      <FadeIn threshold={0}>
        <h2 className="text-3xl md:text-4xl text-center mb-8">
          <span className="text-foreground/80 font-heading font-bold">My projects</span>
        </h2>
        {/* <div className="w-[calc(100%)] h-[2px]  bg-gradient-to-r from-transparent via-foreground/10 to-transparent mx-auto mb-12 rounded-full" /> */}
        <div className="relative max-w-6xl mx-auto border border-white/10 shadow-2xl bg-zinc-950/50 rounded-3xl py-8 px-4 sm:px-8 backdrop-blur-md">

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isTouchDevice={isTouchDevice}
                isTouchFocused={focusedProjectId === project.id}
                onTouchFocus={setFocusedProjectId}
              />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default ProjectsSection;
