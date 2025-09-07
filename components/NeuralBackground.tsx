"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export default function NeuralBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="neural-bg"
      className="absolute inset-0"
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        fpsLimit: 60,
        particles: {
          number: { value: 60, density: { enable: true, area: 800 } },
          color: { value: "#f97316" },
          links: { enable: true, color: "#f97316", distance: 150, opacity: 0.4 },
          move: { enable: true, speed: 1 },
          size: { value: 2 },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
          },
        },
      }}
    />
  );
}
