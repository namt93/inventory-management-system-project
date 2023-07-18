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

export const getRackBreakdownStatus = async (rackID) => {
  try {
    const res = await smartInventoryRequest.get(
      `api/racks/${rackID}/brkdown-status`
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

export const getRacks = async () => {
  try {
    const res = await smartInventoryRequest.get(`api/racks/`);
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

export const getSearchRacks = async (query, type = "less") => {
  try {
    const res = await smartInventoryRequest.get(`api/rack/search`, {
      params: { query, type },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchDocuments = async (query, type = "less") => {
  try {
    const res = await smartInventoryRequest.get(`api/document/search`, {
      params: { query, type },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRackByID = async (rackID) => {
  try {
    const res = await smartInventoryRequest.get(`api/racks/${rackID}/`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDocumentByID = async (documentID) => {
  try {
    const res = await smartInventoryRequest.get(`api/documents/${documentID}/`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRackGroupByID = async (rackGroupID) => {
  try {
    const res = await smartInventoryRequest.get(
      `api/rack-groups/${rackGroupID}/`
    );
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
