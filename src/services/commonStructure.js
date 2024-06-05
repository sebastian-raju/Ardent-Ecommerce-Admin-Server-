import axios from "axios"


export const  commonStructure = async (method, url, data) => {
  return await axios({
    method,
    url,
    data
  });
} 