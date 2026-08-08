// composables/useScrollbarConfig.js

export const useScrollbarConfig = () => {
  return useState('scrollbarConfig', () => ({
    light: null, // مثلا '#0F184B'
    dark: null,  // مثلا '#0F184B'
  }));
};
