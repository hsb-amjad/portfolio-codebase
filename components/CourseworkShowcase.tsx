"use client";

import { motion } from "framer-motion";

export default function CourseworkShowcase() {
  const projects = [
    {
      title: "Forward and Inverse Kinematics of UR10 Robot on MATLAB",
      desc: "Modelled the kinematic behavior of the UR10 industrial robot in MATLAB. Implemented both forward and inverse kinematics to compute joint angles and end-effector positioning for robotic manipulation tasks.",
    },
    {
      title: "Design of Control System Dynamics for Drone Gimbal Suspension System",
      desc: "Designed and simulated a control system for a drone gimbal suspension. Analyzed dynamic response and optimized control strategies to stabilize cameras during aerial flight.",
    },
    {
      title: "Mathematical Modelling and Simulation of a Pistol System on MATLAB",
      desc: "Created a MATLAB-based mathematical model of a pistol firing mechanism. Simulated recoil, spring-damper effects, and energy transfer to study firearm dynamics.",
    },
    {
      title: "Static Structural and Explicit Dynamics Analysis on Ansys",
      desc: "Performed finite element analysis using Ansys to study both static structural stresses and explicit dynamic responses. Evaluated material deformation and stress distribution under various load conditions.",
    },
    {
      title: "Facial Recognition System using Computer Vision Techniques and Deployment on Raspberry Pi",
      desc: "Implemented a facial recognition pipeline with OpenCV and Python. Deployed the system on Raspberry Pi for real-time recognition in an embedded environment.",
    },
    {
      title: "Smart Traffic Management System using 8051 Controller and Assembly Language",
      desc: "Developed a traffic signal management system on 8051 microcontroller using assembly language. Implemented logic for dynamic signal switching based on traffic conditions.",
    },
    {
      title: "Design and Fabrication of a Dual Channel DC Power Supply",
      desc: "Fabricated a dual channel regulated DC power supply for laboratory use. Integrated rectifier, filter, and regulator circuits to provide stable voltage outputs.",
    },
    {
      title: "Micro Servo Robotic Arm using Robot Kinematics",
      desc: "Built a robotic arm prototype driven by micro servos. Applied forward and inverse kinematics for precise arm motion and task simulation.",
    },
  ];

  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 grid gap-10">
      {projects.map((proj, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          whileHover={{
            y: -8,
            scale: 1.02,
            boxShadow: "0 0 20px rgba(249,115,22,0.6)",
            borderColor: "rgba(249,115,22,0.8)",
          }}
          whileTap={{ scale: 0.98 }}
          className="p-6 rounded-2xl border border-orange-400/30 bg-black/40 
                     shadow-md transition-all duration-300"
        >
          <h2 className="text-xl md:text-2xl font-extrabold text-orange-400 mb-3 drop-shadow-lg">
            {proj.title}
          </h2>
          <p className="text-gray-300 leading-relaxed text-justify">
            {proj.desc}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
