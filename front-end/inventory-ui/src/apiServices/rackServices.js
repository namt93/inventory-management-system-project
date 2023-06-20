import * as smartInventoryRequest from "~/utils/request";

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
