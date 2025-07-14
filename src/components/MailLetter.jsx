// 📧 Retro Mail Page with Typewriter Effect + Button to Cake 🎂
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import typewriterSfx from "../assets/typewriter-sound.mp3";

export default function MailPage() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = `
 Dear Nashida,
First of all happy birthday. I'm so happy that you are a part of my life.
 I couldn't be more blessed than this to have you as a best friend. I want you to know I'll always have your back and pray for your success in all aspects of your life
 you are very important to me. I hope we make it to dubai and stay together this year ameen.
 I want you to remember that you are the best! you light up the whole room with joy and are a vibe. I love how you are so considerate about people's feelings.
 At the same time I love your confidence. You have this thing of making people comfortable around you. Well this year kindly accept this as a present  but next  year its surely a yacht.
 Love you lotssssss
 Aalia

  `;

  const [playTypewriter] = useSound(typewriterSfx);

  useEffect(() => {
    let index = 0;
    playTypewriter();
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[index]);
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-lime-200 flex flex-col items-center justify-center px-4">
      <motion.h1
        className="text-4xl font-mono text-yellow-400 mb-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        📬 You've Got Mail
      </motion.h1>

      <motion.div
        className="max-w-xl text-xl border-4 border-yellow-400 p-6 rounded-lg bg-black/80 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <pre className="whitespace-pre-wrap">{displayedText}</pre>
      </motion.div>

      {/* 🍰 Cake Button */}
      <motion.button
        onClick={() => (window.location.href = "/cake")}
        className="mt-10 bg-pink-500 hover:bg-pink-600 text-white font-mono text-lg px-6 py-3 rounded-full shadow-md border-2 border-yellow-400 animate-bounce"
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        🎂 No birthday is complete without a cake!
      </motion.button>
    </div>
  );
}
