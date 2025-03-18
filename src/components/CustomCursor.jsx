"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let mouseX = width / 2;
    let mouseY = height / 2;
    
    let circle = {
      radius: 10,
      lastX: mouseX,
      lastY: mouseY
    };
    
    const elems = [...document.querySelectorAll("[data-hover]")];
    
    function onResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    
    function lerp(a, b, n) {
      return (1 - n) * a + n * b;
    }
    
    function render() {
      circle.lastX = lerp(circle.lastX, mouseX, 0.25);
      circle.lastY = lerp(circle.lastY, mouseY, 0.25);
      
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.arc(circle.lastX, circle.lastY, circle.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = "#ff6600"; // Orange color
      ctx.fill();
      ctx.closePath();
      
      requestAnimationFrame(render);
    }
    
    function init() {
      requestAnimationFrame(render);
      
      window.addEventListener("mousemove", function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
      });
      
      window.addEventListener("resize", onResize, false);
      
      const tween = gsap.to(circle, {
        radius: circle.radius * 3,
        duration: 0.25,
        ease: "power1.inOut",
        paused: true
      });
      
      elems.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          tween.play();
        }, false);
        el.addEventListener("mouseleave", () => {
          tween.reverse();
        }, false);
      });
    }
    
    init();
    
    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", null);
      window.removeEventListener("resize", onResize);
      elems.forEach((el) => {
        el.removeEventListener("mouseenter", null);
        el.removeEventListener("mouseleave", null);
      });
    };
  }, []);
  
  return <canvas ref={canvasRef} className="js-canvas" />;
}
