import { motion } from "framer-motion";
import { ComponentType, useEffect, useState } from "react";

// Workaround for framer-motion v12 type issues with React 18
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MotionDiv = motion.div as ComponentType<any>;

const AnimatedBackground = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Animated blobs */}
      <MotionDiv
        className="blob blob-1 w-[600px] h-[600px] top-[-10%] left-[-5%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
      />
      
      <MotionDiv
        className="blob blob-2 w-[700px] h-[700px] top-[20%] right-[-15%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, delay: 0.3 }}
      />
      
      <MotionDiv
        className="blob blob-3 w-[500px] h-[500px] bottom-[10%] left-[20%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 0.6 }}
      />
      
      <MotionDiv
        className="blob blob-4 w-[550px] h-[550px] bottom-[-5%] right-[10%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 2, delay: 0.9 }}
      />

      {/* Additional floating orbs for depth */}
      <MotionDiv
        initial={{ opacity: 1 }}
        animate={{ opacity: isScrolling ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <MotionDiv
          className="absolute w-[200px] h-[200px] rounded-full top-[40%] left-[50%]"
          style={{
            background: "radial-gradient(circle, hsl(200 90% 60% / 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <MotionDiv
          className="absolute w-[150px] h-[150px] rounded-full top-[60%] right-[30%]"
          style={{
            background: "radial-gradient(circle, hsl(280 75% 65% / 0.25) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 30, -50, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </MotionDiv>
      
      {/* Noise texture */}
      <div className="absolute inset-0 noise pointer-events-none" />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(225 30% 8% / 0.4) 100%)",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
