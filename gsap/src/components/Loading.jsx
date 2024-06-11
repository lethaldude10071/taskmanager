import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Loading = () => {
  const dotRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      dotRefs.current,
      { opacity: 0.3, scale: 0.8 },
      {
        opacity: 1,
        scale: 1.2,
        duration: 0.6,
        repeat: -1,
        stagger: 0.2,
        yoyo: true,
      }
    );
  }, []);

  
  

  return (
    <div className="flex justify-center items-center h-full w-full fixed top-0 left-0 bg-opacity-20 bg-pink-200 z-100">
      <div
        className="w-5 h-5 mx-1 rounded-full bg-[#180da7]"
        ref={(el) => (dotRefs.current[0] = el)}
      ></div>
      <div
        className="w-5 h-5 mx-1 rounded-full bg-[#180da7]"
        ref={(el) => (dotRefs.current[1] = el)}
      ></div>
      <div
        className="w-5 h-5 mx-1 rounded-full bg-[#180da7]"
        ref={(el) => (dotRefs.current[2] = el)}
      ></div>
      <div
        className="w-5 h-5 mx-1 rounded-full bg-[#180da7]"
        ref={(el) => (dotRefs.current[3] = el)}
      ></div>
    </div>
  );
};

export default Loading;
