import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import carImg from "../assets/car.png";
import tvstatic from "../assets/tv-static.mp4";
import tvon from "../assets/tv-on.mp3";

export default function MemoryLane() {
  const navigate = useNavigate();
  const [tvOn, setTvOn] = useState(false);
  const [showChannelText, setShowChannelText] = useState(false);
  const [playStatic, setPlayStatic] = useState(false);
  const beepRef = useRef(null);

  useEffect(() => {
    if (tvOn) {
      beepRef.current?.play();
      setPlayStatic(true);
      setShowChannelText(true);

      const staticTimer = setTimeout(() => setPlayStatic(false), 2000);
      const channelTimer = setTimeout(() => setShowChannelText(false), 2000);

      return () => {
        clearTimeout(staticTimer);
        clearTimeout(channelTimer);
      };
    } else {
      setPlayStatic(false);
      setShowChannelText(false);
    }
  }, [tvOn]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative">
      {/* 🚗 Car */}
      <motion.img
        src={carImg}
        alt="Car"
        className="absolute bottom-10 left-0 w-32 z-30"
        initial={{ x: -500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* 🎶 Beep Sound */}
      <audio ref={beepRef} src={tvon} preload="auto" />

      {/* 🖥️ Retro TV */}
      <div className="relative w-[90vw] max-w-[900px] h-[500px] border-8 border-purple-500 rounded-xl shadow-2xl neon-glow flex flex-col items-center justify-center bg-black z-10">
        {/* 🦯 Antennas */}
        <div className="absolute top-[-40px] w-4 h-16 bg-black rotate-[-30deg] left-[20%] rounded-sm shadow-md" />
        <div className="absolute top-[-40px] w-4 h-16 bg-black rotate-[30deg] right-[20%] rounded-sm shadow-md" />

        {/* 📺 Channel Text */}
        {tvOn && showChannelText && (
          <div className="text-lime-300 font-retro text-sm absolute top-2 left-4 animate-pulse z-20">
            Channel: Down the Memory Lane
          </div>
        )}

        {/* 🎞️ Static or Video */}
        {tvOn && playStatic ? (
          <video
            className="w-full h-full object-contain rounded"
            autoPlay
            muted
            playsInline
            loop
          >
            <source src={tvstatic} type="video/mp4" />
          </video>
        ) : tvOn && !showChannelText ? (
          <iframe
            className="w-full h-full object-contain rounded"
            src="https://drive.google.com/file/d/1G4k5zDvK9NMivVuQYgQaW8fXziL5iSV-/preview"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full bg-black" />
        )}
      </div>

      {/* 🔘 Remote Control Style Buttons */}
      <div className="flex flex-col gap-3 mt-8 items-center bg-gray-900 rounded-xl px-4 py-6 shadow-inner border-2 border-gray-700">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setTvOn(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm w-24 shadow-md"
        >
          Power ON
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setTvOn(false)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm w-24 shadow-md"
        >
          Power OFF
        </motion.button>
      </div>

      {/* 🎮 CTA */}
      {tvOn && !playStatic && !showChannelText && (
        <motion.div
          className="mt-10 flex gap-6 z-30"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/choice/game")}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full text-lg shadow-lg"
          >
            🎮 Game
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
