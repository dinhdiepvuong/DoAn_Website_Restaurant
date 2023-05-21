import { serialize } from "../utils";
import fetchApi from "./fetchApi";

const version = {
  v1: "/api/v1",
};

const pathname = `${version.v1}/product-types`;

export const ProductTypeApi = {
  find: async (params: any) => {
    const query = serialize(params);
    const url = `${pathname}/list` + query;
    try {
      const response = await fetchApi.get(url);

      return response;
    } catch (error) {
      throw error;
    }
  },

  create: async (body: any) => {
    try {
      const response = await fetchApi.post(`${pathname}/create`, body);

      return response;
    } catch (error) {
      throw error;
    }
  },

  findOne: async (id: any) => {
    try {
      const response = await fetchApi.get(`${pathname}/detail/${id}`);

      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async (body: any) => {
    try {
      const response = await fetchApi.put(`${pathname}/update`, body);

      return response;
    } catch (error) {
      throw error;
    }
  },
};
