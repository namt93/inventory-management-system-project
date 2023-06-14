import axios from "axios";

const smartInventoryRequest = axios.create({
  baseURL: "http://localhost:8000/",
});

export const get = async (path, options) => {
  const response = await smartInventoryRequest.get(path, options);
  return response;
};

export default smartInventoryRequest;
