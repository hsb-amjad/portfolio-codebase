"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// Mode cycle: 0=Static, 1=Control, 2=Auto
type Mode = 0 | 1 | 2;

function Robot({ mode, resetFlag }: { mode: Mode; resetFlag: number }) {
  const { scene, animations } = useGLTF("/robot.glb");
  const { actions } = useAnimations(animations, scene);
  const robotRef = useRef<THREE.Object3D>(null);

  const keys = useRef<{ [key: string]: boolean }>({});
  const isBackwards = useRef(false);
  const targetRotation = useRef<number | null>(null);

  const playOnly = (name: string) => {
    Object.values(actions).forEach((a) => a?.stop());
    actions[name]?.reset().fadeIn(0.2).play();
  };

  useEffect(() => {
    if (robotRef.current) {
      robotRef.current.position.set(0, -1, 0);
      robotRef.current.rotation.set(0, 0, 0);
      isBackwards.current = false;
      targetRotation.current = null;
    }
  }, [resetFlag]);

  useEffect(() => {
    if (!animations.length) return;
    Object.values(actions).forEach((a) => a?.stop());

    if (mode === 1) {
      if (animations[0]) playOnly(animations[0].name); // idle
    } else if (mode === 2) {
      animations.forEach((clip, i) => {
        const action = actions[clip.name];
        if (action) {
          action.play();
          action.time = i * 1.0;
        }
      });
    }
  }, [mode, animations, actions]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode === 1) keys.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (mode === 1) keys.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [mode]);

  useFrame(() => {
    if (!robotRef.current || !animations.length) return;

    if (mode === 1) {
      const speed = 0.05;
      const rotationSpeed = 0.05;
      const turnLerp = 0.1;
      let moving = false;

      if (targetRotation.current !== null) {
        const diff = targetRotation.current - robotRef.current.rotation.y;
        if (Math.abs(diff) > 0.01) {
          robotRef.current.rotation.y += diff * turnLerp;
        } else {
          robotRef.current.rotation.y = targetRotation.current;
          targetRotation.current = null;
        }
      }

      if (keys.current["w"]) {
        if (isBackwards.current) {
          targetRotation.current = robotRef.current.rotation.y + Math.PI;
          isBackwards.current = false;
        }
        robotRef.current.translateZ(speed);
        moving = true;
      }

      if (keys.current["s"]) {
        if (!isBackwards.current) {
          targetRotation.current = robotRef.current.rotation.y + Math.PI;
          isBackwards.current = true;
        }
        robotRef.current.translateZ(speed);
        moving = true;
      }

      if (keys.current["arrowleft"]) {
        robotRef.current.rotation.y += rotationSpeed;
      }
      if (keys.current["arrowright"]) {
        robotRef.current.rotation.y -= rotationSpeed;
      }

      if (moving && animations[1]) {
        playOnly(animations[1].name); // walk
      } else if (!moving && animations[0]) {
        playOnly(animations[0].name); // idle
      }
    }
  });

  return <primitive ref={robotRef} object={scene} scale={1.5} />;
}

export default function RobotModel() {
  const [mode, setMode] = useState<Mode>(0);
  const [resetFlag, setResetFlag] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const cycleMode = () => setMode((prev) => ((prev + 1) % 3) as Mode);

  const color =
    mode === 0 ? "bg-red-500" : mode === 1 ? "bg-green-500" : "bg-yellow-400";

  return (
    <div className="relative w-full h-full">
      {/* Mode toggle */}
      <button
        onClick={cycleMode}
        className={`absolute top-2 right-2 w-5 h-5 rounded-full z-50 ${color}`}
        style={{ pointerEvents: "auto" }}
        title="Toggle Mode"
      />

      {/* Reset button */}
      <button
        onClick={() => setResetFlag((f) => f + 1)}
        className="absolute top-10 right-2 w-5 h-5 rounded-full z-50 bg-gray-400 hover:bg-gray-500"
        style={{ pointerEvents: "auto" }}
        title="Reset Position"
      />

      {/* Info button */}
      <motion.button
        onClick={() => setShowInfo(true)}
        className="absolute top-[72px] right-2 w-5 h-5 flex items-center justify-center rounded-full z-50 bg-orange-500 text-xs font-bold text-black"
        style={{ pointerEvents: "auto" }}
        title="Controls Info"
        animate={{
          scale: [1, 1.15, 1],
          boxShadow: [
            "0 0 0px #f97316",
            "0 0 12px #fb923c",
            "0 0 0px #f97316",
          ],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        !
      </motion.button>

      {/* Info Popup */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="absolute inset-0 md:fixed md:inset-0 bg-black/60 flex items-center justify-center z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#141824] p-4 md:p-6 rounded-2xl shadow-lg w-full h-full md:max-w-md md:h-auto border border-orange-400 text-center overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg md:text-xl font-bold text-orange-400 mb-4">
                Robot Controls
              </h2>
              <ul className="text-xs md:text-sm space-y-2 md:space-y-3 text-left">
                <li>
                  🔴 <span className="text-orange-300">Red:</span> Idle mode. This is a <b>toggle button</b>. 
                  Click it once to switch to <span className="text-green-400">Green</span>.
                </li>
                <li>
                  🟢 <span className="text-orange-300">Green:</span> Control mode. Use <b>W</b>, <b>S</b>, and arrow keys to move. 
                  Click again to switch to <span className="text-yellow-300">Yellow</span>.
                </li>
                <li>
                  🟡 <span className="text-orange-300">Yellow:</span> Neutral animations. 
                  Click again to cycle back to <span className="text-red-500">Red</span>.
                </li>
                <li>
                  ⚪ <span className="text-orange-300">Grey:</span> Reset button. Instantly resets robot’s position.
                </li>
              </ul>
              <button
                onClick={() => setShowInfo(false)}
                className="mt-4 md:mt-6 px-4 md:px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-semibold"
              >
                GOT IT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Canvas */}
      <Canvas camera={{ position: [0, 1.5, 4], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Robot mode={mode} resetFlag={resetFlag} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/robot.glb");
