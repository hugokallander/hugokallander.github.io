import { Github, Linkedin, Microscope } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6">

      <div className="flex justify-center gap-8 mb-8">
        <a
          href="https://github.com/hugokallander"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <Github className="w-8 h-8" />
          <span className="sr-only">GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/hugodk/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <Linkedin className="w-8 h-8" />
          <span className="sr-only">LinkedIn</span>
        </a>
        <a
          href="https://aicell.io/authors/hugodk/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <Microscope className="w-8 h-8" />
          <span className="sr-only">AICell Lab Profile</span>
        </a>
      </div>

      {/* Year */}
      <p className="text-md text-muted-foreground text-center">
        © {new Date().getFullYear()} Hugo Dettner Källander
      </p>
    </footer>
  );
};

export default Footer;
