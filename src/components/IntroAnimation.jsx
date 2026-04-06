import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useMemo } from 'react'

const IntroAnimation = ({onFinish}) => {
  const greetings = useMemo(()=>[
    
"Hello", "नमस्ते", "Hola", "Bonjour",
      "Ciao", "Olá", "Здравствуйте",
      "Merhaba", "Γειά", "Hej", "Hallo", "Salam"

  ],[]);
  const [index, setIndex] = React.useState(0);
  const [visible , setVisible] = React.useState(true);
             
  useEffect(()=>{
    if(index < greetings.length-1) {                  //count less than greeting's length b/c array indexing start from 0
      const id = setInterval(()=>setIndex((i)=>i+1),180);
      return ()=>clearInterval(id);                  // for starting of new time interval of 180ms for every index                            
    }
    else{
      const t= setTimeout(()=>setVisible(false),300);    // clearing visibility of greeting
      return()=>clearTimeout(t);
    }
    },[index , greetings.length])

  return (
      <AnimatePresence  onExitComplete={onFinish}>                
        {visible && (                                    // transition from greeting to main page
        
        <motion.div
        className='fixed inset-0 z-9999 flex items-center justify-center bg-black text-white overflow-hidden'
        initial={{y:0}}
        exit={{y:"-100%",
        transition:{
          duration :1.05,
          ease:[0.22,1,0.36,1],
        },
      }}
      >
        
          <motion.h1                       //motion of greetings one after another

          key={index} 
          className='text-5xl md:text-7xl lg:text-8xl font-bold'
          initial ={{opacity :0, y:20}}
          animate ={{opacity:1  , y:0}}
          exit = {{opacity:0 , y:-20}}
          transition ={{duration : 0.12}}
          >
          {greetings[index]}

          </motion.h1>


        </motion.div>
        )}

      </AnimatePresence>
  )
}

export default IntroAnimation
