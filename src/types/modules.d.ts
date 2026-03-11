// Fallback type declarations for packages whose types may not be resolved
// Only declare modules that don't already have types installed

declare module 'leaflet/dist/images/marker-icon-2x.png' {
  const src: string;
  export default src;
}
declare module 'leaflet/dist/images/marker-icon.png' {
  const src: string;
  export default src;
}
declare module 'leaflet/dist/images/marker-shadow.png' {
  const src: string;
  export default src;
}

declare module 'react-i18next';
declare module 'i18next';
declare module 'i18next-browser-languagedetector';
declare module 'mapbox-gl';
declare module 'qrcode.react';
declare module 'leaflet';
declare module '@capacitor/core';
declare module '@capacitor/push-notifications';
declare module 'jspdf';
declare module 'jspdf-autotable';
declare module 'embla-carousel-autoplay';
declare module '@yudiel/react-qr-scanner';
declare module 'vite-plugin-pwa';
