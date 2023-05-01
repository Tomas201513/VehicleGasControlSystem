export const Token = () => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
    },
  };
};
