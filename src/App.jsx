import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene from './components/canvas/Scene';
import CustomCursor from './components/ui/CustomCursor';
import TiltCard from './components/ui/TiltCard';
import { Github, Linkedin, Mail, ExternalLink, Cpu, BookOpen, Music, Code, PenTool } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const heroRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    // 1. Initialize Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // 2. Parallax Depth Layers (Background moves slower, Foreground faster)
    gsap.to('.parallax-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // 3. Initial Hero Animation
    gsap.fromTo('.hero-reveal', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );

    // 4. Content Reveal on scroll
    gsap.utils.toArray('.reveal-up').forEach((elem) => {
      gsap.fromTo(elem, 
        { y: 60, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
          }
        }
      );
    });

    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <CustomCursor />
      <Scene />

      {/* Futuristic Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-screen">
        <div className="text-xl font-black tracking-widest uppercase text-white">
          AVR<span className="text-cyber-pink">.</span>SYS
        </div>
        <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase font-bold text-muted">
          <a href="#about" className="interactive hover:text-cyber-purple transition-colors">Core Logic</a>
          <a href="#stack" className="interactive hover:text-cyber-pink transition-colors">Arsenal</a>
          <a href="#work" className="interactive hover:text-cyber-blue transition-colors">Deployments</a>
          <a href="#connect" className="interactive hover:text-white transition-colors">Uplink</a>
        </div>
      </nav>

      <main className="relative z-10">
        
        {/* =======================================================
            HERO SECTION
            Left: Dynamic Heading & CTA
            Right: Space occupied by 3D DNA Canvas (handled in Scene.jsx)
        ======================================================== */}
        <section id="home" ref={heroRef} className="min-h-screen flex items-center px-8 md:px-20 relative pt-20">
          <div className="w-full md:w-1/2 parallax-bg">
            <h2 className="hero-reveal text-sm tracking-[0.4em] text-cyber-blue uppercase mb-4 font-bold">
              Autonomous Systems Engineer
            </h2>
            <h1 className="hero-reveal text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-6 text-white uppercase tracking-tighter">
              Cyber<br/>
              <span className="text-gradient">Shinobi</span>
            </h1>
            <p className="hero-reveal text-lg text-muted font-light max-w-lg mb-10 leading-relaxed">
              Merging rigid logic with digital imagination. Building immersive systems where neon visuals breathe and adapt to user behavior.
            </p>
            
            <div className="hero-reveal flex gap-6">
              <a href="#work" className="btn-neon interactive">
                Initialize System
              </a>
              <a href="#connect" className="btn-outline interactive">
                Connect
              </a>
            </div>
          </div>
          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-8 md:left-20 hero-reveal flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-muted font-bold rotate-90 origin-left translate-y-8">Scroll</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-cyber-purple to-transparent"></div>
          </div>
        </section>


        {/* =======================================================
            ABOUT SECTION / THE ARCHITECT
            Classic Future representation of personal description
        ======================================================== */}
        <section id="about" className="py-32 px-8 md:px-20">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            <div className="md:col-span-7 space-y-8">
              <div className="reveal-up">
                <span className="text-cyber-pink text-xs tracking-widest uppercase mb-2 block">Identity Query</span>
                <h2 className="text-4xl md:text-5xl font-black uppercase text-white">Aditya Vinod Rasal</h2>
              </div>
              
              <div className="reveal-up glass-panel p-8 text-muted leading-relaxed relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-purple/10 blur-[50px]"></div>
                <p className="mb-4 text-white">
                  Passionate Computer Science student blending logic with creativity, building digital experiences while exploring the depth of technology and imagination. 
                </p>
                <p>
                  I am a learner who believes in consistent growth and meaningful creation. The aesthetic is heavily inspired by <strong>Cyber-Shinobi Noir</strong> — a battlefield between emotion and logic, held together with deliberate precision.
                </p>
              </div>

              <div className="reveal-up grid grid-cols-2 gap-4">
                <div className="glass-panel p-6 border-cyber-blue/30">
                  <h3 className="text-cyber-blue text-xs tracking-widest uppercase mb-2 font-bold">Optimization</h3>
                  <p className="text-sm font-light text-white/80">Distraction-free environment. Natural sunlight. Soft music.</p>
                </div>
                <div className="glass-panel p-6 border-cyber-pink/30">
                  <h3 className="text-cyber-pink text-xs tracking-widest uppercase mb-2 font-bold">Fuel Source</h3>
                  <p className="text-sm font-light text-white/80">Espresso, Americano, or Cold Brew. High connectivity.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 reveal-up relative">
              {/* Abstract Holographic representation instead of a plain photo */}
              <TiltCard className="aspect-square glass-panel flex flex-col justify-center items-center relative overflow-hidden group interactive">
                 <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <div className="w-24 h-24 border border-cyber-purple/50 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-[0_0_30px_rgba(138,43,226,0.3)]">
                    <Cpu className="text-cyber-purple" size={32} />
                 </div>
                 <h3 className="font-black tracking-widest uppercase text-xl">Core Logic</h3>
                 <span className="text-xs text-cyber-blue mt-2 tracking-[0.3em]">ONLINE</span>
              </TiltCard>
            </div>
          </div>
        </section>


        {/* =======================================================
            TECH ARSENAL SECTION
            Circuit-like modular layout
        ======================================================== */}
        <section id="stack" className="py-32 px-8 md:px-20 relative">
          <div className="reveal-up text-center mb-16">
            <span className="text-cyber-blue text-xs tracking-widest uppercase mb-2 block">System Capabilities</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white">Tech Arsenal</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {['HTML', 'CSS', 'C', 'C++', 'Java', 'Blender', 'Unreal Engine'].map((tech, i) => (
              <div key={i} className="reveal-up glass-panel px-8 py-4 border-white/5 hover:border-cyber-blue/50 transition-colors interactive group overflow-hidden relative">
                <div className="absolute inset-0 bg-cyber-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 font-bold uppercase tracking-widest text-sm text-white/50 group-hover:text-white transition-colors">{tech}</span>
              </div>
            ))}
          </div>
        </section>


        {/* =======================================================
            PROJECTS / DEPLOYMENTS SECTION
        ======================================================== */}
        <section id="work" className="py-32 px-8 md:px-20">
          <div className="reveal-up flex justify-between items-end mb-16">
            <div>
              <span className="text-cyber-pink text-xs tracking-widest uppercase mb-2 block">Active Instances</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase text-white">Deployments</h2>
            </div>
            <a href="https://github.com/adityarasal006-coder" target="_blank" rel="noreferrer" className="hidden md:flex text-xs font-bold uppercase tracking-widest border-b border-cyber-pink pb-1 hover:text-cyber-pink transition-colors interactive">
              Access Repositories <ExternalLink size={14} className="ml-2 inline" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
             <TiltCard className="reveal-up glass-panel p-10 border border-white/5 hover:border-cyber-purple/50 transition-all interactive group">
                <div className="text-xs text-cyber-blue mb-6 tracking-widest uppercase">01 / Algorithm Module</div>
                <h3 className="text-3xl font-black mb-4 uppercase text-white">Decision Matrix</h3>
                <p className="text-muted text-sm mb-8 max-w-md">Real-time decision-making engine highlighting logic and math-based predictive outputs.</p>
                <div className="flex gap-3">
                   <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] tracking-widest uppercase text-white/70">C++</div>
                   <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] tracking-widest uppercase text-white/70">Terminal</div>
                </div>
             </TiltCard>
             
             <TiltCard className="reveal-up glass-panel p-10 border border-white/5 hover:border-cyber-pink/50 transition-all interactive group">
                <div className="text-xs text-cyber-blue mb-6 tracking-widest uppercase">02 / Cyber Landscape</div>
                <h3 className="text-3xl font-black mb-4 uppercase text-white">Neon Sanctuary</h3>
                <p className="text-muted text-sm mb-8 max-w-md">High-fidelity 3D environment exploring the cinematic collision of lighting and geometry.</p>
                <div className="flex gap-3">
                   <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] tracking-widest uppercase text-white/70">Unreal Engine</div>
                   <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] tracking-widest uppercase text-white/70">Blender</div>
                </div>
             </TiltCard>
          </div>
        </section>


        {/* =======================================================
            HOBBIES / CREATIVE OUTLETS
        ======================================================== */}
        <section className="py-20 px-8 md:px-20">
          <div className="reveal-up glass-panel p-12 border border-cyber-purple/20 text-center relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-cyber-purple to-transparent"></div>
             
             <h2 className="text-3xl font-black mb-2 uppercase text-white">Creative Expansion</h2>
             <p className="text-sm text-muted mb-12 tracking-widest uppercase">Beyond strict logic</p>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center gap-4 group">
                  <div className="p-4 rounded-full bg-white/5 group-hover:bg-cyber-purple/20 transition-colors">
                    <PenTool className="text-white/50 group-hover:text-cyber-purple transition-colors" size={24} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold tracking-[0.2em] uppercase text-white">Poetry</span>
                    <span className="text-[10px] text-muted">Hindi & Marathi</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4 group">
                  <div className="p-4 rounded-full bg-white/5 group-hover:bg-cyber-pink/20 transition-colors">
                    <Music className="text-white/50 group-hover:text-cyber-pink transition-colors" size={24} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold tracking-[0.2em] uppercase text-white">Guitar</span>
                    <span className="text-[10px] text-muted">Acoustic Logic</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4 group">
                  <div className="p-4 rounded-full bg-white/5 group-hover:bg-cyber-blue/20 transition-colors">
                    <BookOpen className="text-white/50 group-hover:text-cyber-blue transition-colors" size={24} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold tracking-[0.2em] uppercase text-white">Reading</span>
                    <span className="text-[10px] text-muted">World Building</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4 group">
                  <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/20 transition-colors">
                    <Code className="text-white/50 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold tracking-[0.2em] uppercase text-white">Art</span>
                    <span className="text-[10px] text-muted">Visual Expression</span>
                  </div>
                </div>
             </div>
          </div>
        </section>


        {/* =======================================================
            CONTACT / UPLINK SECTION
        ======================================================== */}
        <section id="connect" className="py-32 px-8 md:px-20 text-center relative">
          <div className="reveal-up max-w-3xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 mb-8">
              Initiate Uplink
            </h2>
            <p className="text-muted text-lg mb-12">
              Secure channels are open for opportunities and creative collaborations.
            </p>
            
            <div className="flex justify-center mb-16">
               <a href="mailto:adityarasal006@gmail.com" className="btn-neon interactive">
                  adityarasal006@gmail.com
               </a>
            </div>

            <div className="flex justify-center gap-12 border-t border-white/10 pt-12">
               <a href="https://github.com/adityarasal006-coder" target="_blank" rel="noreferrer" className="flex items-center gap-3 interactive group">
                  <Github className="text-muted group-hover:text-white transition-colors" size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted group-hover:text-white transition-colors">GitHub</span>
               </a>
               <a href="https://www.linkedin.com/in/aditya-rasal-942b5535a/" target="_blank" rel="noreferrer" className="flex items-center gap-3 interactive group">
                  <Linkedin className="text-muted group-hover:text-cyber-blue transition-colors" size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted group-hover:text-cyber-blue transition-colors">LinkedIn</span>
               </a>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
             <p className="text-[10px] tracking-[0.5em] text-white/20 uppercase">
              © 2026 ADITYA RASAL — CYBER-SHINOBI
            </p>
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;
