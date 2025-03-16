export const delay = async (ms = 50) => {
  return new Promise((res) => setTimeout(res, ms));
};
