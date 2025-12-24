
import React, { useState, useRef, useEffect } from 'react';
import { DEVICES, INITIAL_MARGINS } from '../constants';
import { DeviceConfig, PlatformType, ContextType, PlatformMargins, DeviceBrand, ScaleMode } from '../types';
import DeviceFrame from './DeviceFrame';
import SocialUIOverlay from './SocialUIOverlay';
import { checkPlatformUpdates } from '../services/geminiService';
import { 
  Upload, Shield, RefreshCw, AlertCircle, Apple, Smartphone as AndroidIcon, 
  Maximize, Box, Activity, Play, Pause, FastForward, Rewind 
} from 'lucide-react';

const Editor: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<DeviceBrand>('apple');
  const [selectedDevice, setSelectedDevice] = useState<DeviceConfig>(DEVICES.find(d => d.brand === 'apple') || DEVICES[0]);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('instagram');
  const [selectedContext, setSelectedContext] = useState<ContextType>('reels_tab');
  const [viewMode, setViewMode] = useState<'margins' | 'ui'>('ui');
  const [scaleMode, setScaleMode] = useState<ScaleMode>('safe_frame');
  
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [margins, setMargins] = useState<PlatformMargins>(INITIAL_MARGINS);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateNotice, setUpdateNotice] = useState<{show: boolean, data?: any}>({ show: false });

  // Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const filteredDevices = DEVICES.filter(d => d.brand === selectedBrand);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
      setMediaType(file.type.startsWith('video') ? 'video' : 'image');
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const currentMargin = margins[selectedPlatform]?.[selectedContext] || { top: 0, bottom: 0, left: 0, right: 0 };

  const triggerUpdateCheck = async () => {
    setIsUpdating(true);
    const result = await checkPlatformUpdates(selectedPlatform, selectedContext);
    setIsUpdating(false);
    if (result) setUpdateNotice({ show: true, data: result });
  };

  const applyUpdate = () => {
    if (updateNotice.data) {
      const newMargins = { ...margins };
      if (!newMargins[selectedPlatform]) newMargins[selectedPlatform] = {};
      newMargins[selectedPlatform]![selectedContext] = {
        top: updateNotice.data.top,
        bottom: updateNotice.data.bottom,
        left: updateNotice.data.left,
        right: updateNotice.data.right,
        description: updateNotice.data.reason
      };
      setMargins(newMargins);
      setUpdateNotice({ show: false });
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#030303] text-white">
      <aside className="w-full lg:w-96 p-6 border-r border-neutral-800 space-y-8 overflow-y-auto max-h-screen shadow-2xl z-50">
        <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black shadow-[0_0_15px_rgba(37,99,235,0.4)] text-white">M</div>
           <h1 className="font-bold text-lg tracking-tight">Studio <span className="text-blue-500">AI</span></h1>
        </div>

        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
             1. Content Library
          </h2>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-3 p-5 bg-white/5 border border-dashed border-neutral-700 rounded-2xl hover:bg-white/10 hover:border-blue-500/50 transition-all group"
          >
            <Upload className="w-5 h-5 text-neutral-400 group-hover:text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">Upload Creative Asset</span>
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,video/*" />
        </div>

        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-4">2. Testing Hardware</h2>
          <div className="flex gap-2 mb-3 bg-neutral-900 p-1.5 rounded-2xl">
            <button 
              onClick={() => { setSelectedBrand('apple'); setSelectedDevice(DEVICES.find(d => d.brand === 'apple')!); }}
              className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase transition-all ${selectedBrand === 'apple' ? 'bg-neutral-800 text-white shadow-xl' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              <Apple size={14} /> iOS
            </button>
            <button 
              onClick={() => { setSelectedBrand('android'); setSelectedDevice(DEVICES.find(d => d.brand === 'android')!); }}
              className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase transition-all ${selectedBrand === 'android' ? 'bg-neutral-800 text-white shadow-xl' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              <AndroidIcon size={14} /> Android
            </button>
          </div>
          <select 
            value={selectedDevice.id}
            onChange={(e) => setSelectedDevice(DEVICES.find(d => d.id === e.target.value)!)}
            className="w-full p-4 bg-neutral-800 border border-neutral-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            {filteredDevices.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-4">3. Scaling Engine</h2>
          <div className="flex bg-neutral-900 p-1.5 rounded-2xl">
             <button onClick={() => setScaleMode('fill')} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-1.5 transition-all ${scaleMode === 'fill' ? 'bg-red-900/30 text-red-400 border border-red-500/30' : 'text-neutral-500'}`}>
                <Maximize size={14} /> Full Zoom
             </button>
             <button onClick={() => setScaleMode('safe_frame')} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-1.5 transition-all ${scaleMode === 'safe_frame' ? 'bg-blue-600 text-white shadow-xl' : 'text-neutral-500'}`}>
                <Activity size={14} /> Adaptive
             </button>
          </div>
          <div className="p-3 mt-3 bg-neutral-900/50 border border-neutral-800 rounded-xl">
             <p className="text-[10px] text-neutral-400 leading-relaxed italic">
                <b>Adaptive Mode:</b> Mimics Instagram's slight 5% crop to ensure the content feels immersive while keeping logos away from the "Danger Zone".
             </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-neutral-500">Visualization</h2>
          <div className="flex bg-neutral-900 p-1.5 rounded-2xl">
            <button onClick={() => setViewMode('ui')} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${viewMode === 'ui' ? 'bg-neutral-800 text-white shadow-lg' : 'text-neutral-500'}`}>
               Actual UI
            </button>
            <button onClick={() => setViewMode('margins')} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${viewMode === 'margins' ? 'bg-neutral-800 text-white shadow-lg' : 'text-neutral-500'}`}>
               Heat Zones
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-800 space-y-4">
          <button onClick={triggerUpdateCheck} disabled={isUpdating} className={`w-full flex items-center justify-center gap-2 p-4 rounded-2xl text-xs font-black uppercase transition-all shadow-xl ${isUpdating ? 'bg-neutral-800' : 'bg-white text-black hover:bg-neutral-100'}`}>
            {isUpdating ? <RefreshCw className="animate-spin w-4 h-4" /> : <Shield size={16} />}
            Scan Platform Shifts
          </button>
        </div>

        {updateNotice.show && (
          <div className="p-4 bg-blue-900/20 border border-blue-500/50 rounded-2xl animate-in fade-in zoom-in duration-300">
            <h4 className="text-[10px] font-black text-blue-400 uppercase mb-2 flex items-center gap-2"><AlertCircle size={14} /> Dimension Alert</h4>
            <p className="text-[10px] text-blue-100/70 mb-4 leading-relaxed font-medium">{updateNotice.data.reason}</p>
            <div className="flex gap-2">
              <button onClick={applyUpdate} className="flex-1 bg-blue-600 hover:bg-blue-500 py-2.5 rounded-xl text-[10px] font-black uppercase">Apply Patch</button>
              <button onClick={() => setUpdateNotice({ show: false })} className="flex-1 bg-neutral-800 py-2.5 rounded-xl text-[10px] font-black uppercase">Ignore</button>
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1 bg-black p-4 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Cinematic Ambient Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/5 blur-[140px] pointer-events-none" />
        
        <div className="relative group flex flex-col items-center">
          <DeviceFrame device={selectedDevice}>
            {mediaUrl ? (
              <div className="relative w-full h-full bg-black overflow-hidden flex flex-col items-center justify-center">
                {/* Refined Scaling Logic for "Slight Crop" */}
                <div 
                  className="w-full h-full transition-all duration-700 flex items-center justify-center relative overflow-hidden"
                  style={{
                    paddingTop: scaleMode === 'safe_frame' ? `${currentMargin.top * 0.7}%` : '0',
                    paddingBottom: scaleMode === 'safe_frame' ? `${currentMargin.bottom * 0.7}%` : '0',
                  }}
                >
                  <div className={`w-full h-full flex items-center justify-center transition-transform duration-700 ${scaleMode === 'safe_frame' ? 'scale-[1.06]' : 'scale-100'}`}>
                    {mediaType === 'image' ? (
                      <img src={mediaUrl} className={`w-full h-full ${scaleMode === 'fill' ? 'object-cover scale-110' : 'object-contain'}`} />
                    ) : (
                      <video 
                        ref={videoRef}
                        src={mediaUrl} 
                        className={`w-full h-full ${scaleMode === 'fill' ? 'object-cover scale-110' : 'object-contain'}`} 
                        loop muted playsInline 
                        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                      />
                    )}
                  </div>
                </div>
                
                {/* Interactive Overlays */}
                {viewMode === 'ui' ? (
                  <SocialUIOverlay 
                    platform={selectedPlatform} 
                    context={selectedContext} 
                    isBrowser={selectedDevice.brand === 'browser'} 
                  />
                ) : (
                  <div className="absolute inset-0 z-40 pointer-events-none font-black text-[10px]">
                    <div className="absolute top-0 left-0 right-0 bg-red-600/30 border-b border-red-500/50 flex items-center justify-center uppercase" style={{ height: `${currentMargin.top}%` }}>Status & Header</div>
                    <div className="absolute bottom-0 left-0 right-0 bg-red-600/30 border-t border-red-500/50 flex items-center justify-center uppercase" style={{ height: `${currentMargin.bottom}%` }}>Tab Bar</div>
                    <div className="absolute right-0 top-0 bottom-0 bg-red-600/30 border-l border-red-500/50 flex items-center justify-center uppercase" style={{ width: `${currentMargin.right}%` }}>
                       <span className="rotate-90 whitespace-nowrap">Right Action Bar</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-12 text-center space-y-8">
                <div className="w-24 h-24 bg-neutral-800 rounded-[36px] flex items-center justify-center shadow-inner">
                    <Upload className="w-10 h-10 text-neutral-600 animate-bounce" />
                </div>
                <div className="space-y-3">
                    <h3 className="text-xl font-black tracking-tight text-white/90">Awaiting Visual Input</h3>
                    <p className="text-xs text-neutral-500 font-medium max-w-[240px] mx-auto leading-relaxed">
                      Upload your 9:16 reels or images to begin high-fidelity hardware proofing.
                    </p>
                </div>
                <button onClick={() => fileInputRef.current?.click()} className="px-10 py-4 bg-white text-black text-xs font-black uppercase rounded-2xl shadow-2xl hover:bg-blue-600 hover:text-white transition-all transform active:scale-95">
                  Initialize Studio
                </button>
              </div>
            )}
          </DeviceFrame>

          {/* Video Playback & Scrubbing UI */}
          {mediaUrl && mediaType === 'video' && (
            <div className="mt-8 w-full max-w-md bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 p-4 rounded-3xl shadow-2xl flex items-center gap-4">
              <button 
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="translate-x-0.5" />}
              </button>
              
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                  <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
                  <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.01"
                  value={currentTime}
                  onChange={handleScrub}
                  className="w-full h-1.5 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Floating Intelligent Telemetry */}
        <div className="absolute bottom-10 right-10 bg-neutral-900/80 backdrop-blur-3xl border border-neutral-800/50 p-6 rounded-[40px] hidden xl:block w-80 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Master Studio v4.5</span>
             </div>
             <div className="px-2 py-0.5 bg-neutral-800 rounded text-[8px] font-black text-neutral-400 uppercase">Production</div>
          </div>
          <div className="space-y-4 text-[11px]">
            <div className="flex justify-between items-center border-b border-neutral-800/50 pb-3"><span className="text-neutral-500 font-bold">Hardware Target</span><span className="text-white font-black">{selectedDevice.name}</span></div>
            <div className="flex justify-between items-center border-b border-neutral-800/50 pb-3"><span className="text-neutral-500 font-bold">Scaling Logic</span><span className="text-blue-400 font-black uppercase">{scaleMode.replace('_', ' ')}</span></div>
            
            <div className="space-y-3 pt-2">
               <div className="flex justify-between">
                  <span className="text-neutral-500 font-bold italic">Safety Score</span>
                  <span className={`font-black uppercase text-[9px] ${scaleMode === 'fill' ? 'text-red-500' : 'text-green-500'}`}>
                    {scaleMode === 'fill' ? 'Unsafe' : 'Protected'}
                  </span>
               </div>
               <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden p-[2px]">
                  <div className={`h-full rounded-full transition-all duration-1000 ${scaleMode === 'fill' ? 'w-full bg-red-600' : 'w-[8%] bg-green-500'}`} />
               </div>
            </div>
          </div>
          <p className="mt-8 text-[9px] text-neutral-500 leading-relaxed italic font-medium">
            * Use the video scrubber to verify frame-specific clipping across interaction nodes.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Editor;
