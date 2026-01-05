import {
  ChevronRight,
  Shield,
  Package,
  Boxes,
  Newspaper,
  Monitor,
  Star,
  GitFork,
} from "lucide-react";
import secureDatasetSharingImg from "@/assets/Secure_dataset_sharing.png";
import dpoImg from "@/assets/dpo.png";
import ptexImg from "@/assets/ptex.png";
import startupImg from "@/assets/startup.jpg";
import artifactsImg from "@/assets/artifacts.jpg";
import { useTilt } from "@/hooks/use-tilt";
import { FadeIn } from "./FadeIn";
import { useGithubRepoStats } from "@/hooks/use-github-repo-stats";
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
  url?: string;
  githubRepo?: string;
}

const projects: Project[] = [
    {
      id: 1,
      title: "AI-Protected Dataset Collaboration Platform",
      date: "Since November 2025",
      description: "A platform for securely inviting collaborators to work on your datasets, with privacy guaranteed by AI.",
      tags: ["AI", "Security", "Privacy", "Data Sharing"],
      icon: Shield,
      tone: "primary",
      image: secureDatasetSharingImg,
      url: "https://safe-colab.aicell.io",
    },
    {
      id: 2,
      title: "File System-like Interface For Hypha Artifacts",
      date: "Since May 2025",
      description: "A filesystem-like Python library for interacting with Hypha artifacts, with both synchronous and asynchronous APIs.",
      tags: ["Python", "Hypha", "Cloud Storage", "AsyncIO"],
      icon: Package,
      tone: "accent",
      image: artifactsImg,
      url: "https://github.com/aicell-lab/hypha-artifact",
      githubRepo: "aicell-lab/hypha-artifact",
    },
    {
      id: 3,
      title: "Vector Database Services for Hypha Ecosystem",
      date: "Since March 2025",
      description: "A Python wrapper around Weaviate that integrates it into the Hypha ecosystem.",
      tags: ["Hypha", "Services", "Infrastructure"],
      icon: Boxes,
      tone: "secondary",
      image: startupImg,
      url: "https://github.com/aicell-lab/hypha-startup-services",
      githubRepo: "aicell-lab/hypha-startup-services",
    },
    {
    id: 4,
    title: "Engaging News Article Title Generator",
    date: "June 2024",
    description: "Master's thesis. In collaboration with the Norwegian newspaper Aftenposten, I fine-tuned a model to generate engaging article titles using Direct Preference Optimization (DPO).",
    tags: ["Python", "Transformers", "NLP", "DPO"],
    icon: Newspaper,
    tone: "primary",
    image: dpoImg,
    url: "https://kth.diva-portal.org/smash/record.jsf?pid=diva2%3A1895800",
  },
  {
    id: 5,
    title: "Real-time Texture Rendering Without UV Unwrapping",
    date: "June 2022",
    description: "Bachelor's thesis. Novel implementation of per-face texture mapping for real-time graphics applications without UV unwrapping.",
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
  const { data: repoStats } = useGithubRepoStats(project.githubRepo);

  const formatCount = (value: number) =>
    new Intl.NumberFormat(undefined, {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);

  const showStars = Boolean(repoStats && repoStats.stars > 4);
  const showForks = Boolean(repoStats && repoStats.forks > 4);
  const showRepoStats = showStars || showForks;
  
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group h-[26rem] block w-full transform-gpu transition-transform duration-700 ease-out active:scale-[0.96]"
      )}
      aria-label={`View project: ${project.title}`}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl h-full bg-black isolation-isolate"
        )}
        style={{ transform: "translateZ(0)" }}
      >
        {project.image && (
          <>
            <img
              src={project.image}
              alt=""
              aria-hidden="true"
              className={cn(
                "bg-zinc-1000 absolute -inset-[1px] h-[calc(100%+2px)] w-[calc(100%+2px)] max-w-none object-cover object-center transition-transform duration-500 will-change-transform"
              )}
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
            />
            <div
              aria-hidden="true"
              className={cn("absolute inset-0 bg-black/10 transition-colors duration-700 delay-200 group-hover:bg-black/50")}
            />
            <div
              aria-hidden="true"
              className={cn("absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent")}
            />
          </>
        )}

        <div className={cn("absolute bottom-6 right-6 z-20 w-[2.7rem] h-[2.7rem] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 overflow-hidden")}>
          <div className={cn("absolute w-full h-full bg-[linear-gradient(to_right,transparent_30%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.05)_55%,transparent_70%)] -translate-x-[150%] group-hover:animate-shimmer-slide")} />
          <ChevronRight className="pl-[0.2rem] w-7 h-7 text-foreground relative z-10" />
        </div>

        <div className={cn("relative z-10 h-full p-6 pr-16 flex flex-col justify-end")}>
          <div className={cn("flex flex-wrap items-start justify-between gap-3 mb-1")}>
            <h3
              className={cn("md:text-2xl text-3xl lg:text-3xl font-semibold text-foreground font-heading flex-1 min-w-0")}
              data-text={project.title}
            >
              {project.title}
            </h3>
          </div>

          <p className={cn("text-lg text-foreground/70 font-medium")}>
            {project.date}
          </p>

          <div className={cn("grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 delay-300 group-hover:grid-rows-[1fr] group-hover:delay-0")}>
            <div className="overflow-hidden flex flex-col justify-end">
              <p className={cn("text-xl md:text-lg lg:text-xl text-foreground/90 leading-relaxed mt-2 drop-shadow-md max-w-[90%] opacity-0 transition-opacity duration-300 delay-0 group-hover:opacity-100 group-hover:delay-500")}>
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

const ProjectsSection = () => {
  return (
    
    <section className="mb-8 pb-20 px-6">
      <FadeIn threshold={0}>
        <div className="max-w-6xl mx-auto glass bg-zinc-950/50 rounded-3xl p-8 md:p-12 !pt-12 backdrop-blur-sm">
            <h2 className="text-4xl md:text-4xl text-center mb-8">
              <span className="text-foreground/40 font-heading font-bold">My projects</span>
            </h2>
            <div className="w-[calc(100%)] h-[2px]  bg-gradient-to-r from-transparent via-foreground/10 to-transparent mx-auto mb-12 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard project={project} />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default ProjectsSection;
