export const generateKey = () => {
  return new Date().getTime() + Math.random();
}