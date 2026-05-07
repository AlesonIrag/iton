import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";
import { GSDevTools } from "gsap/GSDevTools";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register all plugins
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  ScrambleTextPlugin,
  Draggable,
  InertiaPlugin,
  Flip,
  Observer,
  CustomEase,
  CustomBounce,
  CustomWiggle,
  GSDevTools,
  Physics2DPlugin,
  TextPlugin,
  ScrollToPlugin
);

// Master Animation Component
export default function AnimationMaster() {
  const container = useRef();

  useGSAP(() => {
    // Your animations here
    gsap.from(".animate-in", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      force3D: true
    });

    // ScrollTrigger example
    ScrollTrigger.batch(".scroll-item", {
      onEnter: elements => gsap.from(elements, {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out"
      })
    });

  }, { scope: container });

  return (
    <div ref={container}>
      <div className="animate-in">Content 1</div>
      <div className="animate-in">Content 2</div>
      <div className="scroll-item">Scroll Item</div>
    </div>
  );
}