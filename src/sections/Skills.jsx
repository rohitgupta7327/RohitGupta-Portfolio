import React, { useEffect,useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { FaBootstrap } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { RiTailwindCssFill } from "react-icons/ri";

const Skills = () => {
  const skills = [
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3 />, name: "CSS" },
    { icon: <IoLogoJavascript />, name: "JavaScript" },
    { icon: <FaBootstrap />, name: "Bootstrap" },
    { icon: <RiTailwindCssFill />, name: "Tailwind CSS" },
    { icon: <FaReact />, name: "React" },
    { icon: <FaNodeJs />, name: "NodeJs" },
    { icon: <DiMongodb />, name: "MongoDB" },
    { icon: <FaReact />, name: "React" },
  ];

  const repeated = [...skills, ...skills];                                                                       //repeating skills to make it scrollable
  const [dir, setDir] = useState(-1);                                                                           // for controlling the direction of scroll -1 for left to right and 1 for right to left
  const [active, setActive] = useState(false);                                                                  // for controlling the animation state of skill icons
  const sectionRef = React.useRef(null);                                                                       // for getting the reference of skills section to control the animation state based on scroll position
  const trackRef = useRef(null);                                                                              // for getting the reference of skill icons wrapper to control the animation state based on scroll position
  const touchY = useRef(null);
  const x = useMotionValue(0);

  // this UseEffect check if skill section is visible in viewport or not and set the active state accordingly to start or stop the animation of skill icons based on scroll position
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // IntersectionObserver to observe the skill section and control the animation state based on scroll position,  // when skill section is in viewport then set active to true for animation to start
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setActive(true);
        }                                                                                  // threshold for controlling the percentage of skill section to be in viewport to trigger the animation
        else {
          setActive(false);
        }
      },
      { threshold: [0.1] },                                                               // Trigger callback when 10% of element is visible
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);                                                                                 // Start observing the skill section



// this UseEffect made to detect touch in which direction user is sscrolling
  useEffect(() => {
    if (!active) return;                                                                 // return if skill screen is not visible
    const onWheel = (e) => {
      setDir(e.deltaY > 0 ? 1 : -1);
    };
    const onTouchStart = (e) => {
      touchY.current = e.touches[0].clientY;
    };

    // delta>0 means scroll down and delta<0 means scroll up so set direction accordingly -1 for right to left
    // when user first touch the screen then we get the initial touch position to calculate the deltaY in onTouchMove

    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const deltaY = e.touches[0].clientY - touchY.current;
      setDir(deltaY > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };

    // calculate the deltaY by subtracting the current touch position from the initial touch position to determine the scroll direction
    // delta>0 means scroll down and delta<0 means scroll up so set direction accordingly -1 for right to left
    // update the touchY position for next move

    window.addEventListener("wheel", onWheel, { passive: true });                               // add wheel event listener to control the scroll direction on desktop
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });                       // add touchmove event listener to control the scroll direction on mobile

    return () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    };                                                                                         // clean up the event listeners when component unmounts or active state changes
  }, [active]);


// this UseEffect is made to create the animation loop for scrolling the skill icons based on the direction set by the previous UseEffect and the active state to start or stop the animation
useEffect(()=>{
  let id;
  let last = performance.now();  
  const SPEED =80;
  
  const tick =(now)=>{
    const dt = (now-last)/1000;           // time difference in seconds b/w two frame
    last =now;
    let next = x.get() + SPEED*dir*dt;   
    const loop= trackRef.current?.scrollWidth/2||0   // loop point is half of the scroll width of skill icons wrapper         
    
    if(loop){
      if (next<= -loop){
        next+=loop;
        if(next>=0){
        next-=loop;
        }
          }
        }
        x.set(next);
       id = requestAnimationFrame(tick); 
      }
      id = requestAnimationFrame(tick);     // request next frame for animation
    return()=> cancelAnimationFrame(id);             // clean up the animation frame when component unmounts or active state changes
    
    },[dir,x]);


  return (
    
    <section id="skills" ref={sectionRef} 
    className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">

        {/* glow effect **Start** */}
        <div
          className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
      opacity-20 blur-[120px] animate-pulse"
        />
        <div
          className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
      opacity-20 blur-[120px] animate-pulse delay-500
      "
        />
      </div>
      {/* End */}

      <motion.h2 className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        My Skills
      </motion.h2>

      <motion.p className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-10 text-6xl text-[#1cd8d2]"
        style={{x,whiteSpace:"nowrap",willChange:"transform"}}     >                  {/*apply the x motion value to the transform property for smooth animation and set whiteSpace to nowrap to keep the skill icons in a single line  *}        

          {/* aria-label for accessibility to describe the skill icon used when Button has only an icon Link has no text*/}
          {repeated.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 min-w-[120px]"
              aria-label={skill.name}
              title={skill.name}
            >
              <span className="hover:scale-125 transition-transform duration-300">
                {skill.icon}
              </span>
              <p className="text-sm">{skill.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
