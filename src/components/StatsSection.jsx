import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaRadiation } from 'react-icons/fa';
import { statsData } from '../app/data/data';

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const statsRef = useRef([]);

  useEffect(() => {
    statsRef.current.forEach((statElement) => {
      gsap.from(statElement, {
        innerText: 0,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: statElement,
          start: "top 80%",
          toggleActions: "play reset play reset"
        }
      });
    });
  }, []);

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden" aria-label="Sección Hero con estadísticas">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-space-800 to-black opacity-95" aria-hidden="true" />
      <div className="relative z-10 text-center px-4 space-y-12">
        <div className="space-y-6">
          <FaRadiation className="text-6xl mx-auto text-purple-400 animate-pulse" aria-hidden="true" />
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="block mb-4 bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
              Ciberdefensa 6.0
            </span>
            <span className="text-3xl md:text-4xl font-light text-gray-300">
              Protección Cuántica para la Era Post-Digital
            </span>
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto" role="list" aria-label="Estadísticas">
          {statsData.map((stat, i) => (
            <div key={i} className="p-6 border border-gray-800 rounded-xl bg-gradient-to-b from-gray-900/50 to-transparent" role="listitem">
              <div 
                ref={el => statsRef.current[i] = el} 
                className="text-4xl md:text-5xl font-bold text-purple-300" 
                aria-label={`${stat.number}${stat.suffix} - ${stat.label}`}
              >
                {stat.number}<span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-sm md:text-base text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
