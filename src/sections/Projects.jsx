import React from "react";
import calculator from "../assets/calculator.png";
import currency_converter from "../assets/currency-converter.png";
import rock_paper_scissors from "../assets/rock-paper-scissor.png";

const Projects = () => {
  const projects = [
    {
      title: "Rock Paper Scissors Game",
      description:
        "rock-paper-scissors game built with HTML, CSS, and JavaScript. It features a simple and intuitive interface where players can choose their move and compete against the computer. The game keeps track of scores and provides an engaging experience for users.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://rohitgupta7327.github.io/Rock-Paper-Scissor-Game/",
      github: "https://github.com/rohitgupta7327/Rock-Paper-Scissor-Game",
      image: rock_paper_scissors,
    },
    {
      title: "Calculator",
      description:
        "A simple calculator built with HTML, CSS, and JavaScript. It provides basic arithmetic operations such as addition, subtraction, multiplication, and division. The calculator features a clean and user-friendly interface, allowing users to perform calculations easily and efficiently.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: " https://rohitgupta7327.github.io/Calculator/",
      github: "https://github.com/rohitgupta7327/Calculator",
      image: calculator,
    },
    {
      title: "Currency Converter",
      description:
        "A currency converter built with HTML, CSS, and JavaScript. It allows users to convert between different currencies using real-time exchange rates. The converter provides a simple and intuitive interface where users can input the amount and select the desired currencies for conversion.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: " https://rohitgupta7327.github.io/Currency-Converter/",
      github:
        "https://github.com/rohitgupta7327/Currency-Converter?tab=readme-ov-file",
      image:currency_converter,
    },
  ];

  return (
    <section className="bg-black py-20 px-6 overflow-hidden" id="projects">

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Selected <span className="text-purple-500">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"></div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden bg-zinc-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Footer Links - */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-purple-400 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    Live Demo
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    Code
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
{/* See more on GitHub button */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/rohitgupta7327"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-purple-500 transition-all duration-300 font-medium"
          >
            See More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
