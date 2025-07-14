// Accounting Invaders Game
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useSound from "use-sound";
import shootSfx from "../assets/shoot.mp3";
import hitSfx from "../assets/hit.mp3";
import bgMusic from "../assets/bg-music.mp3";

const ENEMIES = ["📊", "🧾", "📉", "💰", "📈", "💵"];

export default function AccountingInvaders() {
  const [enemies, setEnemies] = useState(generateEnemies());
  const [bullets, setBullets] = useState([]);
  const [playerX, setPlayerX] = useState(50); // percentage
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [playerHit, setPlayerHit] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const navigate = useNavigate();
  const [shoot] = useSound(shootSfx);
  const [hit] = useSound(hitSfx);
  const [bg, { stop }] = useSound(bgMusic, { volume: 0.3, loop: true });

  const gameRef = useRef(null);

  function generateEnemies() {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 20 + 10,
      emoji: ENEMIES[Math.floor(Math.random() * ENEMIES.length)],
    }));
  }

  useEffect(() => {
    bg();
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") setPlayerX((prev) => Math.max(0, prev - 5));
      if (e.key === "ArrowRight") setPlayerX((prev) => Math.min(90, prev + 5));
      if (e.key === " ") {
        shoot();
        setBullets((prev) => [
          ...prev,
          { id: Date.now(), x: playerX + 2.5, y: 80, ownerX: playerX + 2.5 },
        ]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      stop();
    };
  }, [playerX]);

  useEffect(() => {
    const bulletInterval = setInterval(() => {
      setBullets((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - 5, x: b.ownerX }))
          .filter((b) => b.y > 0)
      );
    }, 100);
    return () => clearInterval(bulletInterval);
  }, []);

  useEffect(() => {
    const moveEnemiesInterval = setInterval(() => {
      setEnemies((prevEnemies) =>
        prevEnemies.map((enemy) => ({
          ...enemy,
          y: enemy.y + 3, // Increased speed
        }))
      );
    }, 1000);
    return () => clearInterval(moveEnemiesInterval);
  }, []);

  useEffect(() => {
    const playerBox = {
      x: playerX + 2.5,
      y: 80,
    };

    enemies.forEach((enemy) => {
      if (
        Math.abs(playerBox.x - enemy.x) < 5 &&
        Math.abs(playerBox.y - enemy.y) < 5
      ) {
        setPlayerHit(true);
      }
    });
  }, [enemies, playerX]);

  useEffect(() => {
    setEnemies((prevEnemies) => {
      return prevEnemies.filter((enemy) => {
        const hitBullet = bullets.find(
          (b) => Math.abs(b.x - enemy.x) < 5 && Math.abs(b.y - enemy.y) < 5
        );
        if (hitBullet) {
          hit();
          setScore((s) => s + 100);
          setBullets((b) => b.filter((bullet) => bullet.id !== hitBullet.id));
          return false;
        }
        return true;
      });
    });
  }, [bullets]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (enemies.length === 0 && !gameWon && !playerHit) {
      setGameWon(true);
      setTimeout(() => navigate("/rocket"), 2000);
    }
  }, [enemies]);

  useEffect(() => {
    if (timeLeft === 0 || playerHit) {
      setTimeout(() => window.location.reload(), 2000);
    }
  }, [timeLeft, playerHit]);

  return (
    <div
      ref={gameRef}
      className="relative h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden"
    >
      <h1 className="text-2xl font-bold text-center mt-4">
        Accounting Invaders 🧾
      </h1>
      <p className="text-center text-sm mb-2">Score: {score}</p>
      <p className="text-center text-yellow-400">Time Left: {timeLeft}s</p>
      <p className="text-center italic text-green-300">
        Dodge the tax bullets and balance the books!
      </p>

      {/* Player */}
      <motion.div
        className="absolute bottom-8 w-10 h-10 text-3xl text-green-400"
        style={{ left: `${playerX}%` }}
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        🧑‍💻
      </motion.div>

      {/* Enemies */}
      {enemies.map((enemy) => (
        <motion.div
          key={enemy.id}
          className="absolute text-3xl"
          style={{ left: `${enemy.x}%`, top: `${enemy.y}%` }}
          animate={{ y: [enemy.y, enemy.y + 3, enemy.y] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {enemy.emoji}
        </motion.div>
      ))}

      {/* Bullets */}
      {bullets.map((b) => (
        <div
          key={b.id}
          className="absolute w-1 h-4 bg-yellow-300"
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
        />
      ))}

      {/* Victory Message */}
      {gameWon && (
        <div className="absolute inset-0 flex items-center justify-center text-4xl text-green-300 font-bold">
          Audit Complete ✅
        </div>
      )}

      {/* Defeat Message */}
      {playerHit && (
        <div className="absolute inset-0 flex items-center justify-center text-4xl text-red-500 font-bold">
          Oops! You got taxed 💀 Try again!
        </div>
      )}

      {timeLeft === 0 && !gameWon && !playerHit && (
        <div className="absolute inset-0 flex items-center justify-center text-4xl text-red-400 font-bold">
          Time's up! ⏰ Try again!
        </div>
      )}
    </div>
  );
}
