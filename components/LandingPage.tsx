
import React from 'react';
import { ShieldCheck, Crop, Smartphone, Globe, ArrowRight, Zap, Target } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="bg-[#030303] text-white selection:bg-blue-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black">M</div>
            <span className="font-bold text-xl tracking-tighter">MarginMaster <span className="text-blue-500">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#problem" className="hover:text-white transition-colors">The Problem</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#devices" className="hover:text-white transition-colors">Supported Devices</a>
          </div>
          <button 
            onClick={onStart}
            className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm hover:bg-blue-500 hover:text-white transition-all"
          >
            Launch Tool
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest animate-pulse">
            <Zap size={14} /> Intelligence for Content Creators
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] max-w-5xl mx-auto">
            Stop Letting Platforms <span className="text-neutral-600">Butcher</span> Your Content.
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Automatic safe-zone detection for Instagram, TikTok, and YouTube. Preview your videos on iPhone 16 Pro and the latest Android hardware before you post.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl text-lg flex items-center justify-center gap-3 transition-all group"
            >
              Enter Creator Studio <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-2xl text-lg transition-all border border-neutral-800">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="max-w-5xl mx-auto mt-20 relative p-4 bg-neutral-900/50 border border-neutral-800 rounded-[40px] shadow-2xl overflow-hidden">
           <img 
            src="https://picsum.photos/1200/800" 
            className="w-full h-auto rounded-[32px] opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000" 
            alt="Preview mockup"
           />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-blue-600/20 blur-[100px] rounded-full" />
              <ShieldCheck className="w-20 h-20 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
           </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-32 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">The "Logo Clipping" Nightmare.</h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              You've spent hours on that motion graphics logo. You post to Instagram. On your Android, it looks fine. But on an iPhone 16 Pro Max, <span className="text-white font-bold">the logo is sliced in half</span> because of the 19.5:9 aspect ratio crop.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                { icon: <Target className="text-red-500" />, text: "UI Overlay overlaps: The Like/Share buttons cover your text." },
                { icon: <Smartphone className="text-red-500" />, text: "Dynamic Island blocking: Top-tier graphics hidden by hardware." },
                { icon: <Crop className="text-red-500" />, text: "Variable Cropping: Different apps zoom differently on different screens." }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-neutral-300">
                  <div className="p-2 bg-neutral-900 rounded-lg">{item.icon}</div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-[9/16] w-64 mx-auto bg-neutral-900 rounded-3xl border-4 border-red-500/50 relative overflow-hidden shadow-2xl">
               <div className="absolute top-10 left-0 right-0 h-20 bg-red-600/40 flex items-center justify-center font-black text-xs uppercase tracking-tighter">Clipped Zone</div>
               <div className="absolute bottom-20 left-0 right-0 h-40 bg-red-600/40 flex items-center justify-center font-black text-xs uppercase tracking-tighter">Interaction Dead Zone</div>
               <div className="p-8 text-center text-neutral-500 font-mono text-xs pt-40">
                  [YOUR CONTENT HERE]
               </div>
            </div>
            {/* Visual pointers */}
            <div className="absolute top-1/2 -right-10 bg-white text-black p-3 rounded-xl font-bold text-xs shadow-xl rotate-12">"Where did my logo go?"</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black">A Suite for Perfectionists.</h2>
            <p className="text-neutral-500">Every device. Every platform. Zero guesswork.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Dynamic Device Frames", desc: "Realistic iPhone 16/17 Pro and Android flagship frames with accurate bezels.", icon: <Smartphone /> },
              { title: "AI-Powered Updates", desc: "Our AI tracks platform design changes weekly and prompts you to update margins.", icon: <Zap /> },
              { title: "Multi-Context Preview", desc: "Check your Reels as they appear in the dedicated tab, the main feed, or stories.", icon: <Globe /> }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-neutral-900/50 border border-neutral-800 rounded-3xl hover:border-blue-500/50 transition-colors group">
                <div className="w-12 h-12 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center font-black text-xl">M</div>
            <span className="font-bold text-2xl tracking-tighter italic">MarginMaster AI</span>
          </div>
          <p className="text-neutral-600 text-sm">© 2024 MarginMaster AI. All hardware dimensions verified for production.</p>
          <button 
            onClick={onStart}
            className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition-all"
          >
            Start Editing
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
