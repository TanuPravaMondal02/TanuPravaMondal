import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  FileText, 
  ExternalLink, 
  Code, 
  Cpu, 
  Microscope, 
  Award, 
  BookOpen, 
  Menu, 
  X,
  Zap,
  Layers,
  Globe,
  Database,
  Atom, 
  GraduationCap,
  Fingerprint,
  BarChart, 
  Aperture,
  Sun,
  Moon
} from 'lucide-react';

// --- Components ---

const Section = ({ id, className, children, darkMode }) => (
  <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 transition-colors duration-300 ${className}`}>
    {children}
  </section>
);

const SectionTitle = ({ children, icon: Icon, darkMode }) => (
  <div className="flex items-center gap-3 mb-12">
    {Icon && <Icon className="w-8 h-8 text-blue-500" />}
    <h2 className={`text-3xl md:text-4xl font-bold relative transition-colors duration-300 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      {children}
      <span className="absolute -bottom-3 left-0 w-24 h-1 bg-blue-600 rounded-full"></span>
    </h2>
  </div>
);

const Card = ({ children, className, darkMode }) => (
  <div className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
    darkMode 
      ? 'bg-[#0f172a]/80 border-slate-700/50 hover:border-blue-500/50 hover:shadow-blue-900/20' 
      : 'bg-white/80 border-slate-200 hover:border-blue-400/50 hover:shadow-blue-200/50'
  } ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "blue", darkMode }) => {
  const colors = {
    blue: darkMode 
      ? "bg-blue-900/40 text-blue-200 border-blue-700/50" 
      : "bg-blue-100 text-blue-800 border-blue-200",
    white: darkMode 
      ? "bg-slate-800 text-slate-200 border-slate-600" 
      : "bg-slate-100 text-slate-700 border-slate-300",
    indigo: darkMode 
      ? "bg-indigo-900/40 text-indigo-200 border-indigo-700/50" 
      : "bg-indigo-100 text-indigo-800 border-indigo-200",
    cyan: darkMode 
      ? "bg-cyan-900/40 text-cyan-200 border-cyan-700/50" 
      : "bg-cyan-100 text-cyan-800 border-cyan-200",
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

// --- Canvas Animation Component (CERN / Particle Theme) ---
const HeroCanvas = ({ darkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
        
        // Color logic based on theme
        if (darkMode) {
           // Dark Mode: White and Blue
           this.hue = Math.random() > 0.8 ? 0 : 220; 
           this.sat = this.hue === 0 ? '0%' : '100%';
           this.light = this.hue === 0 ? '100%' : '60%';
        } else {
           // Light Mode: Dark Grey and Blue
           this.hue = Math.random() > 0.8 ? 220 : 220; 
           this.sat = '100%';
           this.light = Math.random() > 0.5 ? '40%' : '30%'; 
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, ${this.sat}, ${this.light}, ${this.alpha})`;
        ctx.fill();
      }
    }

    const init = () => {
      particles = Array.from({ length: 100 }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            const opacity = 0.12 * (1 - dist / 120);
            if (darkMode) {
                ctx.strokeStyle = `hsla(220, 100%, 70%, ${opacity})`;
            } else {
                ctx.strokeStyle = `hsla(220, 80%, 40%, ${opacity})`;
            }
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]); // Re-run when darkMode changes

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" />;
};

// --- Main App Component ---

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(true);

  // Navigation Links
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Publications', href: '#publications' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
  ];

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Base styles based on theme
  const bgClass = darkMode ? "bg-[#020617]" : "bg-slate-50";
  const textClass = darkMode ? "text-slate-300" : "text-slate-600";
  const navBgClass = darkMode ? "bg-[#020617]/90 border-slate-800" : "bg-white/90 border-slate-200";
  const headingClass = darkMode ? "text-white" : "text-slate-900";
  const subTextClass = darkMode ? "text-slate-400" : "text-slate-600";
  
  return (
    <div className={`min-h-screen ${bgClass} ${textClass} font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300`}>
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${navBgClass}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className={`text-2xl font-bold flex items-center gap-2 ${headingClass}`}>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="font-bold text-white">TM</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                  activeSection === link.href.substring(1) ? 'text-blue-500' : subTextClass
                }`}
              >
                {link.name}
              </a>
            ))}
            
            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                title="Toggle Theme"
            >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a 
              href="mailto:tanumond@uef.fi"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
            >
              Contact Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full ${darkMode ? 'text-yellow-400' : 'text-slate-600'}`}
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
                className={`${darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden absolute top-20 left-0 w-full border-b p-6 flex flex-col gap-4 shadow-xl ${darkMode ? 'bg-[#020617] border-slate-800' : 'bg-white border-slate-200'}`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-lg font-medium hover:text-blue-500 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-gradient-to-b ${darkMode ? 'from-[#020617] via-[#0f172a] to-[#020617]' : 'from-slate-50 via-white to-slate-50'}`}>
        <HeroCanvas darkMode={darkMode} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm max-w-full ${darkMode ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
              <Atom size={16} className="text-blue-500 flex-shrink-0" />
              <span className={`font-medium text-sm tracking-wide truncate ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>Erasmus Mundus Scholar</span>
            </div>
          </div>

          <h1 className={`text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight ${headingClass}`}>
            Tanu Prava <span className="text-blue-600">Mondal</span>
          </h1>
          <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed ${subTextClass}`}>
            Photonics & AI Student. <span className="text-blue-500 font-medium">Aspiring Research Scientist.</span>
            <span className={`block mt-4 text-lg md:text-xl ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              Specializing in thin-film optimization, with a strong drive to apply these skills to <span className="text-blue-500 font-medium">Advanced Optical Systems</span> and <span className="text-blue-500 font-medium">Intelligent Sensing Technologies</span>.
            </span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://scholar.google.com/citations?hl=en&user=A4lxmS8AAAAJ&view_op=list_works&gmla=AGd7smEGy6vh09JzCU1X-seSicI0i041a8F6wGCn0XRitkWnxju5pMZgpkKQSoeY10G24ixGa5CWcQzqlE6Zpzb64nyhx6yX5jNSylWwvM0FiwA46qabMaDHpyWl6q90Pa9lNeZexGVS" target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded font-medium transition-all border flex items-center gap-2 ${darkMode ? 'bg-[#1e293b] hover:bg-[#334155] text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'}`}>
              <GraduationCap size={18} />
              Google Scholar
            </a>
            <a href="https://www.researchgate.net/profile/Tanu-Mondal" target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded font-medium transition-all border flex items-center gap-2 ${darkMode ? 'bg-[#1e293b] hover:bg-[#334155] text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'}`}>
              <Microscope size={18} />
              ResearchGate
            </a>
            <a href="https://orcid.org/0009-0003-9324-8864" target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded font-medium transition-all border flex items-center gap-2 ${darkMode ? 'bg-[#1e293b] hover:bg-[#334155] text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'}`}>
              <Fingerprint size={18} />
              ORCID
            </a>
            <a href="https://www.linkedin.com/in/tanu-prava-mondal-28124a200/" target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded font-medium transition-all border flex items-center gap-2 ${darkMode ? 'bg-[#1e293b] hover:bg-[#334155] text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'}`}>
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>

          <div className={`mt-16 flex justify-center gap-12 max-w-lg mx-auto border-t pt-8 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
             <div className="flex flex-col items-center">
                <span className={`text-3xl font-bold ${headingClass}`}>8</span>
                <span className="text-xs uppercase tracking-widest text-slate-500 mt-1">Publications</span>
             </div>
             <div className={`flex flex-col items-center border-l pl-12 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className={`text-3xl font-bold ${headingClass}`}>89+</span>
                <span className="text-xs uppercase tracking-widest text-slate-500 mt-1">Citations</span>
             </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" className={darkMode ? 'bg-[#0b1120]' : 'bg-slate-50'} darkMode={darkMode}>
        <div className="max-w-4xl mx-auto">
          <SectionTitle icon={FileText} darkMode={darkMode}>About Me</SectionTitle>
          <div className="grid md:grid-cols-3 gap-12">
            <div className={`md:col-span-2 space-y-6 text-lg leading-relaxed text-justify ${subTextClass}`}>
              <p>
                I am a Photonics Researcher and Erasmus Mundus Scholar pursuing a Joint Master Degree in Intelligent Photonics for Security, Reliability, Sustainability, and Safety (iPSRS).
              </p>
              <p>
                My expertise lies at the intersection of <strong className="text-blue-500">Photonics</strong> and <strong className="text-blue-500">Artificial Intelligence</strong>. I have a proven track record in characterizing and optimizing multi-layered thin-film structures (Ag, TiO₂, 2D materials) using COMSOL Multiphysics and FEM.
              </p>
              <p className={`border-l-4 border-blue-600 pl-4 italic py-2 pr-2 ${darkMode ? 'text-slate-300 bg-blue-900/10' : 'text-slate-700 bg-blue-50'}`}>
                "I am actively looking for internship opportunities to apply my skills in computational photonics and AI. I am eager to contribute to innovative projects involving material optimization, sensor design, and intelligent systems."
              </p>
            </div>
            <div className="space-y-4">
              <Card className={darkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} darkMode={darkMode}>
                <h3 className={`font-semibold mb-4 flex items-center gap-2 ${headingClass}`}>
                  <Globe size={18} className="text-blue-500" />
                  Languages
                </h3>
                <ul className={`space-y-3 text-sm ${subTextClass}`}>
                  <li className={`flex justify-between border-b pb-2 ${darkMode ? 'border-slate-700/50' : 'border-slate-100'}`}><span>English</span> <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Fluent</span></li>
                  <li className={`flex justify-between border-b pb-2 ${darkMode ? 'border-slate-700/50' : 'border-slate-100'}`}><span>Bengali</span> <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Native</span></li>
                  <li className={`flex justify-between border-b pb-2 ${darkMode ? 'border-slate-700/50' : 'border-slate-100'}`}><span>Hindi</span> <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Fluent</span></li>
                </ul>
              </Card>
              <Card className={darkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} darkMode={darkMode}>
                <h3 className={`font-semibold mb-4 flex items-center gap-2 ${headingClass}`}>
                  <Award size={18} className="text-blue-500" />
                  Scores
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${subTextClass}`}>GRE</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${darkMode ? 'bg-blue-900/50 text-blue-200 border-blue-800' : 'bg-blue-50 text-blue-800 border-blue-200'}`}>329</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${subTextClass}`}>TOEFL</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${darkMode ? 'bg-blue-900/50 text-blue-200 border-blue-800' : 'bg-blue-50 text-blue-800 border-blue-200'}`}>105</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Education & Experience */}
      <Section id="experience" className={darkMode ? '' : 'bg-slate-50'} darkMode={darkMode}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={Layers} darkMode={darkMode}>Experience & Education</SectionTitle>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education Column */}
            <div>
              <h3 className={`text-2xl font-bold mb-8 flex items-center gap-2 border-b pb-4 ${darkMode ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'}`}>
                <BookOpen className="text-blue-500" /> Education
              </h3>
              <div className={`relative border-l ml-3 space-y-12 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                <div className="relative pl-8">
                  <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ring-4 ${darkMode ? 'bg-blue-500 ring-[#020617]' : 'bg-blue-600 ring-slate-50'}`}></div>
                  <span className="text-xs font-bold tracking-wider text-blue-500 uppercase">2025 - 2027</span>
                  <h4 className={`text-xl font-bold mt-2 ${headingClass}`}>M.Sc. Intelligent Photonics (iPSRS)</h4>
                  <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>University Jean Monnet (France) & UEF (Finland)</p>
                  <p className="mt-3 text-slate-500 text-sm leading-relaxed">Specialization: Photonics and AI. Coursework in Digital Holography, Laser Physics, and Light-Matter Interaction.</p>
                </div>

                <div className="relative pl-8">
                  <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ring-4 ${darkMode ? 'bg-slate-600 ring-[#020617]' : 'bg-slate-400 ring-slate-50'}`}></div>
                  <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">2020 - 2024</span>
                  <h4 className={`text-xl font-bold mt-2 ${headingClass}`}>B.Sc. Electrical & Electronic Engineering</h4>
                  <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>Ahsanullah University of Science and Technology</p>
                  <p className="mt-3 text-slate-500 text-sm leading-relaxed">GPA: 3.64/4.00. Thesis: Design and Optimization of SPR Based Biosensors.</p>
                </div>
              </div>
            </div>

            {/* Experience Column */}
            <div>
              <h3 className={`text-2xl font-bold mb-8 flex items-center gap-2 border-b pb-4 ${darkMode ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'}`}>
                <Microscope className="text-blue-500" /> Experience
              </h3>
              <div className={`relative border-l ml-3 space-y-12 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                <div className="relative pl-8">
                  <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ring-4 ${darkMode ? 'bg-blue-500 ring-[#020617]' : 'bg-blue-600 ring-slate-50'}`}></div>
                  <span className="text-xs font-bold tracking-wider text-blue-500 uppercase">Feb 2025 - Oct 2025</span>
                  <h4 className={`text-xl font-bold mt-2 ${headingClass}`}>Research Assistant & Trainer</h4>
                  <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>Ahsanullah University of Science and Technology</p>
                  <ul className={`mt-3 space-y-2 text-sm list-disc pl-4 marker:text-blue-600 ${subTextClass}`}>
                    <li>Designed high-sensitivity SPR biosensors (TiO₂/Ag).</li>
                    <li>Utilized Differential Evolution in MATLAB for geometric optimization.</li>
                    <li>Orchestrated research for 8 peer-reviewed publications.</li>
                  </ul>
                </div>

                <div className="relative pl-8">
                  <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ring-4 ${darkMode ? 'bg-slate-600 ring-[#020617]' : 'bg-slate-400 ring-slate-50'}`}></div>
                  <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">May 2025 - Aug 2025</span>
                  <h4 className={`text-xl font-bold mt-2 ${headingClass}`}>Cybersecurity Governance Intern</h4>
                  <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>Banglalink (Digitalyst Program)</p>
                  <ul className={`mt-3 space-y-2 text-sm list-disc pl-4 marker:text-slate-600 ${subTextClass}`}>
                    <li>Managed cybersecurity governance using Nessus.</li>
                    <li>Led technical documentation and R&D collaboration.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Publications Section */}
      <Section id="publications" className={darkMode ? 'bg-[#0b1120]' : 'bg-slate-100'} darkMode={darkMode}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={FileText} darkMode={darkMode}>Publications</SectionTitle>
          <div className="grid gap-4">
            {[
              {
                title: "Optimized design of SPR biosensor for Mycobacterium tuberculosis using differential evolution",
                journal: "Microchimica Acta (Springer)",
                factor: "IF: 5.3 (Q1)",
                date: "Nov 2025",
                doi: "10.1007/s00604-025-07636-6",
                tags: ["Differential Evolution"]
              },
              {
                title: "Highly Sensitive Single-Core SPR Biosensor for Detecting Six Different Cancer Cells Using PCF",
                journal: "Plasmonics (Springer)",
                factor: "IF: 4.3 (Q3)",
                date: "Aug 2025",
                doi: "10.1007/s11468-025-03273-0",
                tags: ["Photonic Crystal Fiber"]
              },
              {
                title: "Design and Optimization of an SPR-Based Biosensor with Ultra-High Sensitivity Using a Hybrid Structure",
                journal: "Plasmonics (Springer)",
                factor: "IF: 4.3 (Q3)",
                date: "Jun 2025",
                doi: "10.1007/s11468-025-03107-2",
                tags: ["Hybrid Plasmonics"]
              },
              {
                title: "Pioneering Malaria Diagnostics with a Multi-Layered BK7/TiO₂/Ag/Si/BP SPR Biosensor",
                journal: "Plasmonics (Springer)",
                factor: "IF: 4.3 (Q3)",
                date: "Apr 2025",
                doi: "10.1007/s11468-025-02921-9",
                tags: ["Thin-Film Stack"]
              },
              {
                title: "Design and Optimization of a Highly Sensitive SPR Biosensor for Mycobacterium Tuberculosis",
                journal: "IEEE Sensors Journal",
                factor: "IF: 4.5 (Q1)",
                date: "Mar 2025",
                doi: "10.1109/JSEN.2025.3536976",
                tags: ["Surface Plasmon Resonance"]
              },
              {
                title: "Innovative TiO₂/Ag/TiO₂ Sandwiched SPR Sensor with WSe₂ Layer for Dengue Virus",
                journal: "Plasmonics (Springer)",
                factor: "IF: 4.3 (Q3)",
                date: "Jan 2025",
                doi: "10.1007/s11468-024-02730-6",
                tags: ["2D Materials"]
              },
              {
                title: "Photonic Crystal Fiber-Based SPR Biosensor Coated with Ag-TiO₂ for Skin Cancer Detection",
                journal: "Optical and Quantum Electronics",
                factor: "IF: 4.0 (Q2)",
                date: "Jul 2024",
                doi: "10.1007/s11082-024-07250-5",
                tags: ["Nanophotonics"]
              },
              {
                title: "Design and Performance Analysis of Gold-Coated Photonic Crystal Fiber Plasmonic Biosensor",
                journal: "IEEE WICON-ECE Conference",
                factor: "Conference",
                date: "Mar 2024",
                doi: "10.1109/WIECON-ECE60392.2023.10456377",
                tags: ["FEM Simulation"]
              }
            ].map((pub, idx) => (
              <Card key={idx} className={darkMode ? 'group hover:bg-[#1e293b]' : 'group hover:bg-white'} darkMode={darkMode}>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold transition-colors group-hover:text-blue-500 ${headingClass}`}>
                      {pub.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm items-center text-slate-500">
                      <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{pub.journal}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                      <span>{pub.factor}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                      <span className="font-mono text-xs">{pub.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {pub.tags.map(tag => (
                      <Badge key={tag} color="blue" darkMode={darkMode}>{tag}</Badge>
                    ))}
                    <a 
                      href={`https://doi.org/${pub.doi}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-colors border ${darkMode ? 'bg-slate-800 hover:bg-blue-600 text-white border-slate-700 hover:border-blue-500' : 'bg-slate-50 hover:bg-blue-500 text-slate-600 hover:text-white border-slate-200 hover:border-blue-500'}`}
                      title="View DOI"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className={darkMode ? '' : 'bg-slate-50'} darkMode={darkMode}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={Code} darkMode={darkMode}>Projects</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className={darkMode ? 'h-full flex flex-col bg-[#1e293b] border-slate-700' : 'h-full flex flex-col bg-white border-slate-200'} darkMode={darkMode}>
              <div className="mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded flex items-center justify-center border ${darkMode ? 'bg-cyan-900/30 text-cyan-400 border-cyan-500/30' : 'bg-cyan-50 text-cyan-600 border-cyan-200'}`}>
                    <Aperture size={24} />
                  </div>
                  <a 
                    href="https://drive.google.com/file/d/1pkwVhC4f1ZLZnE-66SP9KOkM1mBd-Bol/view" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${headingClass}`}>Digital Holography & Phase Retrieval</h3>
                <p className={`text-sm ${subTextClass}`}>
                   Implemented Rayleigh-Sommerfeld propagation and Gerchberg-Saxton algorithms to reconstruct phase maps from holograms for biological sample analysis.
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge color="cyan" darkMode={darkMode}>Python</Badge>
                  <Badge color="cyan" darkMode={darkMode}>Fourier Transform</Badge>
                  <Badge color="cyan" darkMode={darkMode}>Optics</Badge>
                </div>
                <div className={`text-sm border-t pt-4 ${darkMode ? 'text-slate-500 border-slate-700' : 'text-slate-500 border-slate-100'}`}>
                   Enables precise refractive index and thickness measurement of bacteria samples.
                </div>
              </div>
            </Card>

            <Card className={darkMode ? 'h-full flex flex-col bg-[#1e293b] border-slate-700' : 'h-full flex flex-col bg-white border-slate-200'} darkMode={darkMode}>
              <div className="mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded flex items-center justify-center border ${darkMode ? 'bg-indigo-900/30 text-indigo-400 border-indigo-500/30' : 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}>
                    <Database size={24} />
                  </div>
                  <a 
                    href="https://drive.google.com/file/d/1DP945pbrRbiq84aZcOCkbtsRIArtvuud/view" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${headingClass}`}>Automated Seed Counting & Classification</h3>
                <p className={`text-sm ${subTextClass}`}>
                  Developed a computer vision pipeline to automate particle/seed counting for agricultural reliability using Python.
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge color="indigo" darkMode={darkMode}>Python</Badge>
                  <Badge color="indigo" darkMode={darkMode}>OpenCV</Badge>
                  <Badge color="indigo" darkMode={darkMode}>CNN</Badge>
                </div>
                <div className={`text-sm border-t pt-4 ${darkMode ? 'text-slate-500 border-slate-700' : 'text-slate-500 border-slate-100'}`}>
                  Achieved 80% classification accuracy using image pre-processing and deep learning.
                </div>
              </div>
            </Card>

            <Card className={darkMode ? 'h-full flex flex-col bg-[#1e293b] border-slate-700' : 'h-full flex flex-col bg-white border-slate-200'} darkMode={darkMode}>
              <div className="mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded flex items-center justify-center border ${darkMode ? 'bg-indigo-900/30 text-indigo-400 border-indigo-500/30' : 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}>
                    <BarChart size={24} />
                  </div>
                  <a 
                    href="https://drive.google.com/file/d/1vxV-Kg5k6umHnKmSdeX0tsKoGggH84VE/view" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${headingClass}`}>Automotive Fuel Efficiency Analysis</h3>
                <p className={`text-sm ${subTextClass}`}>
                   Conducted EDA and developed Polynomial Ridge Regression models to predict vehicle MPG with 87% accuracy, utilizing PCA for feature extraction.
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge color="indigo" darkMode={darkMode}>Python</Badge>
                  <Badge color="indigo" darkMode={darkMode}>Scikit-learn</Badge>
                  <Badge color="indigo" darkMode={darkMode}>Seaborn</Badge>
                </div>
                <div className={`text-sm border-t pt-4 ${darkMode ? 'text-slate-500 border-slate-700' : 'text-slate-500 border-slate-100'}`}>
                   Identified weight and origin as key efficiency drivers through statistical modeling.
                </div>
              </div>
            </Card>

            <Card className={darkMode ? 'h-full flex flex-col bg-[#1e293b] border-slate-700' : 'h-full flex flex-col bg-white border-slate-200'} darkMode={darkMode}>
              <div className="mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded flex items-center justify-center border ${darkMode ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                    <Cpu size={24} />
                  </div>
                  <a 
                    href="https://drive.google.com/file/d/1T8uwD10lOYnXvgIwxrcVcFYuNd5QWbAj/view" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${headingClass}`}>2:1 Multiplexer Design Optimization</h3>
                <p className={`text-sm ${subTextClass}`}>
                  Comparative analysis of power efficiency using Adiabatic (2N2P, 2N2N2P), NAND, and NOR logic.
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge color="blue" darkMode={darkMode}>Verilog</Badge>
                  <Badge color="blue" darkMode={darkMode}>MATLAB</Badge>
                  <Badge color="blue" darkMode={darkMode}>Hardware</Badge>
                </div>
                <div className={`text-sm border-t pt-4 ${darkMode ? 'text-slate-500 border-slate-700' : 'text-slate-500 border-slate-100'}`}>
                   Simulated power dissipation metrics to identify optimal logic configurations.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" className={darkMode ? 'bg-[#0b1120]' : 'bg-slate-100'} darkMode={darkMode}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle icon={Zap} darkMode={darkMode}>Technical Expertise</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className={darkMode ? 'hover:border-blue-500/50' : 'hover:border-blue-400/50'} darkMode={darkMode}>
              <h3 className={`text-lg font-bold mb-4 border-b pb-2 ${darkMode ? 'text-white border-slate-700' : 'text-slate-900 border-slate-200'}`}>Simulation & Modeling</h3>
              <ul className={`space-y-2 text-sm ${subTextClass}`}>
                <li className="flex items-center gap-2"><Zap size={14} className="text-blue-500"/> COMSOL Multiphysics</li>
                <li className="flex items-center gap-2"><Zap size={14} className="text-blue-500"/> CST Studio Suite</li>
                <li className="flex items-center gap-2"><Zap size={14} className="text-blue-500"/> Ansys Lumerical</li>
                <li className="flex items-center gap-2"><Zap size={14} className="text-blue-500"/> MATLAB (FEM)</li>
                <li className="flex items-center gap-2"><Zap size={14} className="text-blue-500"/> AutoCAD / SketchUp</li>
              </ul>
            </Card>

            <Card className={darkMode ? 'hover:border-indigo-500/50' : 'hover:border-indigo-400/50'} darkMode={darkMode}>
              <h3 className={`text-lg font-bold mb-4 border-b pb-2 ${darkMode ? 'text-white border-slate-700' : 'text-slate-900 border-slate-200'}`}>AI & Programming</h3>
              <ul className={`space-y-2 text-sm ${subTextClass}`}>
                <li className="flex items-center gap-2"><Code size={14} className="text-indigo-500"/> Python (PyTorch, Keras)</li>
                <li className="flex items-center gap-2"><Code size={14} className="text-indigo-500"/> C++ / Verilog</li>
                <li className="flex items-center gap-2"><Code size={14} className="text-indigo-500"/> CNN / ConvLSTM</li>
                <li className="flex items-center gap-2"><Code size={14} className="text-indigo-500"/> Genetic Algorithms</li>
                <li className="flex items-center gap-2"><Code size={14} className="text-indigo-500"/> Git / LaTeX</li>
              </ul>
            </Card>

            <Card className={darkMode ? 'hover:border-blue-500/50' : 'hover:border-blue-400/50'} darkMode={darkMode}>
              <h3 className={`text-lg font-bold mb-4 border-b pb-2 ${darkMode ? 'text-white border-slate-700' : 'text-slate-900 border-slate-200'}`}>Experimental Photonics</h3>
              <ul className={`space-y-2 text-sm ${subTextClass}`}>
                <li className="flex items-center gap-2"><Microscope size={14} className="text-blue-500"/> Raman Spectroscopy</li>
                <li className="flex items-center gap-2"><Microscope size={14} className="text-blue-500"/> Digital Holography (NDT)</li>
                <li className="flex items-center gap-2"><Microscope size={14} className="text-blue-500"/> Interferometry</li>
                <li className="flex items-center gap-2"><Microscope size={14} className="text-blue-500"/> Cleanroom Protocols</li>
                <li className="flex items-center gap-2"><Microscope size={14} className="text-blue-500"/> Laser Safety Class 3/4</li>
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className={`border-t py-12 transition-colors duration-300 ${darkMode ? 'bg-[#020617] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className={`text-2xl font-bold mb-6 ${headingClass}`}>Let's Connect</h2>
            <p className={`mb-8 max-w-lg mx-auto ${subTextClass}`}>
                Ready to contribute to advanced photonics and detector development.
            </p>
            <div className="flex justify-center gap-6 mb-8">
                <a href="mailto:tanumond@uef.fi" className={`w-12 h-12 rounded flex items-center justify-center transition-all border ${darkMode ? 'bg-[#1e293b] hover:bg-blue-600 hover:text-white text-slate-400 border-slate-700 hover:border-blue-500' : 'bg-white hover:bg-blue-500 hover:text-white text-slate-600 border-slate-200 hover:border-blue-500 shadow-sm'}`}>
                    <Mail size={20} />
                </a>
                <a href="https://www.linkedin.com/in/tanu-prava-mondal-28124a200/" target="_blank" className={`w-12 h-12 rounded flex items-center justify-center transition-all border ${darkMode ? 'bg-[#1e293b] hover:bg-[#0077b5] hover:text-white text-slate-400 border-slate-700 hover:border-[#0077b5]' : 'bg-white hover:bg-[#0077b5] hover:text-white text-slate-600 border-slate-200 hover:border-[#0077b5] shadow-sm'}`}>
                    <Linkedin size={20} />
                </a>
            </div>
            <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} Tanu Prava Mondal.
            </p>
        </div>
      </footer>
    </div>
  );
}