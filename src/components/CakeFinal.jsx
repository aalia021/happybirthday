import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

export default function CakePage() {
  const [candles, setCandles] = useState([true, true, true]);
  const navigate = useNavigate();

  const blowOut = (index) => {
    const updated = [...candles];
    updated[index] = false;
    setCandles(updated);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 to-black flex flex-col items-center justify-center text-yellow-300 font-mono px-4">
      {/* 🧁 Title */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🎂 Blow the Candles to Make a Wish!
      </motion.h1>

      {/* 🎂 Layered Cake */}
      <div className="relative flex flex-col items-center gap-2">
        {/* 🕯️ Candles */}
        <div className="flex gap-6 mb-2">
          {candles.map((lit, i) => (
            <div
              key={i}
              onClick={() => blowOut(i)}
              className="flex flex-col items-center cursor-pointer"
            >
              {/* 🔥 Flame */}
              {lit && (
                <motion.div
                  className="w-2.5 h-2.5 bg-yellow-300 rounded-full mb-1"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                />
              )}
              {/* 🕯️ Candle */}
              <div className="w-1.5 h-10 bg-yellow-600 rounded-sm shadow-sm" />
            </div>
          ))}
        </div>

        {/* 🍓 Cake Layers */}
        <div className="w-64 h-10 bg-pink-400 rounded-t-lg shadow-md" />
        <div className="w-72 h-10 bg-red-400" />
        <div className="w-80 h-12 bg-yellow-400 rounded-b-2xl shadow-lg" />
      </div>

      {/* 🔁 Restart Button */}
      <motion.button
        onClick={() => navigate("/")}
        className="mt-12 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full text-lg shadow-md border-2 border-white flex items-center gap-2"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        whileTap={{ scale: 0.95 }}
      >
        🔄 Wanna start again?
      </motion.button>
    </div>
  );
}
