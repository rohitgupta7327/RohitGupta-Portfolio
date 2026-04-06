import React, { useState, useMemo, useEffect, useRef } from 'react'
import {motion,useTransform,useScroll} from "framer-motion";


const experiences=[
{
  role: "Webdeveloper",
  company: "Fresher",
  duration: "2022",
  description:"Built Web Applications"
},
{
  role: "Webdeveloper Intern",
  company: "Mobisoft Technology",
  duration: "2022-23",
  description:"gained experiece"
},{
  role: "graduate engineer",
  company: "HCL Technologies",
  duration: "2027",
  description:"Built Website for me"
},
]

function ExperienceItems({exp, idx, start,end,scrollYProgress,layout}){

const scale= useTransform(scrollYProgress,[start,end],[0,1]);
const opacity= useTransform(scrollYProgress,[start,end],[0,1]);                       // we judge circle size based on scrollYprogress

const yValue = idx % 2 === 0 ? 30 : -30;
const y = useTransform(scrollYProgress,[start,end],[yValue, 0]);   // if index is even show card upside in odd cased show downside
const x =useTransform(scrollYProgress,[start,end],[-24,0]);

if(layout=== "desktop"){
  return(
    <div className='relative flex flex-1 justify-center items-center min-w-0'>
    <motion.div className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
    style={{scale,opacity}}
    />

<motion.div className={`absolute ${idx%2===0 ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
style={{height:40 ,opacity}}
>
</motion.div>
<motion.article className={`absolute ${idx%2===0 ? "bottom-12": "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`} 
style={{opacity,y,maxWidth:"90vw"}}
transition={{duration:0.4, delay: idx*0.15}}
>

<h3 className='text-xl font-semibold'>
  {exp.role}
</h3>
<p className='text-md text-gray-400 mb-3'>
  {exp.company} | {exp.duration}
</p>

 <p className='text-md text-gray-300 break-words'>        {/* break-words is used to break the long word into multiple lines if it exceeds the width of the container */}
  {exp.description}
</p>

</motion.article>
    </div>
  )
}

// for mobile layout
return(

  <div className='relative flex items-start'>
<motion.div className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
style={{scale,opacity}}
>
</motion.div>

<motion.article className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-full max-w-sm ml-6 shadow-lg"
style={{opacity,x}}
transition={{duration:0.4, delay: idx*0.15}}
>
  <h3 className='text-lg font-semibold break-words'>
    {exp.role}
  </h3>

  <p className='text-sm text-gray-400 mb-2 break-words'>
    {exp.company} | {exp.duration}
  </p>

  <p className='text-sm text-gray-300 break-words'>
    {exp.description}
  </p>

</motion.article>
  </div>
)}









const Experience = () => {

  // creating refrence for the storing the value of scroable container for the experience section
  const sceneRef= useRef(null);
  const[isMobile, setIsMobile]= useState(false);

  // useeffect to check its mobile or desktop

  useEffect(()=>{
const checkMobile=()=>setIsMobile(window.innerWidth < 768);
checkMobile();
window.addEventListener("resize",checkMobile);
return()=> window.removeEventListener("resize",checkMobile);
  },[])


  // adjustable height for based on screen size and number of experience items

  const SCENE_HEIGHT_VH = isMobile ? 160*experiences.length : 120*experiences.length;       //when on mobile then height of experience section 160*array length of experiences otherwise 120*array length of experiences
  // to check how much user has scrolled in the experience section we use useScroll hook from framer motion
  const {scrollYProgress}= useScroll({
   target: sceneRef,
   offset:["start start","end end"]  
  })                                              // start start means when the top of the experience section hits the top of the viewport and end end means when the bottom of the experience section hits the bottom of the viewport
 

 // thresholds is an array that contains the values of scrollYProgress at which each experience item should start animating .
const thresholds = useMemo(() => 
  experiences.map((_, i) => (i + 1) / experiences.length),
  [experiences.length]
);

const lineSize =useTransform(scrollYProgress,(v)=>`${v*100}%`)    //  converting scrollYProgress to percentage value for the height of the line
 
 return(

  <section id="experience" className="relative bg-black text-white">
    {/* Scrollable container to provide height for the sticky scene */}
    <div 
      ref={sceneRef} 
      style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }} 
      className='relative'
    >
      {/* Sticky container that stays fixed while the parent scrolls */}
      <div className='sticky top-0 h-screen flex flex-col'>
        
        <h2 className='text-4xl sm:text-5xl font-semibold mt-5 text-center'>
          Experience
        </h2>

        <div className='flex flex-1 items-center justify-center px-6 pb-10'>
          {!isMobile && (
            <div className='relative w-full max-w-7xl'>
              {/* Background Line */}
              <div className='relative h-[6px] bg-white/15 rounded'>
                {/* Progress Line */}
                <motion.div 
                  className='absolute left-0 top-0 h-[6px] bg-white rounded'
                  style={{ width: lineSize }}
                >
                </motion.div>
              </div>
              <div className='relative flex justify-between mt-0'>
                {experiences.map((exp , idx)=>(
                  <ExperienceItems
                  key={idx}
                  exp={exp}
                  idx={idx}
                  start={idx === 0 ? 0: thresholds[idx-1]}   // start animating a bit before the threshold is reached
                  end={thresholds[idx]}
                  scrollYProgress={scrollYProgress}
                  layout="desktop"
                  />

                ))}
              </div>

            </div>
          )}
{/* for mobile layout */}
        {isMobile && (
          <div className='relative w-full max-w-md'>          
        <div className=' absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded'>                           {/* define verticle line for mobile */}
          <motion.div className='absolute top-0 left-0 w-[6px] bg-white rounded origin-top'
          style={{height: lineSize}}
          >
          </motion.div>

          </div>
          <div className='relative flex flex-col gap-10 ml-10 mt-6 pb-28'>
            {experiences.map((exp , idx)=>(
                  <ExperienceItems
                  key={idx}
                  exp={exp}
                  idx={idx}
                  start={idx === 0 ? 0: thresholds[idx-1]}   // start animating a bit before the threshold is reached
                  end={thresholds[idx]}
                  scrollYProgress={scrollYProgress}
                  layout="mobile"
                  />

                ))}
          </div>
          
          </div>

        )}
        </div>

      </div>
    </div>
  </section>
);
}

export default Experience