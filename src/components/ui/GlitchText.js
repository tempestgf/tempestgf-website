'use client';

import { useEffect, useState } from 'react';

export const GlitchText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const animate = () => {
      let iterations = 0;
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()";

      const interval = setInterval(() => {
        setDisplayText(text
          .split("")
          .map((letter, index) => {
            if(index < iterations) return text[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
        );

        if(iterations >= text.length) clearInterval(interval);
        iterations += 1 / 2;
      }, 50);
    };

    animate();
  }, [text]);

  return (
    <span className={`${className} font-mono`}>
      {displayText}
    </span>
  );
};