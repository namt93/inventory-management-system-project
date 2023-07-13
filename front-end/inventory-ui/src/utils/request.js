import axios from "axios";

const smartInventoryRequest = axios.create({
  baseURL: "http://localhost:8080/",
});

export const get = async (path, options) => {
  const response = await smartInventoryRequest.get(path, options);
  return response;
};

const computerIPCRequest = axios.create({
  baseURL: "http://localhost:8000/",
});

export const post = async (path, options) => {
  const response = await computerIPCRequest.post(path, options);
  return response;
};

export { smartInventoryRequest, computerIPCRequest };
