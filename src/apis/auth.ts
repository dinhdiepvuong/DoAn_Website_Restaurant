import fetchApi from "./fetchApi";

const version = {
  v1: "/api/v1",
};
const pathname = `${version.v1}/auth`;
const pathnameAdmin = `${version.v1}/admins`;

export const AuthApi = {
  loginAdmin: async (body: any) => {
    try {
      const response = await fetchApi.post(`${pathname}/login-admin`, body);

      return response;
    } catch (error) {
      throw error;
    }
  },

  findOneAdmin: async (id: any) => {
    try {
      const response = await fetchApi.get(`${pathnameAdmin}/detail/${id}`);

      return response;
    } catch (error) {
      throw error;
    }
  },
};
