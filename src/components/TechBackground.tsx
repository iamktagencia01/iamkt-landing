import { useEffect, useRef } from "react";

/**
 * Animated tech background:
 * - Animated grid that subtly drifts
 * - Floating aurora glow blobs
 * - Canvas constellation: nodes that float and connect with lines when close
 */
export function TechBackground({
  className = "",
  density = 55,
}: {
  className?: string;
  density?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(
        20,
        Math.round((width * height) / (16000 * (60 / density))),
      );
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const MAX_DIST = 130;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // update
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX_DIST * MAX_DIST) {
            const alpha = 1 - Math.sqrt(d2) / MAX_DIST;
            ctx.strokeStyle = `rgba(125, 211, 252, ${alpha * 0.35})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = "rgba(186, 230, 253, 0.85)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Base deep gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.32 0.13 250) 0%, oklch(0.18 0.08 260) 50%, oklch(0.13 0.06 265) 100%)",
        }}
      />

      {/* Drifting grid */}
      <div
        className="absolute inset-0 opacity-[0.18] animate-tech-grid"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.35) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 80%)",
        }}
      />

      {/* Aurora blobs */}
      <div
        className="absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full blur-3xl opacity-50 animate-aurora-1"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 220 / 0.55), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 -right-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-50 animate-aurora-2"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.20 270 / 0.55), transparent 70%)",
        }}
      />

      {/* Constellation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Top vignette for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 60%, oklch(0.13 0.06 265 / 0.6) 100%)",
        }}
      />
    </div>
  );
}
