import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Rocket, Shield, ArrowUpRight, RotateCw, Sparkles, Github, Linkedin, Globe } from 'lucide-react';
import QRCode from 'react-qr-code';

const PROFILE = {
  name: "Akshit Srivastava",
  role: "AI Engineering & Research",
  experience: "Former Intern at RRSC North, ISRO",
  website: "akshitsrivastava.vercel.app",
  github: "akshitsrivastava04",
  linkedin: "akshitsrivastava"
};

const App: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDrawn, setIsDrawn] = useState(false);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle mobile detection and cleanup
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setTimeout(() => setIsDrawn(true), 500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleMove = (clientX: number, clientY: number) => {
    if (isFlipped || !cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setTouchPos({ x, y });
  };

  const resetRotation = () => setTouchPos({ x: 0, y: 0 });

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-white bg-dot-grid overflow-hidden touch-none">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[5%] left-[10%] w-64 md:w-96 h-64 md:h-96 bg-blue-50 rounded-full blur-[80px] md:blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[10%] right-[5%] w-64 md:w-96 h-64 md:h-96 bg-indigo-50 rounded-full blur-[100px] md:blur-[120px] opacity-60"></div>
      </div>

      <div className="relative w-full max-w-md px-6 flex flex-col items-center justify-center perspective-[1000px]">
        
        {/* Wallet Effect */}
        <div 
          className={`absolute -bottom-20 w-[120%] h-64 leather-texture rounded-t-[3rem] border-t border-white/10 z-10 transition-transform duration-1000 ease-out pointer-events-none ${isDrawn ? 'translate-y-24' : 'translate-y-0'}`}
        >
          <div className="w-full h-full flex flex-col items-center pt-8">
            <div className="w-16 h-1 bg-white/10 rounded-full mb-4"></div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">
              <Shield size={12} /> Vault
            </div>
          </div>
        </div>

        {/* 3D Card Container */}
        <div 
          ref={cardContainerRef}
          className={`relative z-20 w-full aspect-[1.586/1] transition-all duration-1000 cursor-pointer 
            ${isDrawn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} 
            scale-90 sm:scale-100`}
          onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
          onMouseLeave={resetRotation}
          onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={resetRotation}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div 
            className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] preserve-3d"
            style={{
              transform: `
                rotateY(${isFlipped ? 180 : touchPos.x * 25}deg)
                rotateX(${isFlipped ? 0 : -touchPos.y * 25}deg)
              `
            }}
          >
            {/* FRONT FACE */}
            <div className="absolute inset-0 w-full h-full obsidian-card rounded-[1.5rem] md:rounded-[1.75rem] p-6 md:p-10 flex flex-col justify-between border border-white/10 backface-hidden overflow-hidden shadow-2xl">
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30"
                style={{
                  background: `radial-gradient(circle at ${50 + touchPos.x * 100}% ${50 + touchPos.y * 100}%, rgba(96,165,250,0.4) 0%, transparent 60%)`
                }}
              />

              <div className="flex justify-between items-start z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-2 md:mb-4">
                    <div className="p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <Cpu className="text-blue-400" size={16} />
                    </div>
                    <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-black text-blue-400/90">buildwithakshit</span>
                  </div>
                  <h1 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tighter leading-none">
                    {PROFILE.name}
                  </h1>
                  <p className="text-slate-400 text-xs md:text-base font-medium opacity-80">
                    {PROFILE.role}
                  </p>
                </div>

                <div className="bg-white p-2 rounded-xl md:rounded-2xl shadow-xl shrink-0">
                  <QRCode 
                    value={`https://${PROFILE.website}`}
                    size={isMobile ? 48 : 64}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>

              <div className="flex justify-between items-end z-10">
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center gap-2 text-slate-300 text-[10px] md:text-xs font-semibold">
                    <Rocket size={14} className="text-blue-500" />
                    <span className="truncate max-w-[150px] md:max-w-none">{PROFILE.experience}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[8px] md:text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                    <span className="flex items-center gap-1">
                      <Shield size={10} className="text-emerald-500/70" /> Verified
                    </span>
                    <span>EST. 2026</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-1 md:gap-2 opacity-60">
                  <RotateCw size={16} className="text-white animate-spin-slow" />
                  <span className="text-[7px] uppercase tracking-widest text-white/50 font-black">Flip</span>
                </div>
              </div>
            </div>

            {/* BACK FACE */}
            <div 
              className="absolute inset-0 w-full h-full obsidian-card rounded-[1.5rem] md:rounded-[1.75rem] p-6 md:p-10 flex flex-col border border-white/10 backface-hidden"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 text-blue-400">
                  <Sparkles size={16} />
                  <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-black">Developer Profile</span>
                </div>
                
                <p className="text-white font-medium text-sm md:text-xl leading-relaxed">
                  AI Engineer focused on applied research at the intersection of
                  Machine Learning, Computer Vision, and Space Systems.
                </p>

                <div className="flex flex-wrap justify-center gap-1.5">
                  {["PyTorch", "OpenCV", "SpaceTech", "LLMs"].map((kw) => (
                    <span key={kw} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[8px] text-blue-300 uppercase font-bold">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-6 py-4 border-t border-white/5">
                <a href={`https://github.com/${PROFILE.github}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><Github size={18}/></a>
                <a href={`https://linkedin.com/in/${PROFILE.linkedin}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><Linkedin size={18}/></a>
                <a href={`https://${PROFILE.website}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><Globe size={18}/></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className={`mt-12 transition-all duration-1000 delay-700 flex flex-col items-center gap-4 ${isDrawn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <button 
          onClick={() => window.open(`https://${PROFILE.website}`, '_blank')}
          className="flex items-center gap-3 px-6 py-3 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-xl border border-white/10 active:scale-95 transition-all"
        >
          Explore Portfolio <ArrowUpRight size={16} />
        </button>
        <p className="text-[8px] uppercase tracking-[0.3em] font-black text-slate-400 text-center px-4">
          Built for Akshit • {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default App;
