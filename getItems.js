
//fetching JSON data 
export const getItems = async () => {
  const res = await fetch("http://localhost:8088/items");
  const data = await res.json();
  return data;
};
