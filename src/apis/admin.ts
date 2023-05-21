import { serialize } from "../utils";
import fetchApi from "./fetchApi";

const version = {
  v1: "/api/v1",
};

const pathname = `${version.v1}/admins`;

export const AdminApi = {
  findOne: async (id: any) => {
    try {
      const response = await fetchApi.get(`${pathname}/detail/${id}`);

      return response;
    } catch (error) {
      throw error;
    }
  },
};
