export const setToken = (token) => {
  console.log("token");
  return {
    type: "SET_TOKEN",
    payload: token,
  };
};
