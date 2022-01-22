
export const useSetMsg = (prev, mensaje) => { 
  return prev = { ...prev, msg:mensaje };
};
