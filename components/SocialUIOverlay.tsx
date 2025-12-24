
import React from 'react';
import { PlatformType, ContextType } from '../types';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreVertical, 
  ChevronLeft, 
  Camera, 
  Home, 
  Search, 
  PlusSquare, 
  Clapperboard, 
  User,
  ThumbsUp,
  Repeat2
} from 'lucide-react';

interface SocialUIOverlayProps {
  platform: PlatformType;
  context: ContextType;
  isBrowser?: boolean;
}

const SocialUIOverlay: React.FC<SocialUIOverlayProps> = ({ platform, context, isBrowser = false }) => {
  if (platform === 'linkedin') {
    return (
      <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-between">
        <div className="bg-white/95 backdrop-blur-sm p-4 flex items-center justify-between border-b border-neutral-200 shadow-sm">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0a66c2] rounded flex items-center justify-center font-bold text-white text-xl">in</div>
              <div>
                 <p className="text-black font-bold text-sm">LinkedIn User</p>
                 <p className="text-neutral-500 text-[10px]">Product Designer • 2h</p>
              </div>
           </div>
           <MoreVertical size={20} className="text-neutral-600" />
        </div>
        <div className="bg-white p-4 flex justify-around border-t border-neutral-200 text-neutral-600 shadow-xl">
           <div className="flex flex-col items-center gap-1"><ThumbsUp size={18} /><span className="text-[10px] font-bold">Like</span></div>
           <div className="flex flex-col items-center gap-1"><MessageCircle size={18} /><span className="text-[10px] font-bold">Comment</span></div>
           <div className="flex flex-col items-center gap-1"><Repeat2 size={18} /><span className="text-[10px] font-bold">Repost</span></div>
           <div className="flex flex-col items-center gap-1"><Send size={18} /><span className="text-[10px] font-bold">Send</span></div>
        </div>
      </div>
    );
  }

  if (platform === 'x') {
    return (
      <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-between p-4 text-white">
        <div className="flex justify-between items-start drop-shadow-md">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden">
                 <img src="https://picsum.photos/40/40?grayscale" className="w-full h-full object-cover" />
              </div>
              <div>
                 <p className="font-bold text-sm tracking-tight">Studio AI</p>
                 <p className="text-xs text-neutral-400">@marginmaster</p>
              </div>
           </div>
           <MoreVertical size={20} />
        </div>
        <div className="flex flex-col gap-6 items-end mb-8 drop-shadow-xl">
           <div className="flex flex-col items-center gap-1"><MessageCircle size={24} /><span className="text-[10px] font-bold">4.2k</span></div>
           <div className="flex flex-col items-center gap-1"><Repeat2 size={24} /><span className="text-[10px] font-bold">1.8k</span></div>
           <div className="flex flex-col items-center gap-1"><Heart size={24} /><span className="text-[10px] font-bold">12k</span></div>
           <div className="flex flex-col items-center gap-1"><Bookmark size={24} /><span className="text-[10px] font-bold">800</span></div>
        </div>
      </div>
    );
  }

  if (platform === 'instagram') {
    return (
      <div className="absolute inset-0 pointer-events-none text-white select-none flex flex-col">
        {/* Top Header: Matching Instagram's specific Reel Header */}
        <div className="p-4 pt-10 flex justify-between items-center drop-shadow-2xl z-50">
          <ChevronLeft size={36} className="text-white drop-shadow-md" strokeWidth={2.5} />
          <Camera size={28} className="text-white drop-shadow-md" />
        </div>

        <div className="flex-1 flex flex-col justify-end p-4 pb-0">
          <div className="flex justify-between items-end pb-4">
            {/* Caption & User Interaction */}
            <div className="max-w-[75%] space-y-3 drop-shadow-xl pb-6">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-neutral-800 border border-white/30 overflow-hidden">
                  <img src="https://picsum.photos/40/40?sig=1" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-sm tracking-tight">marginmaster_ai</span>
                <button className="px-3 py-1 bg-transparent border border-white/50 rounded-lg text-[10px] font-black uppercase">Follow</button>
              </div>
              <p className="text-sm leading-tight line-clamp-2 font-medium">
                Testing the logo clipping problem. If you see this on Android, the "Shrink-to-Fit" mode is protecting your logo!
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold opacity-90">
                <Clapperboard size={14} />
                <span className="truncate">Original Audio • marginmaster_ai</span>
              </div>
            </div>

            {/* Right Side Interaction Stack: Heart, Comment, Share, Save, More */}
            <div className="flex flex-col items-center gap-6 mb-8 drop-shadow-2xl">
              <div className="flex flex-col items-center gap-1">
                <Heart size={30} fill="none" strokeWidth={2.5} className="text-white" />
                <span className="text-[11px] font-black">124K</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <MessageCircle size={30} strokeWidth={2} className="text-white" />
                <span className="text-[11px] font-black">892</span>
              </div>
              <Send size={28} strokeWidth={2} className="text-white -rotate-12 translate-y-1" />
              <Bookmark size={28} strokeWidth={2} className="text-white" />
              <MoreVertical size={24} strokeWidth={2} className="text-white" />
              
              {/* Rotating Audio Disk / Profile Icon */}
              <div className="w-8 h-8 rounded-lg border-2 border-white/50 overflow-hidden scale-90 ring-1 ring-black">
                <img src="https://picsum.photos/32/32?sig=2" className="w-full h-full object-cover animate-[spin_4s_linear_infinite]" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tab Navigation: Home, Search, Plus, Reels, Profile */}
        <div className="h-20 flex justify-around items-center border-t border-white/10 bg-black/90 backdrop-blur-2xl px-2 pb-4">
            <Home size={26} className="text-white" />
            <Search size={26} className="text-white/50" />
            <PlusSquare size={26} className="text-white/50" />
            <Clapperboard size={26} className="text-white" strokeWidth={3} />
            <div className="w-7 h-7 rounded-full bg-neutral-700 border border-white/20 overflow-hidden">
                <img src="https://picsum.photos/28/28?sig=3" className="w-full h-full object-cover" />
            </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SocialUIOverlay;
