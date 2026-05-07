import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimation() {
  const container = useRef();

  useGSAP(() => {
    // Performance-optimized scroll animation
     
    // Single element scroll animation
    gsap.fromTo(".scroll-element",  
      {
        y: 100,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".scroll-element",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          refreshPriority: 1
        },
        force3D: true,
        clearProps: "transform,opacity"
      }
    );

     
     

    // Responsive handling
    ScrollTrigger.addEventListener("refreshInit", () => {
      gsap.set(".scroll-element, .scroll-item", { clearProps: "all" });
    });

  }, { scope: container, dependencies: [] });

  // Cleanup on unmount
  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={container}>
      <div className="parallax-section h-screen relative overflow-hidden">
         
        <div className="relative z-10">
           
          <div className="scroll-element p-8 bg-white rounded-lg shadow-xl">
            <h1 className="text-4xl font-bold">Scroll Animation</h1>
            <p className="text-lg mt-4">This element animates smoothly when scrolled into view.</p>
          </div>
        </div>
      </div>
    </div>
  );
}