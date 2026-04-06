import {useEffect, useState, useRef} from 'react';
import OverlayMenu from './OverlayMenu';
import Logo from '../assets/Logo.png';
import { FiMenu } from "react-icons/fi";
import contact from "../sections/Contact"
const Navbar = () => {
  const [menuopen,setMenuOpen] = useState(false);
  const [visible , setVisible] = useState (true);
  // setting of visibility timmer when navbar would get visible to user {scrollup, onHomepage}
 //  **Start 
  const {forcevisible ,setForceVisible }= useState(false);

  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  useEffect(()=>{
    const homesection = document.querySelector("#home");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting){
        setForceVisible(true);
        setVisible(true);
      }
      else{
        setForceVisible(false);
      }
    },{threshold: 0.1});                                     // if 10 percentage of homescreen is visible

  
  if(homesection) observer.observe(homesection);              // if observer is seeing homepage then navbar get open
  return()=>{
    if(homesection) observer.unobserve(homesection);
  }
  },[]);

  useEffect(()=>{                                              // if we scroll upside then navbar visible for 3sec
    const handleScroll =()=>{
      if(forcevisible){
        setVisible(true);
        return;
      }

    const currentScrollY = window.scrollY;                      // if we scroll downside then navbar not visible
    if(currentScrollY > lastScrollY.current){
      // Scrolling DOWN
      setVisible(false);
      if(timerId.current) clearTimeout(timerId.current);
    }
    else{
     // User is scrolling up: Show navbar
      setVisible(true);

    // Reset the 3-second "Auto-Hide" timer
      if(timerId.current) clearTimeout(timerId.current);
      timerId.current = setTimeout(()=>{
        setVisible(flase);                                      // Hide after 3 seconds of inactivity unless we are at the top
      },3000)
    }
   // Update scroll position for the next frame's comparison
    lastScrollY.current = currentScrollY;
  }

  window.addEventListener("scroll", handleScroll,{passive:true})
  return()=>{
    window.removeEventListener("scroll",handleScroll)
    if(timerId.current) clearTimeout(timerId.current);
  }
  },[forcevisible])


//**End 
                                   
  return (
    <>
    <nav  className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`} >

    <div className='flex items-center space-x-2'>

      <img src={Logo} alt="logo" className = "w-18 h-11 "/>                                            {/* Logo */}   
      <div className='text-2xl font-bold text-white hidden sm:block '>
        Rohit
      </div>

     <div className='block lg:absolute lg:left-1/2 lg-transform lg-tanslate-x-1/2'>
      <button onClick={()=> setMenuOpen(true)}
        className='text-white text-3xl focus:Outline-none'
        aria-label='open Menu'>
        <FiMenu />
      </button>
      </div>

    </div>

       <div  className='hidden lg:block'>                            {/* Reach Out Button */}
      <a href="#contact" className="bg-linear-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300">
      Reach Out</a>
      </div>


    </nav>
    <OverlayMenu isOpen = {menuopen}  onClose= {()=> setMenuOpen(false)}/>
    </>
  )
}

export default Navbar