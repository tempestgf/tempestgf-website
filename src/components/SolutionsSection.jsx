import React, { useRef, useEffect, useMemo, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInfinity, FaUserShield } from 'react-icons/fa';
import { solutionsData } from '../app/data/data';

gsap.registerPlugin(ScrollTrigger);

const SolutionCard = memo(({ solution, index }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  return (
    <article 
      ref={cardRef}
      className="w-[80vw] h-[80vh] flex items-center justify-center"
      aria-labelledby={`solutionTitle-${index}`}
    >
      <div className="w-full h-full bg-gray-900/70 backdrop-blur-lg rounded-3xl p-10 border border-purple-900/30 hover:border-purple-400/50 transition-all group will-change-transform">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div 
              className="text-purple-400 group-hover:text-purple-300 transition-colors"
              aria-hidden="true"
            >
              {solution.icon}
            </div>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 text-sm rounded-full">
              {solution.badge}
            </span>
          </div>
          <h3 id={`solutionTitle-${index}`} className="text-3xl font-bold mb-4">
            {solution.title}
          </h3>
          <ul className="space-y-4 flex-1" role="list">
            {solution.features.map((feature, j) => (
              <li 
                key={`feature-${j}`}
                className="flex items-center space-x-3 text-gray-300"
                role="listitem"
              >
                <FaInfinity className="text-purple-400 text-xs flex-shrink-0" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-gray-800 pt-6">
            <button 
              className="flex items-center space-x-3 text-purple-300 hover:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-4 focus:ring-offset-gray-900 transition-colors"
              aria-label={`Ver caso de éxito para ${solution.title}`}
            >
              <FaUserShield aria-hidden="true" />
              <span>Ver Caso de Éxito {index + 1}.0</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
});

const SolutionsSection = () => {
  const horizontalScrollRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const horizontalElement = horizontalScrollRef.current;
    const ctx = gsap.context(() => {
      gsap.to(horizontalElement, {
        x: () => -horizontalElement.scrollWidth + window.innerWidth,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: horizontalElement.parentElement,
          pin: true,
          scrub: 1.5,
          start: "top top",
          end: "+=500%",
          invalidateOnRefresh: true
        }
      });

      gsap.set(cardsRef.current, {
        willChange: 'transform, opacity'
      });
    });

    return () => ctx.revert();
  }, []);

  const memoizedCards = useMemo(() => 
    solutionsData.map((solution, i) => (
      <SolutionCard 
        key={`solution-${solution.id || i}`}
        solution={solution}
        index={i}
        ref={el => cardsRef.current[i] = el}
      />
    ))
  , []);

  return (
    <section 
      className="horizontal-section h-screen relative"
      aria-label="Soluciones Cuánticas"
      role="region"
    >
      <div 
        ref={horizontalScrollRef}
        className="horizontal-scroll w-max h-full flex items-center space-x-8"
        role="feed"
        aria-busy="false"
        aria-live="polite"
      >
        {memoizedCards}
      </div>
    </section>
  );
};

export default memo(SolutionsSection);