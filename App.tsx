
import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Rocket, Shield, ArrowUpRight, RotateCw, Wallet, Sparkles, Github, Linkedin, Globe } from 'lucide-react';
import QRCode from 'react-qr-code';

const PROFILE = {
  name: "Akshit Srivastava",
  role: "AI Engineering & Research",
  experience: "Former Intern at RRSC North, ISRO",
  website: "akshitsrivastava.vercel.app",
  email: "akshit0405@gmail.com",
  github: "akshitsrivastava04",
  linkedin: "akshitsrivastava"
};

const isMobile = window.innerWidth < 768;
const ROTATION_INTENSITY = isMobile ? 12 : 30;

const App: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDrawn, setIsDrawn] = useState(false);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsDrawn(true), 500);
    return () => clearTimeout(timer);
  }, []);


  const handleTouchMove = (e: React.TouchEvent) => {
    if (isFlipped || !cardContainerRef.current) return;
    const touch = e.touches[0];
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    setTouchPos({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isFlipped || !cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTouchPos({ x, y });
  };

  const resetRotation = () => setTouchPos({ x: 0, y: 0 });

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-white bg-dot-grid overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[5%] left-[10%] w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-indigo-50 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="relative w-full h-full flex items-center justify-center perspective-[600px] sm:perspective-[1000px] md:perspective-2000">
        
        {/* The Wallet (Recedes as card draws) */}
        <div 
          className={`absolute bottom-[-60px] w-full max-w-[500px] h-72 leather-texture rounded-t-[4rem] border-t border-white/10 z-10 transition-transform duration-1000 ease-out ${isDrawn ? 'animate-wallet-recede' : 'translate-y-0'}`}
        >
          <div className="w-full h-full flex flex-col items-center pt-10">
            <div className="w-24 h-1.5 bg-white/5 rounded-full mb-6"></div>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.5em] text-white/20 font-black">
              <Shield size={14} />
              Vault
            </div>
          </div>
        </div>

        {/* 3D Card */}
        <div 
          ref={cardContainerRef}
          className={`relative z-20 w-full max-w-[360px] aspect-[1.586/1] transition-all duration-1000 cursor-pointer ${isDrawn ? 'animate-card-draw' : 'opacity-0'}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetRotation}
          onTouchMove={handleTouchMove}
          onTouchEnd={resetRotation}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div 
            className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] preserve-3d"
            style={{
              transform: `
                rotateY(${isFlipped ? 180 : touchPos.x * ROTATION_INTENSITY}deg)
                rotateX(${isFlipped ? 0 : -touchPos.y * ROTATION_INTENSITY}deg)

              `
            }}
          >
            {/* FRONT FACE */}
            <div className="absolute inset-0 w-full h-full obsidian-card rounded-[1.75rem] p-8 md:p-10 flex flex-col justify-between border border-white/10 backface-hidden overflow-hidden shadow-2xl">
              {/* Dynamic Lens Flare */}
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-500 opacity-30"
                style={{
                  background: `radial-gradient(circle at ${50 + touchPos.x * 120}% ${50 + touchPos.y * 120}%, rgba(96,165,250,0.4) 0%, transparent 60%)`
                }}
              />

              <div className="flex justify-between items-start z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <Cpu className="text-blue-400" size={18} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-blue-400/90">buildwithakshit</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tighter leading-none mb-1">
                    {PROFILE.name}
                  </h1>
                  <p className="text-slate-400 text-sm md:text-base font-medium opacity-80">
                    {PROFILE.role}
                  </p>
                </div>

                {/* QR Code on Front */}
                <div className="bg-white p-2.5 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-transform md:group-hover:scale-105">
                  <QRCode 
                    value={`https://${PROFILE.website}`}
                    size={window.innerWidth < 640 ? 56 : 70}
                    viewBox={`0 0 256 256`}
                    fgColor="#000000"
                    bgColor="#FFFFFF"
                  />
                  <div className="text-[7px] text-center mt-1 font-black text-slate-900 uppercase tracking-tighter">Scan to Connect</div>
                </div>
              </div>

              <div className="flex justify-between items-end z-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold">
                    <Rocket size={16} className="text-blue-500" />
                    <span>{PROFILE.experience}</span>
                  </div>
                  <div className="flex items-center gap-5 text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                    <span className="flex items-center gap-1.5">
                      <Shield size={12} className="text-emerald-500/70" />
                      Verified
                    </span>
                    <span>EST. 2026</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2 opacity-40 md:hover:opacity-100 transition-opacity">
                  <RotateCw size={20} className="text-white animate-spin-slow" />
                  <span className="text-[8px] uppercase tracking-widest text-white/50 font-black">Flip Bio</span>
                </div>
              </div>
              
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>

            {/* BACK FACE: AI Pitch & Details */}
            <div 
              className="absolute inset-0 w-full h-full obsidian-card rounded-[1.75rem] p-10 flex flex-col border border-white/10 backface-hidden"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
                <div className="flex items-center gap-2 text-blue-400">
                  <Sparkles size={18} />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-black">AI Insights</span>
                </div>
                
               <div className="space-y-4">
                  <p className="text-white font-medium text-lg md:text-xl leading-relaxed">
                    AI Engineer focused on applied research at the intersection of
                    machine learning, computer vision, and space systems.
                  </p>
                
                  <div className="flex flex-wrap justify-center gap-2">
                    {["AI Engineering", "Computer Vision", "Space Tech", "Research"].map((kw) => (
                      <span
                        key={kw}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] text-blue-300 uppercase font-bold tracking-wider"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              <div className="flex justify-center gap-8 py-6 border-t border-white/5">
                <a href={`https://github.com/${PROFILE.github}`} target="_blank" className="text-slate-400 hover:text-white transition-colors"><Github size={20}/></a>
                <a href={`https://linkedin.com/in/${PROFILE.linkedin}`} target="_blank" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20}/></a>
                <a href={`https://${PROFILE.website}`} target="_blank" className="text-slate-400 hover:text-white transition-colors"><Globe size={20}/></a>
              </div>
              
              <div className="text-center pb-2">
                <p className="text-[8px] uppercase tracking-[0.5em] text-slate-600 font-black">
                  buildwithakshit // {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* PWA / Mobile Nav Hint */}
      <div className={`fixed bottom-12 transition-all duration-1000 delay-1000 flex flex-col items-center gap-4 ${isDrawn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <button 
          onClick={() => window.open(`https://${PROFILE.website}`, '_blank')}
          className="flex items-center gap-3 px-6 py-3 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-xl border border-white/10 active:scale-95 transition-all"
        >
          Explore Ecosystem <ArrowUpRight size={16} />
        </button>
        <span className="text-[9px] uppercase tracking-[0.3em] font-black text-slate-400 opacity-60">Add to Home Screen for Offline Card</span>
      </div>
    </div>
  );
};

export default App;
