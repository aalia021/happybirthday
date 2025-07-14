// 🚀 Retro Rocket Launch with Mail Notification + Sound + Particle Library
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import boomSfx from "../assets/boom.mp3";
import launchSfx from "../assets/rocket-launch.mp3";
import ConfettiExplosion from "react-confetti-explosion";
import rocketImg from "../assets/rocket.png";
import mailImg from "../assets/mail.png";

export default function RocketLaunch() {
  const [showBlast, setShowBlast] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [hideRocket, setHideRocket] = useState(false);
  const navigate = useNavigate();

  const [playBoom] = useSound(boomSfx);
  const [playLaunch] = useSound(launchSfx);

  useEffect(() => {
    playLaunch();
    const timer = setTimeout(() => setShowBlast(true), 2000);
    return () => clearTimeout(timer);
  }, [playLaunch]);

  useEffect(() => {
    if (showBlast) {
      setIsExploding(true);
      const mailTimer = setTimeout(() => {
        setHideRocket(true);
        setShowMail(true);
      }, 2000);
      return () => clearTimeout(mailTimer);
    }
  }, [showBlast]);

  const handleMailClick = () => {
    playBoom();
    navigate("/mail");
  };

  return (
    <div className="relative h-screen bg-gradient-to-b from-black to-indigo-900 overflow-hidden flex items-center justify-center">
      {/* 🚀 Rocket Launch */}
      {!hideRocket && (
        <motion.img
          src={rocketImg}
          alt="Rocket"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 z-30"
          initial={{ y: 0 }}
          animate={{ y: -600 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      )}

      {/* 🎊 Confetti Explosion */}
      {isExploding && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-40">
          <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={100}
            width={1600}
          />
        </div>
      )}

      {/* 📬 You've Got Mail */}
      {showMail && (
        <>
          <motion.img
            src={mailImg}
            alt="You've Got Mail"
            onClick={handleMailClick}
            className="absolute w-96 z-50 cursor-pointer hover:scale-105 transition-transform"
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              x: [0, -50, 50, -75, 75, 0],
              y: [0, 30, -30, 20, -20, 0],
              rotate: [0, 5, -5, 10, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          />

          {/* 📝 Retro Text */}
          <div className="absolute bottom-10 text-yellow-300 text-lg font-mono animate-pulse z-50">
            Click on the mail to open it...
          </div>
        </>
      )}
    </div>
  );
}
