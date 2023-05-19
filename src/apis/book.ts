import { serialize } from "../utils";
import fetchApi from "./fetchApi";

const version = {
  v1: "/api/v1",
};

const pathname = `${version.v1}/books`;

export const BookApi = {
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

  findFoodsAndTablesByBook: async (id: any) => {
    try {
      const response = await fetchApi.get(
        `${pathname}/find-foods-and-tables-by-book/${id}`
      );

      return response;
    } catch (error) {
      throw error;
    }
  },

  updateFoodInBook: async (body: any) => {
    try {
      const response = await fetchApi.post(
        `${pathname}/update-food-in-book`,
        body
      );

      return response;
    } catch (error) {
      throw error;
    }
  },

  findTablesForBook: async (body: any) => {
    try {
      const response = await fetchApi.post(
        `${pathname}/find-tables-for-book`,
        body
      );

      return response;
    } catch (error) {
      throw error;
    }
  },

  findAllBooksForOrder: async (params: any) => {
    const query = serialize(params);
    const url = `${pathname}/find-all-books-for-order` + query;
    try {
      const response = await fetchApi.get(url);

      return response;
    } catch (error) {
      throw error;
    }
  },
};
