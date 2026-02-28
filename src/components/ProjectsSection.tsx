import {
  ChevronRight,
  Shield,
  Package,
  Boxes,
  Newspaper,
  Monitor,
} from "lucide-react";

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
  date: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  tone: "primary" | "accent" | "secondary";
  image?: string;
  srcSet?: string;
  url?: string;
  githubRepo?: string;
  background?: string;
}

const projects: Project[] = [
    {
      id: 0,
      title: "RI-SCALE Model Hub: AI Agent & Model Sharing Platform",
      date: "Since February 2026",
      description: "The Model Hub is a platform for sharing scientific AI agents and models. I built it for use by the RI-SCALE European international research project.",
      tags: ["AI", "Cell Biology", "Hypha", "Image Analysis"],
      image: modelhubImg,
      srcSet: modelhubSrcSet,
      icon: Boxes,
      tone: "secondary",
      url: "https://modelhub.riscale.eu",
    },
    {
      id: 1,
      title: "Safe Colab: AI-Protected Dataset Collaboration Platform",
      date: "Since November 2025",
      description: "I built an innovative platform for securely inviting collaborators to work on sensitive datasets, with privacy guaranteed by AI.",
      tags: ["AI", "Security", "Privacy", "Data Sharing"],
      icon: Shield,
      tone: "primary",
      image: secureDatasetSharingImg,
      srcSet: secureDatasetSharingSrcSet,
      url: "https://safe-colab.aicell.io",
    },
    {
      id: 2,
      title: "24Agents: AI Agent & Tool Research Repository",
      date: "Since September 2025",
      description: "A platform for zero-install 24/7 agents and hundreds of scientific tools, contributed by me.",
      tags: ["AI", "Tools", "Research"],
      icon: Boxes,
      tone: "secondary",
      image: Agents24,
      srcSet: Agents24SrcSet,
      url: "https://24agents.aicell.io",
    },
    {
      id: 3,
      title: "PantheonOS: AI Data Scientist (Contributor)",
      date: "August 2025",
      description: "Collaboration with Stanford. An open source AI-powered ecosystem of scientific agents. I enabled the crucial integration of Hypha.",
      tags: ["AI", "Ecosystem", "Open Source"],
      icon: Boxes,
      tone: "primary",
      image: pantheonImg,
      url: "https://pantheonos.stanford.edu",
    },
    {
      id: 4,
      title: "File System-like Interface For Hypha Artifacts",
      date: "Since May 2025",
      description: "A filesystem-like Python library for interacting with Hypha artifacts. I built it for Pyodide installation and as an intuitive API for AI agents. 17,000 downloads on PyPi.",
      tags: ["Python", "Hypha", "Cloud Storage", "AsyncIO"],
      icon: Package,
      tone: "accent",
      image: artifactsImg,
      url: "https://clickpy.clickhouse.com/dashboard/hypha-artifact",
      githubRepo: "aicell-lab/hypha-artifact",
    },
    {
      id: 5,
      title: "Hypha: AI-First Data Management System (Contributor)",
      date: "Since September 2024",
      description: "An AI-first swiss knife platform for serverless apps. I've contributed to various parts of the system, from core backend services to frontend applications.",
      tags: ["AI", "Data Management", "Cell Biology", "Python"],
      icon: Boxes,
      tone: "primary",
      image: hyphaImg,
      background: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
      url: "https://hypha.aicell.io",
    },
    {
      id: 6,
      title: "Vector Database Services for Hypha Ecosystem",
      date: "Since March 2025",
      description: "AI-first integration of Weaviate into Hypha. I added fine-grained access control, virtual collections and metadata management. Currently used for performant cell segmentation search.",
      tags: ["Hypha", "Services", "Infrastructure"],
      icon: Boxes,
      tone: "secondary",
      image: startupImg,
      url: "https://github.com/aicell-lab/hypha-startup-services",
      githubRepo: "aicell-lab/hypha-startup-services",
    },
    {
    id: 7,
    title: "Engaging News Article Title Generator (DPO)",
    date: "June 2024",
    description: "My master's thesis. In collaboration with the Norwegian newspaper Aftenposten, I fine-tuned a model to generate engaging article titles using Direct Preference Optimization (DPO).",
    tags: ["Python", "Transformers", "NLP", "DPO"],
    icon: Newspaper,
    tone: "primary",
    image: dpoImg,
    srcSet: dpoSrcSet,
    url: "https://kth.diva-portal.org/smash/record.jsf?pid=diva2%3A1895800",
  },
  {
    id: 8,
    title: "Real-time Texture Rendering Without UV Unwrapping (Ptex)",
    date: "June 2022",
    description: "My bachelor's thesis. Novel implementation of per-face texture mapping for real-time graphics applications without UV unwrapping.",
    tags: ["C++", "OpenGL", "GLSL", "Graphics"],
    icon: Monitor,
    tone: "secondary",
    image: ptexImg,
    url: "https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1701157&dswid=-3287",
  },
];

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  
  return (
    <div
      className={cn(
        "group h-[22rem] sm:h-[26rem] block w-full transform-gpu transition-transform duration-700 ease-out active:scale-[0.96] focus:outline-none"
      )}
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
          aria-label={`View project: ${project.title}`}
          onClick={(e) => {
             const isTouchDevice = globalThis.matchMedia('(hover: none)').matches;
             if (isTouchDevice) {
                const card = e.currentTarget.closest<HTMLElement>('.group');
                if (card && document.activeElement !== card) {
                  e.preventDefault();
                  card.focus();
                }
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
              className={cn("absolute inset-0 bg-black/10 transition-colors duration-700 delay-200 group-hover:bg-black/50 group-focus-within:bg-black/50")}
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
          <div className={cn("absolute w-full h-full bg-[linear-gradient(to_right,transparent_30%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.05)_55%,transparent_70%)] -translate-x-[150%] group-hover:animate-shimmer-slide group-focus-within:animate-shimmer-slide")} />
          <ChevronRight className="pl-[0.2rem] w-8 h-8 text-foreground relative z-10" />
        </div>

        <div className={cn("relative z-10 h-full p-6 pr-16 flex flex-col justify-end")}>
          <div className={cn("flex flex-wrap items-start justify-between gap-3 mb-1")}>
            <h3
              className={cn("text-lg sm:text-xl lg:text-3xl font-semibold text-foreground font-heading flex-1 min-w-0")}
              data-text={project.title}
            >
              {project.title}
            </h3>
          </div>

          <p className={cn("text-sm sm:text-base md:text-lg text-foreground/70 font-medium")}>
            {project.date}
          </p>

          <div
            className={cn("grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 delay-300 group-hover:grid-rows-[1fr] group-hover:delay-0 group-focus-within:grid-rows-[1fr] group-focus-within:delay-0 [will-change:grid-template-rows]")}
          >
            <div className="overflow-hidden flex flex-col justify-end">
              <p className={cn("text-sm sm:text-base md:text-lg lg:text-xl text-foreground/90 leading-relaxed mt-2 drop-shadow-md max-w-[90%] opacity-0 transition-opacity duration-300 delay-0 group-hover:opacity-100 group-hover:delay-500 group-focus-within:opacity-100 group-focus-within:delay-500 will-change-[opacity]")}>
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
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default ProjectsSection;
