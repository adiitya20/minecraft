"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { playClick, playItemHover, playPortal, playPortalTravel } from "@/lib/mcSound";
import { PixelArrow } from "./PixelArrow";

type Status = "idle" | "loading" | "success";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playedRef = useRef(false);
  const contact = portfolioData.contact;

  // 1. Play Nether Portal sound ONCE when user enters the Contact section viewport
  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !playedRef.current) {
            playedRef.current = true;
            playPortalTravel();
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Animated Swirling Nether Portal Canvas Shader Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const particles: { x: number; y: number; size: number; vy: number; alpha: number }[] = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 6 + 2,
        vy: -(Math.random() * 1.5 + 0.5),
        alpha: Math.random(),
      });
    }

    let animId = 0;
    const render = () => {
      ctx.fillStyle = "rgba(21, 17, 36, 0.4)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.vy;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.fillStyle = "#aa00aa";
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = "#9933ff";
        ctx.shadowBlur = 10;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;
    playClick();
    setStatus("loading");
    window.setTimeout(() => {
      playPortal();
      setStatus("success");
    }, 1200);
  };

  return (
    <section id="contact" className="site-pad py-[14vh] bg-[#121410] relative overflow-hidden">
      <div className="section-kicker text-[#aa00aa]">Dimension Portal</div>
      <h2 className="font-pixel text-[clamp(1.8rem,4vw,3.5rem)] text-[#aa00aa] mt-3 tracking-wide drop-shadow-[0_4px_0_#000]">
        ENTER THE NETHER
      </h2>
      <p className="font-vt323 text-2xl text-[#a8a499] mt-2 max-w-xl">
        Want to build something together? Step through the portal to establish a connection.
      </p>

      {/* Main Grid: Nether Portal Box & Contact Form */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] items-start">
        {/* Left: Contact Form */}
        <div className="mc-box p-6 sm:p-8 bg-[#181a15] space-y-6">
          <p className="font-pixel text-xs text-[#ffaa00]">TRANSMIT MESSAGE</p>
          
          <form onSubmit={onSubmit} className="space-y-6">
            <label className="block">
              <span className="font-pixel text-[10px] text-[#e2dfd5] uppercase">Your Name</span>
              <input
                required
                name="name"
                className="mt-2 w-full bg-[#11130f] border-2 border-[#000] p-3 font-vt323 text-xl text-[#55ffff] outline-none focus:border-[#ffaa00]"
                placeholder="Steve"
              />
            </label>
            <label className="block">
              <span className="font-pixel text-[10px] text-[#e2dfd5] uppercase">Your Email</span>
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full bg-[#11130f] border-2 border-[#000] p-3 font-vt323 text-xl text-[#55ffff] outline-none focus:border-[#ffaa00]"
                placeholder="steve@minecraft.net"
              />
            </label>
            <label className="block">
              <span className="font-pixel text-[10px] text-[#e2dfd5] uppercase">Message</span>
              <textarea
                required
                name="message"
                rows={4}
                className="mt-2 w-full bg-[#11130f] border-2 border-[#000] p-3 font-vt323 text-xl text-[#55ffff] outline-none resize-none focus:border-[#ffaa00]"
                placeholder="Greetings! Let's craft an awesome project..."
              />
            </label>

            <button
              type="submit"
              className="w-full font-pixel text-xs text-[#ffffff] bg-[#aa00aa] hover:bg-[#c61ac6] border-4 border-[#000] py-4 shadow-[inset_-4px_-4px_0_#5a005a,inset_4px_4px_0_#e64de6] flex items-center justify-center gap-2"
              onMouseEnter={playItemHover}
            >
              {status === "idle" && (
                <>
                  <span>[ CAST MESSAGE THROUGH PORTAL ]</span>
                  <PixelArrow size={14} color="#ffffff" />
                </>
              )}
              {status === "loading" && "TRANSMITTING THROUGH NETHER..."}
              {status === "success" && "✔ MESSAGE TRANSMITTED!"}
            </button>

            {status === "success" && (
              <p className="font-vt323 text-lg text-[#55ff55] bg-[#000] p-3 border border-[#55ff55]">
                Thank you for reaching out! Your signal has traversed the Nether dimension safely.
              </p>
            )}
          </form>
        </div>

        {/* Right: Nether Portal Visual Frame & Links */}
        <div className="relative border-8 border-[#151124] bg-[#1a1128] p-6 shadow-[0_0_40px_rgba(170,0,255,0.4)]">
          {/* Swirling Canvas Overlay */}
          <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-[#aa00aa] pb-4">
              <span className="text-3xl">🔮</span>
              <span className="font-pixel text-sm text-[#ff55ff]">DIMENSIONAL LINKS</span>
            </div>

            <ul className="space-y-4 font-pixel text-xs">
              <SocialItem href={contact.linkedin} label="LinkedIn" icon="💼" color="#55ffff" />
              <SocialItem href={contact.github} label="GitHub" icon="🐙" color="#ffaa00" />
              <SocialItem href={contact.instagram} label="Instagram" icon="📸" color="#ff55ff" />
              {contact.email ? (
                <SocialItem href={`mailto:${contact.email}`} label={contact.email} icon="✉️" color="#55ff55" />
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialItem({ href, label, icon, color }: { href: string; label: string; icon: string; color: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mc-box p-4 flex items-center justify-between hover:scale-[1.02] transition-transform bg-[#181324]/90 group"
        onMouseEnter={playItemHover}
        onClick={playClick}
      >
        <span className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span style={{ color }}>{label}</span>
        </span>
        <span className="font-pixel text-[10px] text-[#aa00aa] flex items-center gap-1.5 group-hover:text-[#ff55ff]">
          <span>PORTAL</span>
          <PixelArrow size={12} color="#aa00aa" className="group-hover:translate-x-1 transition-transform" />
        </span>
      </a>
    </li>
  );
}
