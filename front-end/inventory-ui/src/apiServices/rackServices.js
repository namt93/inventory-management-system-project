import * as smartInventoryRequest from "~/utils/request";

export const getRackEnvStatus = async (rackID) => {
  try {
    const res = await smartInventoryRequest.get(`racks/${rackID}/env-status`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
