"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Animación que se activa al hacer scroll
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Arranca animación cuando está al 80% de la viewport
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);

  return (
    <section ref={containerRef} className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Mis Proyectos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="project-card p-4 border rounded-lg shadow-md flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Proyecto IA Chatbot</h2>
          <p className="text-sm">
            Chatbot basado en NLP para soporte y atención al cliente.
          </p>
        </div>
        {/* Card 2 */}
        <div className="project-card p-4 border rounded-lg shadow-md flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Aplicación E-commerce</h2>
          <p className="text-sm">
            Plataforma de comercio electrónico con pasarela de pagos.
          </p>
        </div>
        {/* Añade más tarjetas */}
      </div>
    </section>
  );
}
