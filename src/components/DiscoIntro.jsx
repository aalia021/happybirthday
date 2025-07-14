// 🪩 Full DiscoIntro Page with 3D Disco Ball
import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadBasic } from "tsparticles-basic";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import carImg from "../assets/car.png";
import "../discoball.css";

export default function DiscoIntro() {
  const navigate = useNavigate();
  const [revealScene, setRevealScene] = useState(false);
  const [startTransition, setStartTransition] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadBasic(engine);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setRevealScene(true), 3200);
    return () => clearTimeout(timeout);
  }, []);

  const handleNext = () => {
    setStartTransition(true);
    setTimeout(() => navigate("/memory"), 2000);
  };

  useEffect(() => {
    const radius = 50;
    const squareSize = 6.5;
    const prec = 19.55;
    const fuzzy = 0.001;
    const inc = (Math.PI - fuzzy) / prec;
    const discoBall = document.getElementById("discoBall");
    if (!discoBall) return;

    for (let t = fuzzy; t < Math.PI; t += inc) {
      const z = radius * Math.cos(t);
      const currentRadius =
        Math.abs(
          radius * Math.cos(0) * Math.sin(t) -
            radius * Math.cos(Math.PI) * Math.sin(t)
        ) / 2.5;
      const circumference = Math.abs(2 * Math.PI * currentRadius);
      const squaresThatFit = Math.floor(circumference / squareSize);
      const angleInc = (Math.PI * 2 - fuzzy) / squaresThatFit;

      for (let i = angleInc / 2 + fuzzy; i < Math.PI * 2; i += angleInc) {
        const square = document.createElement("div");
        const tile = document.createElement("div");
        tile.style.width = `${squareSize}px`;
        tile.style.height = `${squareSize}px`;
        tile.style.transform = `rotate(${i}rad) rotateY(${t}rad)`;
        tile.style.animation = `reflect 2s linear infinite`;
        tile.style.animationDelay = `${Math.random() * 2}s`;
        tile.style.backgroundColor =
          t > 1.3 && t < 1.9 ? randomColor("bright") : randomColor("any");

        square.appendChild(tile);
        square.className = "square";

        const x = radius * Math.cos(i) * Math.sin(t);
        const y = radius * Math.sin(i) * Math.sin(t);
        square.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(${z}px)`;

        discoBall.appendChild(square);
      }
    }

    function randomColor(type) {
      const c =
        type === "bright"
          ? Math.floor(Math.random() * 125 + 130)
          : Math.floor(Math.random() * 80 + 110);
      return `rgb(${c},${c},${c})`;
    }
  }, []);

  return (
    <div
      className={`h-screen w-full flex flex-col justify-center items-center relative overflow-hidden transition-colors duration-1000 ${
        revealScene ? "bg-indigo-900" : "bg-indigo-950"
      }`}
    >
      {/* 🎉 Confetti */}
      {revealScene && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 100 },
              move: { enable: true, speed: 1.5 },
              size: { value: 4 },
              color: { value: ["#FF69B4", "#FFD700", "#00BFFF"] },
              opacity: { value: 0.7 },
            },
          }}
          className="absolute top-0 left-0 w-full h-full z-0"
        />
      )}

      {/* 🪩 Disco Ball 3D */}
      <div id="discoBallLight"></div>
      <div id="discoBall"></div>

      {/* 🎉 Name */}
      <motion.h1
        className="text-4xl font-bold text-center mt-20 text-white z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
      >
        Happy Birthday, Nashida! 🎉
      </motion.h1>

      {/* 🚗 Car */}
      {revealScene && (
        <motion.img
          src={carImg}
          alt="Car"
          className="absolute bottom-10 left-1/4 w-32 z-30"
          initial={{ x: 0 }}
          animate={startTransition ? { x: 800 } : { x: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}

      {/* 🎈 Button */}
      {revealScene && !startTransition && (
        <motion.button
          onClick={handleNext}
          className="mt-10 bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-full text-lg z-20"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hey, let the party get started!
        </motion.button>
      )}

      {/* 🕶️ Black Fade */}
      <AnimatePresence>
        {startTransition && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
