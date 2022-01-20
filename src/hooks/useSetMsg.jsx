
export const useSetMsg = (prev, mensaje) => {
  console.log(prev, mensaje);
  return prev = { ...prev, msg:mensaje };
};
