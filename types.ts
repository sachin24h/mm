
export type PlatformType = 'instagram' | 'tiktok' | 'youtube_shorts' | 'linkedin' | 'x' | 'facebook';
export type ContextType = 'reels_tab' | 'feed' | 'stories' | 'media_player';
export type DeviceBrand = 'apple' | 'android' | 'browser';
export type ScaleMode = 'fit' | 'fill' | 'safe_frame';

export interface DeviceConfig {
  id: string;
  name: string;
  brand: DeviceBrand;
  width: number;
  height: number;
  cornerRadius: number;
  bezelSize: number;
  notchType: 'dynamic_island' | 'notch' | 'punch_hole' | 'none';
  aspectRatio: string;
}

export interface MarginData {
  top: number;
  bottom: number;
  left: number;
  right: number;
  description?: string;
}

export interface PlatformMargins {
  [key: string]: {
    [context in string]?: MarginData;
  };
}
