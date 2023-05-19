import fetchApi from "./fetchApi";

const version = {
  v1: "/api/v1",
};

const pathname = `${version.v1}/analytics`;

export const AnalyticsApi = {
  getDashboard: async () => {
    try {
      const response = await fetchApi.get(`${pathname}/dashboard`);

      return response;
    } catch (error) {
      throw error;
    }
  },

  getRevenueByTime: async (body: any) => {
    try {
      const response = await fetchApi.post(
        `${pathname}/dashboard/revenue`,
        body
      );

      return response;
    } catch (error) {
      throw error;
    }
  },

  getCustomerByBook: async (body: any) => {
    try {
      const response = await fetchApi.post(
        `${pathname}/dashboard/customer-book`,
        body
      );

      return response;
    } catch (error) {
      throw error;
    }
  },

  getCustomerByTime: async (body: any) => {
    try {
      const response = await fetchApi.post(
        `${pathname}/dashboard/customer`,
        body
      );

      return response;
    } catch (error) {
      throw error;
    }
  },
};
