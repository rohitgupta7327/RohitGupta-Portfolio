import {React, useState} from 'react';
import ParticlesBackground from '../components/ParticalsBackground';
import emailjs from "@emailjs/browser";
import { maxGeneratorDuration } from 'framer-motion';
import Astra from "../assets/Astra.png";
import{motion} from "framer-motion";

const SERVICE_ID= import.meta.env.VITE_SERVICE_ID;              // imported service,public,template id from .env file which also pasted in .gitignore file
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {
  const [formData, setFormData] = useState({
    name  :"",
    email :"",
    service:"",
    budget:"",
    idea:"",
  
  });
  const [errors,setErrors] = useState({});
  const[status,setStatus] =useState("");
  
  const handleChange=(e)=>{
    const {name ,value}= e.target;           // name refers to all entries fieldname and value=value inside form's each field e.target tells what written in form
    if(name ==="budget" && value && !/^\d+$/.test(value)) return;         //no special character in budget on accept no.
    
    setFormData((p)=>({...p , [name] : value}));                       // if we fill form then changes will be shown only in that particular field only
    
    if(errors[name]) setErrors((p)=>({...p, [name] : ""}));       // if err occur by user show err to user
  }
 const validateForm=()=>{
  const required =["name", "email" , "service",  "idea" ];
  const newErrors ={};                 // err store in this
  required.forEach((f) => !formData[f].trim() && (newErrors[f]="Fill this field"));             // trim remove if only whhite space is typed
  if(formData.service !== "other" && !formData.budget.trim())                         // When user have not selected Other option , but budget field is empty then show err
  newErrors.budget = "Fill this field"
  setErrors(newErrors);

  return  !Object.keys(newErrors).length;
}
const handleSubmit= async (e)=>{                     // submit handler help form not to reload when msg sent
 e.preventDefault();
 if(!validateForm()) return;
  setStatus("sending")
  try {                                          // format of sending data to mail
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
       ...formData,
       from_name : formData.name,
       reply_to: formData.email,
      },
      PUBLIC_KEY
    );
    setStatus("success");
    setFormData({
    name  :"",
    email :"",
    service:"",
    budget:"",
    idea:"",
    });
  } catch (err) {
    console.error("EmailJS Error:",err);
    setStatus("error");
  }
}
  
  
  
  
  
  
  return (
   <section id="contact" className='w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col
  md:flex-row items-center gap-10
   '>
    <ParticlesBackground/>

    <div className='relative z-10 w-full flex flex-col md:flex-row items-center gap-10 '>
    
    {/* div for left side */}

    <motion.div className="w-full md:w-1/2 flex justify-center"                           
    initial={{opacity:0}}
    whileInView={{opacity:1,x:0}}
    transition ={{duration:0.6}}
    >
      <motion.img src={Astra} alt='contact'
      className='w-72 md:140 rounded-2xl shadow-lg object-cover'
      animate={{y:[0,-10,0]}}
      transition={{duration: 2, repeat:Infinity , ease:"easeInOut"}}
      />
    </motion.div>

   {/* div for Right side */}
    {/* Contact From */}

    <motion.div className='w-ful md:w-full bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10'
    initial={{opacity:0 , x:50}}
    whileInView={{opacity:1, x:0}}
    transition={{duration:0.6}}
    >
    <h2 className='text-3xl font-bold mb-6'>
    Let's Work Together
    </h2>

    {/* Form Started */}

    <form className='flex flex-col gap-5' onSubmit={handleSubmit}  >
    {/* Name section */}

    <div className='flex flex-col'>
      <label className='mb-1'>Your Name<span className='text-red-500'>*</span></label>
      <input type='text' name="name" placeholder='Your Name'
      value={formData.name}
      onChange={handleChange}
      className={`p-3 rounded-md bg-white/10 border ${errors.name ? "border-red-500": "border-gray-500"}text-white focus:outline-none focus:border-blue-500`}
      />
      {errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
    </div>

    {/* Email */}
    <div className='flex flex-col'>
    <label className='mb-1'>Your Email<span className='text-red-500'>*</span></label>
    
    <input type='text'
    name='email'
    placeholder='Your Email'
    value={formData.email}
    onChange={handleChange}
    className={`p-3 rounded-md bg-white/10 border ${errors.email ? "border-red-500": "border-gray-500"}text-white focus:outline-none focus:border-blue-500`}
    />
    {errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}                            {/*if error occur in email field */}
    </div>

    {/* Service Needed */}

    <div  className='flex flex-col'>
      <label className='mb-1'> Service Needed<span className='text-red-500'> *</span></label>
    <select name='service'
    value={formData.service}
    onChange={handleChange}
    className={`p-3 rounded-md bg-white/10 border ${errors.service ? "border-red-500": "border-gray-500"}text-white focus:outline-none focus:border-blue-500`}
    >
    <option value="" disabled  className='text-black'>
      Something in Mind?
    </option>

    <option value="Web Development" className='text-black'>
    Web Development
    </option>

    <option value="Mobile Application"   className='text-black'>
    Mobile Application
    </option>

    <option value="other" className='text-black'>
    Others
    </option>

    </select>
    {errors.service && <p className='text-red-500 text-xs'>{errors.service}</p>}    
    </div>


    {/* Budget Field */}
    {/* if other is selected in budget then budget get disappear */}
    
    {formData.service && formData.service !=="other" &&(       
      <div className='flex flex-col'>
        <label className='mb-1 '>Budget <span className='text-red-500'>*</span></label>
        <input type="text"
        name="budget"
        placeholder='Your Budget'
        onChange={handleChange}
        value={formData.budget}
        className={`p-3 rounded-md bg-white/10 border ${errors.budget ? "border-red-500": "border-gray-500"}text-white focus:outline-none focus:border-blue-500`}
        />
      {errors.budget && <p className='text-red-500 text-xs'>{errors.budget}</p>}  
      </div>
    )}        

    {/* Explain Your Idea */}
    <div className='flex flex-col'>
    <label className='mb-1'>Explain Your Idea<span className='text-red-500'>*</span></label>
    <textarea name='idea' 
    rows={5}
    placeholder='Enter Your Idea'
    value={formData.idea}
    onChange={handleChange}
    className={`p-3 rounded-md bg-white/10 border ${errors.idea ? "border-red-500": "border-gray-500"}text-white focus:outline-none focus:border-blue-500`}
    />
    {errors.budget && <p className='text-red-500 text-xs'>{errors.budget}</p>}
    </div>

    {status && (
      <p className={`text-sm ${status==="success" ? "text-green-400" : status=== "error" ? "text-red-400" :"text-yellow-400"}`}>
      {status === "sending" ? "sending..." : status === "success" ? "Message Sent Successfully! ✅" : "Something Went wrong ✘"}
      </p>
    )}
  <motion.button className='bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition'
  whileHover={{scale:1.05}}
  whileTap={{scale:0.95}}
  disabled={status==="sending"}                  
  type='submit'>                          
 {/*disable send message button when msg is sending */}

   {status==="sending" ? "sending..." : "Send Message"}      {/* when msg sent then enable button */}

  </motion.button>
    </form>
    </motion.div>




    </div>

   </section>
  )
}

export default Contact