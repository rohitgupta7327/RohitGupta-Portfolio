import Home from "./sections/Home"
import Projects from "./sections/Projects"
import Skills from "./sections/Skills"
import Testimonials from "./sections/Testimonials"
import Navbar from "./components/Navbar"
import About from "./sections/About"
import Experience from "./sections/Experience"
import Contact from "./sections/Contact"
import Footer from "./sections/Footer"
import ParticalsBackground from "./components/ParticalsBackground"
import CustomCursor from "./components/CustomCursor"
import IntroAnimation from "./components/IntroAnimation"
import React from "react"
function App() {
  const[introDone,setIntroDone]=React.useState(false);

  return(
    <>
  {!introDone && <IntroAnimation onFinish={()=>setIntroDone(true)}/> }
  {introDone &&(

 <div className="relative gradient text-white"> 
  <CustomCursor />
  {/* <ParticalsBackground/> */}
  <Navbar />
  <Home />
  <About />
  <Skills />
  <Projects />
  <Experience />
  {/* <Testimonials /> */}
  <Contact/>
   <Footer />
 </div>
 
 )}
 </>

)
}

export default App
