import { use, useEffect, useRef, useState } from 'react'; 
import {motion , AnimatePresence, delay} from 'framer-motion'
import { FiX } from "react-icons/fi";
const OverlayMenu = ({ isOpen, onClose }) => {

  const isMobile = typeof window !== "undefined" && window.innerWidth <1024;   // shifting menu button from center to right in large and small device
  const origin = isMobile ? "95% 8%" : "50% 8%"    
 
  return (
    // Animation of Menu by exporting framer-motion
    <AnimatePresence>
    { isOpen && (
      
      // **Start   Menu opening in animated circle format
      <motion.div  className = "fixed inset-0 flex items-center justify-center z-50"
      initial={{ clickPath: `circle(0% at ${origin})` }}
      animate = {{ clickPath: `circle(150% at ${origin})` }}
      exit = {{ clickPath: `circle(0% at ${origin})` }}
      transition={{duration : 0.7 , ease :[0.4 , 0 , 0.2 , 1] }}
      style={{backgroundColor: "rgba(0,0,0,0.95)"}}
      >     
      {/* **End */}
      
      <button onClick={onClose}
      
      className='absolute top-6 right-6 text-white text-3xl'
      aria-label="Close Menu"
      >
      <FiX />                                   {/*cross button for close of menu */}
      </button>

      <ul className='space-y-6 text-center'>
      {
      [                                        // array.map() function is used
        "Home" ,
        "About" ,
        "Skills" ,
        "Projects",                                               // "Experiece" ,"Testimonials" can also be added later
        
        "Contact" ,].map((item, index) => {
          return (
            <motion.li 
              key={item} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <a href={`#${item.toLowerCase()}`}
              
              onClick={onClose}
              className="text-4xl text-white font-semihold hover:text-pink-400 transition-colors duration-300"
              >

              {item}
              </a>
              
            </motion.li>
          );
        })
    }
        
      </ul>
      </motion.div>

    )
 }


    </AnimatePresence>
  )
}

export default OverlayMenu