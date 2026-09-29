import { useState, useEffect, useRef } from "react"

const skills = {
  Languages: ["C", "C++", "Java", "Python (learning)"],
  "Web (learning)": ["React", "Tailwind CSS", "HTML", "CSS"],
  Tools: ["Git", "GitHub", "VS Code"],
}

const projects = [
  {
    title: "HydroAlert",
    description: "A low-cost smart bottle concept that helps build a healthy drinking habit and reduces dehydration.",
    tech: "Hardware / IoT concept",
    link: "https://github.com/dipanwitabordhan",
  },
  {
    title: "Study & Stress Tracker",
    description: "A tracker that helps monitor both study progress and mental well-being together.",
    tech: "App concept",
    link: "https://github.com/dipanwitabordhan",
  },
]

const certificates = [
  { name: "Hult Prize", issuer: "Hult Prize Foundation", image: "/cert1.jpg" },
  { name: "Python for Data Science", issuer: "Kaggle", image: "/cert2.jpg" },
  { name: "Python Certificate", issuer: "Kaggle", image: "/cert3.jpg" },
  { name: "Participation Certificate", issuer: "bdapps", image: "/cert4.jpg" },
  { name: "Seminar Participation", issuer: "MU Research Society", image: "/cert5.jpg" },
]

// Moving dots joined by lines, drawn on a canvas behind the page
function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let width = 0
    let height = 0

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }))

    let frameId
    function draw() {
      ctx.clearRect(0, 0, width, height)

      dots.forEach((d) => {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > width) d.vx *= -1
        if (d.y < 0 || d.y > height) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(45, 212, 191, 0.8)"
        ctx.fill()
      })

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(45, 212, 191, ${0.4 - distance / 400})`
            ctx.stroke()
          }
        }
      }

      frameId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}

// Fades its content in when it comes into view
function Reveal({ children }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true)
      },
      { threshold: 0.2 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${show ? "show" : ""}`}>
      {children}
    </div>
  )
}

function App() {
  const [ripples, setRipples] = useState([])
  const [jump, setJump] = useState(false)

  function handleClick(e) {
    const id = Date.now()
    setRipples((old) => [...old, { id, x: e.clientX, y: e.clientY }])
    setTimeout(() => {
      setRipples((old) => old.filter((r) => r.id !== id))
    }, 600)
  }

  function jumpPhoto() {
    setJump(true)
    setTimeout(() => setJump(false), 600)
  }

  return (
    <div className="bg-slate-900 text-white" onClick={handleClick}>
      <ParticleBackground />

      <div className="relative z-10">
        {ripples.map((r) => (
          <span key={r.id} className="ripple" style={{ left: r.x, top: r.y }} />
        ))}

        {/* Navbar */}
        <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur border-b border-slate-700 flex flex-wrap items-center justify-between gap-2 px-6 py-3 z-20">
          <a href="#home" className="glow-text text-xl font-bold text-teal-300">Dipanwita Bordhan</a>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="#home" className="hover:text-teal-400">Home</a>
            <a href="#education" className="hover:text-teal-400">Education</a>
            <a href="#skills" className="hover:text-teal-400">Skills</a>
            <a href="#projects" className="hover:text-teal-400">Projects</a>
            <a href="#certifications" className="hover:text-teal-400">Certifications</a>
            <a href="#contact" className="hover:text-teal-400">Contact</a>
          </div>
        </nav>

        {/* Home */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 text-center">
          <img
            src="/photo.jpg"
            alt="Dipanwita"
            onClick={jumpPhoto}
            className={`w-64 h-64 rounded-2xl object-cover border-4 border-teal-300 shadow-[0_0_30px_rgba(45,212,191,0.7)] cursor-pointer ${jump ? "jump" : ""}`}
          />
          <h1 className="pop glow-text text-4xl md:text-5xl font-bold mt-8 mb-3">Hi, I'm Dipanwita</h1>
          <p className="fade-in text-lg text-slate-300 max-w-2xl mb-8">
            I'm a 3rd-year CSE student at{" "}
            <span className="text-yellow-300 font-semibold">Metropolitan University</span>.
            I know C, C++ and Java, and I am now learning Python and web development.
            I like building projects and learning new things.
          </p>
          <div className="flex gap-4">
            <a href="#projects" className="bg-teal-500 text-slate-900 font-semibold px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(45,212,191,0.6)]">
              View Projects
            </a>
            <a href="#contact" className="border border-teal-400 text-teal-400 px-6 py-3 rounded-lg">
              Contact Me
            </a>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="scroll-mt-16 max-w-2xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="glow-text text-3xl font-bold text-teal-300 mb-6">Education</h2>
            <div className="bg-slate-800/70 rounded-lg p-6">
              <h3 className="text-xl font-semibold">B.Sc. in Computer Science and Engineering</h3>
              <p className="text-slate-300">Metropolitan University</p>
              <p className="text-teal-400 mt-2">Current CGPA: 3.50</p>
            </div>
          </Reveal>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-16 max-w-3xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="glow-text text-3xl font-bold text-teal-300 mb-6">Skills</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {Object.keys(skills).map((group) => (
                <div key={group} className="bg-slate-800/70 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">{group}</h3>
                  {skills[group].map((item) => (
                    <p key={item} className="text-slate-300">{item}</p>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-16 max-w-4xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="glow-text text-3xl font-bold text-teal-300 mb-6">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <div key={project.title} className="bg-slate-800/70 rounded-lg p-6 text-left">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-slate-300 mb-2">{project.description}</p>
                  <p className="text-slate-400 text-sm mb-4">Tech: {project.tech}</p>
                  <a href={project.link} className="text-teal-400 hover:underline">
                    View on GitHub
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Certifications */}
        <section id="certifications" className="scroll-mt-16 max-w-3xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="glow-text text-3xl font-bold text-teal-300 mb-6">Certifications</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {certificates.map((cert) => (
                <a
                  key={cert.name}
                  href={cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800/70 rounded-lg p-4 block hover:bg-slate-700/70"
                >
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-slate-400 text-sm">{cert.issuer}</p>
                  <p className="text-teal-400 text-xs mt-2">View Certificate →</p>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-16 max-w-2xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="glow-text text-3xl font-bold text-teal-300 mb-6">Contact</h2>
            <p className="text-slate-300 mb-2">Email: bordhandipanwita@gmail.com</p>
            <div className="flex justify-center gap-6 mt-4">
              <a
                href="https://github.com/dipanwitabordhan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-teal-400 hover:text-teal-300"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/d-bordhan-33a6263b2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-teal-400 hover:text-teal-300"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </Reveal>
        </section>

        <footer className="text-center text-slate-500 py-6 border-t border-slate-800">
          Built with React and Tailwind CSS
        </footer>
      </div>
    </div>
  )
}

export default App