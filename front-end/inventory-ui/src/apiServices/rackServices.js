import { smartInventoryRequest, computerIPCRequest } from "~/utils/request";

export const getRackEnvStatus = async (rackID) => {
  try {
    const res = await smartInventoryRequest.get(
      `api/racks/${rackID}/env-status`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getRackLatestOperationStatus = async (rackID) => {
  try {
    const res = await smartInventoryRequest.get(
      `api/racks/${rackID}/opr-status/latest`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getDocuments = async () => {
  try {
    const res = await smartInventoryRequest.get(`api/documents/`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBorrowings = async () => {
  try {
    const res = await smartInventoryRequest.get(`api/borrowings/`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postGuideLightOperationToIPC = async (rackID) => {
  try {
    const res = await computerIPCRequest.post(
      `api/racks/${rackID}/operation/guide-light`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postOpenRackOperationToIPC = async (rackID) => {
  try {
    const res = await computerIPCRequest.post(
      `api/racks/${rackID}/operation/open-rack`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postCloseRackOperationToIPC = async (rackID) => {
  try {
    const res = await computerIPCRequest.post(
      `api/racks/${rackID}/operation/close-rack`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postVentilateOperationToIPC = async (rackID) => {
  try {
    const res = await computerIPCRequest.post(
      `api/racks/${rackID}/operation/ventilate`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
