"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ImmediateReachOut() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const location = (form.elements.namedItem("location") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    // Validation checks
    if (!name) {
      setStatus("⚠️ Please enter your name.");
      return;
    }
    if (!email) {
      setStatus("⚠️ Please enter your email.");
      return;
    }
    if (!validateEmail(email)) {
      setStatus("⚠️ Please enter a valid email address.");
      return;
    }
    if (!message) {
      setStatus("⚠️ Please enter your query or comment.");
      return;
    }

    const data = { name, phone, email, location, message };

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        setStatus("✅ I have received your message. I will be in touch with you very soon. Thank you!");
        form.reset();
      } else {
        setStatus("❌ Failed to send. Try again later.");
      }
    } catch {
      setStatus("⚠️ Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center bg-black text-white px-4 py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-2xl p-8 rounded-2xl backdrop-blur-md border border-orange-400/40 bg-white/5 shadow-lg"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-6 text-center">
          GET IN TOUCH
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="name" type="text" placeholder="Your Name *" className="input" />
          <div className="flex items-center gap-2">
            <Phone className="text-orange-400 w-5 h-5" />
            <input name="phone" type="tel" placeholder="Your Phone" className="input flex-1" />
          </div>
          <div className="flex items-center gap-2">
            <Mail className="text-orange-400 w-5 h-5" />
            <input name="email" type="email" placeholder="Your Email *" className="input flex-1" />
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-orange-400 w-5 h-5" />
            <input name="location" type="text" placeholder="Your Location" className="input flex-1" />
          </div>
          <textarea name="message" rows={4} placeholder="Your Query / Comment *" className="input" />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-500/40 transition-all"
          >
            {loading ? "SUBMITTING..." : "SUBMIT"}
          </motion.button>
        </form>

        {status && <p className="text-center mt-4 text-sm">{status}</p>}
      </motion.div>
    </section>
  );
}
