import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Linkedin, Microscope } from "lucide-react";

const HeroSection = () => {
  const [showScrollCue, setShowScrollCue] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);

  useEffect(() => {
    if (showScrollCue && !hasScrolled) {
      setArrowVisible(true);
    }
  }, [showScrollCue, hasScrolled]);

  useEffect(() => {
    const scrollCueTimer = setTimeout(() => {
      setShowScrollCue(true);
    }, 4500); 

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(scrollCueTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative py-20 short:py-10 overflow-hidden mb-8">
      <div className="w-full max-w-4xl mx-auto px-6 relative h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center"
        >
          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight font-heading short:text-4xl short:mb-2"
          >
            <span className="text-foreground">Hi, I'm Hugo,</span>
            <br />
            <span className="text-foreground">PhD{" "}</span>
            Student at
            <br />
            <a 
              href="https://aicell.io/authors/hugodk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="gradient-text hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] duration-300 transition-all"
            >
              AICell Lab
            </a>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl lg:max-w-2xl text-muted-foreground/80 max-w-lg mx-auto leading-relaxed font-sans mb-10 short:text-base short:mb-6"
          >
            Currently building the next generation of AI-powered tools for scientific discovery. Passionate about technologies that benefit society.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-6 short:gap-4"
          >
            <a
              href="https://github.com/hugokallander"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <Github className="w-6 h-6 md:w-7 md:h-7 short:w-5 short:h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/hugodk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <Linkedin className="w-6 h-6 md:w-7 md:h-7 short:w-5 short:h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://aicell.io/authors/hugodk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <Microscope className="w-6 h-6 md:w-7 md:h-7 short:w-5 short:h-5" />
              <span className="sr-only">AICell Lab Profile</span>
            </a>
          </motion.div>
        </motion.div>

      </div>
      {/* Scroll Cue Arrow */}
      {arrowVisible && (
        <motion.div 
          className="opacity-90 absolute left-1/2 -translate-x-1/2 bottom-[5%] w-auto h-16 md:h-20 pointer-events-none z-50 short:h-16"
        >
          <svg 
            viewBox="0 0 49.956326 102.36361" 
            className="w-full h-full"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--glow))" stopOpacity="0.4" />
                <stop offset="25%" stopColor="hsl(var(--glow))" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--glass-border-light)" stopOpacity="0" />
                <stop offset="100%" stopColor="hsl(var(--glow))" stopOpacity="0.3" />
              </linearGradient>
              <mask id="scroll-arrow-mask" maskUnits="userSpaceOnUse">
                {/* Outer mask (white = visible) */}
                <path
                  d="m 24.956326,5 v 92.36391 l -19.9999997,-25 19.9999997,25 20,-25"
                  fill="none"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-scroll-arrow"
                />
                {/* Inner mask (black = hidden) - creates the hollow effect */}
                <path
                  d="m 24.956326,5 v 92.36391 l -19.9999997,-25 19.9999997,25 20,-25"
                  fill="none"
                  stroke="black"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-scroll-arrow"
                />
              </mask>
            </defs>
            
            {/* Glass Body Tint */}
            <path
              d="m 24.956326,5 v 92.36391 l -19.9999997,-25 19.9999997,25 20,-25"
              fill="none"
              stroke="hsl(var(--foreground) / 0.05)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-scroll-arrow"
            />

            {/* Glass Border (Masked to be only the edges) */}
            <path
              d="m 24.956326,5 v 92.36391 l -19.9999997,-25 19.9999997,25 20,-25"
              fill="none"
              stroke="url(#arrow-gradient)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              mask="url(#scroll-arrow-mask)"
              className="animate-scroll-arrow"
              onAnimationIteration={() => {
                if (hasScrolled) {
                  setArrowVisible(false);
                }
              }}
            />
          </svg>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;