import { useEffect, useRef } from "react";
import type { Propss } from "../types/interfaces";

export default function ChallengeChart({
  current,
  max,
  color,
  glowColor,
  bgColor,
  icon,
}: Propss) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width,
      H = canvas.height;
    const cx = W / 2,
      cy = H / 2,
      r = 34,
      lw = 9;
    const startAngle = Math.PI * 0.75;
    const totalAngle = Math.PI * 1.5;
    const percent = current / max;

    ctx.clearRect(0, 0, W, H);

    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fillStyle = bgColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, startAngle + totalAngle);
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    ctx.stroke();

    //@ts-ignore
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 8;

    const grad = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
    grad.addColorStop(0, color + "99");
    grad.addColorStop(1, color);

    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, startAngle + totalAngle * percent);
    ctx.strokeStyle = grad;
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.shadowBlur = 0;
  }, [current, max, color, glowColor, bgColor]);

  return (
    <div className="relative w-22.5 h-22.5">
      <canvas ref={canvasRef} width={90} height={90} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {icon}
      </div>
    </div>
  );
}
