import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ScoreIndicatorProps {
  score: number;
}

export function ScoreIndicator({ score }: ScoreIndicatorProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Easing function: easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      setAnimatedScore(Math.round(score * ease));

      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Determine color based on score
  const getColor = () => {
    if (score >= 85) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  };

  const getStrokeColor = () => {
    if (score >= 85) return "stroke-emerald-500";
    if (score >= 60) return "stroke-amber-500";
    return "stroke-rose-500";
  };

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="stroke-slate-200 fill-none"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          className={`fill-none ${getStrokeColor()} drop-shadow-sm`}
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-3xl font-display font-bold ${getColor()}`}>
          {animatedScore}
        </span>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Score
        </span>
      </div>
    </div>
  );
}
