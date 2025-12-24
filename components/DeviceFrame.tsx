
import React from 'react';
import { DeviceConfig } from '../types';
import { Minus, Square, X as CloseIcon, ChevronLeft, ChevronRight, RotateCw, Search } from 'lucide-react';

interface DeviceFrameProps {
  device: DeviceConfig;
  children: React.ReactNode;
}

const DeviceFrame: React.FC<DeviceFrameProps> = ({ device, children }) => {
  if (device.brand === 'browser') {
    return (
      <div 
        className="relative bg-neutral-900 shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border border-neutral-800"
        style={{
          width: device.width,
          height: device.height,
          borderRadius: 8,
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8)'
        }}
      >
        {/* Browser Top Bar */}
        <div className="bg-neutral-800 p-2 flex items-center justify-between border-b border-neutral-700 select-none">
          <div className="flex gap-2 ml-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 mx-12 h-7 bg-black/50 rounded-md border border-neutral-700 flex items-center px-3 gap-2">
            <Search size={12} className="text-neutral-500" />
            <span className="text-[10px] text-neutral-400">https://www.social-platform.com/preview</span>
          </div>
          <div className="flex gap-4 mr-2 text-neutral-500">
             <Minus size={14} />
             <Square size={12} />
             <CloseIcon size={14} />
          </div>
        </div>
        {/* Browser Tools */}
        <div className="bg-neutral-800/50 px-4 py-1.5 flex items-center gap-4 border-b border-neutral-700">
           <ChevronLeft size={16} className="text-neutral-400" />
           <ChevronRight size={16} className="text-neutral-600" />
           <RotateCw size={14} className="text-neutral-400" />
           <div className="h-6 w-[1px] bg-neutral-700 mx-2" />
           <div className="w-48 h-5 bg-neutral-700/50 rounded" />
        </div>
        <div className="flex-1 relative bg-black">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative bg-neutral-900 shadow-2xl transition-all duration-500 overflow-hidden"
      style={{
        width: device.width,
        height: device.height,
        borderRadius: device.cornerRadius + device.bezelSize,
        padding: device.bezelSize,
        border: '4px solid #333',
        boxShadow: '0 0 0 2px #1a1a1a, 0 40px 100px -20px rgba(0,0,0,0.8)'
      }}
    >
      <div 
        className="relative w-full h-full overflow-hidden bg-black"
        style={{
          borderRadius: device.cornerRadius,
        }}
      >
        {device.notchType === 'dynamic_island' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-full z-50 flex items-center justify-around px-2">
            <div className="w-4 h-4 rounded-full bg-neutral-900 border border-neutral-800" />
          </div>
        )}
        {device.notchType === 'notch' && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-black rounded-b-3xl z-50" />
        )}
        {device.notchType === 'punch_hole' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 border border-neutral-800" />
        )}

        {children}
      </div>

      <div className="absolute top-24 -left-1 w-1 h-12 bg-neutral-700 rounded-r-sm" />
      <div className="absolute top-40 -left-1 w-1 h-12 bg-neutral-700 rounded-r-sm" />
      <div className="absolute top-24 -right-1 w-1 h-16 bg-neutral-700 rounded-l-sm" />
    </div>
  );
};

export default DeviceFrame;
