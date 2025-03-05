import React from 'react';
import { architectureData } from '../app/data/data';

const ArchitectureSection = () => {
  return (
    <section className="min-h-screen py-20 px-4 bg-space-900/50" aria-label="Arquitectura Cuántica">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Arquitectura de 11ª Dimensión</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Sistema de defensa basado en principios de teoría de cuerdas computacionales
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-12">
          {architectureData.map((layer, i) => (
            <article key={i} className="p-10 bg-gray-900/50 rounded-xl border border-space-700 hover:border-purple-400/30 transition-all group" aria-label={layer.title}>
              <div className="text-purple-400 mb-6 group-hover:text-purple-300 transition-colors">
                {layer.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{layer.title}</h3>
              <p className="text-gray-400 leading-relaxed">{layer.content}</p>
              <div className="mt-6 border-t border-space-700 pt-4">
                <div className="text-sm text-purple-300 flex items-center space-x-2">
                  <span>▶</span>
                  <span>Ver Especificaciones Técnicas</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center space-y-8 mt-20">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 p-0.5 rounded-full">
            <button className="px-12 py-4 bg-space-900 rounded-full text-lg font-bold hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Iniciar Protocolo Omega">
              Iniciar Protocolo Omega
            </button>
          </div>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Certificado Quantum-Safe Level 5 (QSL-5) | Compatible con sistemas de defensa galáctica 
            <span className="block mt-2 text-xs">© 2042 CyberNova Industries - Miembros del Quantum Security Alliance</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
