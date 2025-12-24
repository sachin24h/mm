
import { DeviceConfig, PlatformMargins } from './types';

export const DEVICES: DeviceConfig[] = [
  // APPLE
  {
    id: 'iphone-16-pm',
    name: 'iPhone 16 Pro Max',
    brand: 'apple',
    width: 440,
    height: 952,
    cornerRadius: 55,
    bezelSize: 12,
    notchType: 'dynamic_island',
    aspectRatio: '19.5:9'
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15 / 14 Pro',
    brand: 'apple',
    width: 393,
    height: 852,
    cornerRadius: 48,
    bezelSize: 12,
    notchType: 'dynamic_island',
    aspectRatio: '19.5:9'
  },
  // ANDROID
  {
    id: 's24-ultra',
    name: 'Samsung S24 Ultra',
    brand: 'android',
    width: 384,
    height: 854,
    cornerRadius: 4,
    bezelSize: 10,
    notchType: 'punch_hole',
    aspectRatio: '20:9'
  },
  {
    id: 'pixel-9-pro',
    name: 'Google Pixel 9 Pro',
    brand: 'android',
    width: 412,
    height: 915,
    cornerRadius: 36,
    bezelSize: 10,
    notchType: 'punch_hole',
    aspectRatio: '20:9'
  },
  {
    id: 'oneplus-12',
    name: 'OnePlus 12',
    brand: 'android',
    width: 412,
    height: 920,
    cornerRadius: 40,
    bezelSize: 10,
    notchType: 'punch_hole',
    aspectRatio: '20.1:9'
  },
  // BROWSERS
  {
    id: 'chrome-desktop',
    name: 'Chrome (Desktop)',
    brand: 'browser',
    width: 1000,
    height: 700,
    cornerRadius: 0,
    bezelSize: 0,
    notchType: 'none',
    aspectRatio: '16:9'
  }
];

export const INITIAL_MARGINS: PlatformMargins = {
  instagram: {
    reels_tab: { 
      top: 12, 
      bottom: 24, 
      left: 0, 
      right: 16, 
      description: "Space between Status Bar and Bottom Navigation Bar." 
    },
    feed: { top: 18, bottom: 22, left: 0, right: 0 },
    stories: { top: 8, bottom: 10, left: 4, right: 4 }
  },
  tiktok: {
    reels_tab: { top: 10, bottom: 32, left: 0, right: 20 }
  },
  linkedin: {
    feed: { top: 14, bottom: 20, left: 0, right: 0 }
  },
  x: {
    feed: { top: 12, bottom: 18, left: 0, right: 0 }
  }
};
