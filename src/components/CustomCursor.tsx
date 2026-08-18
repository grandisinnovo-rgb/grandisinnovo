"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // The ring trails with spring lag — this is the 10alytics trailing circle effect
  const ringX = useSpring(mouseX, { stiffness: 110, damping: 16, mass: 0.7 });
  const ringY = useSpring(mouseY, { stiffness: 110, damping: 16, mass: 0.7 });

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setIsPointer(true);
    // Only hide the native cursor once this component has actually mounted
    // and taken over — see the matching CSS rule in globals.css. If JS fails
    // to load or errors out, the native cursor stays visible instead of
    // disappearing with nothing to replace it.
    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const down  = () => setClicked(true);
    const up    = () => setClicked(false);

    const trackHover = () => {
      const els = document.querySelectorAll('a,button,[role="button"],input,textarea,select,label,[data-hover]');
      els.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    trackHover();

    const obs = new MutationObserver(trackHover);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      obs.disconnect();
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!mounted || !isPointer) return null;

  return (
    <>
      {/* ── Small dot — follows cursor exactly ─────── */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          borderRadius: "50%",
        }}
        animate={{
          width:  clicked ? 4 : hovered ? 5 : 7,
          height: clicked ? 4 : hovered ? 5 : 7,
          opacity: visible ? 1 : 0,
          backgroundColor: hovered ? "#4a6cf7" : "#283889",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* ── Ring — lags behind with spring physics ─── */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9998,
          borderRadius: "50%",
          border: "1.5px solid rgba(40,56,137,0.5)",
        }}
        animate={{
          width:  clicked ? 24 : hovered ? 54 : 36,
          height: clicked ? 24 : hovered ? 54 : 36,
          opacity: visible ? 1 : 0,
          scale: clicked ? 0.85 : 1,
          borderColor: hovered ? "rgba(74,108,247,0.75)" : "rgba(40,56,137,0.45)",
          backgroundColor: hovered ? "rgba(74,108,247,0.07)" : "transparent",
        }}
        transition={{
          width:  { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
          height: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
          scale:  { duration: 0.12 },
          opacity: { duration: 0.2 },
          borderColor: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
        }}
      />
    </>
  );
}
