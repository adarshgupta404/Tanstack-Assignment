import type { deletePupilResponse, PupilsResponse } from "@/types/response";
import type { PupilSchemaType } from "@/types/validator/pupils";
import axiosInstance from "./axiosInstance";

type GetAllPupilsParams = {
  page?: number;
  limit?: number;
};

const handleApiError = (err: any): PupilsResponse<any> => {
  if (err.response?.data) {
    return err.response.data;
  }
  return {
    success: false,
    error: {
      message: err.message || "Unknown error",
      type: err.type || "CLIENT_ERROR",
    },
  };
};

export const pupilsApi = {
  getAll: async (
    params?: GetAllPupilsParams
  ): Promise<PupilsResponse<PupilSchemaType[]>> => {
    try {
      const { data } = await axiosInstance.get("/pupils", { params });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return data;
    } catch (err: any) {
      return handleApiError(err);
    }
  },

  getById: async (
    id: string | number
  ): Promise<PupilsResponse<PupilSchemaType>> => {
    try {
      const { data } = await axiosInstance.get(`/pupils/${id}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return data;
    } catch (err: any) {
      return handleApiError(err);
    }
  },

  create: async (pupilData: any): Promise<PupilsResponse<PupilSchemaType>> => {
    try {
      const { data } = await axiosInstance.post("/pupils", pupilData);
      return data;
    } catch (err: any) {
      return handleApiError(err);
    }
  },

  update: async (
    id: string,
    pupilData: any
  ): Promise<PupilsResponse<PupilSchemaType>> => {
    try {
      const { data } = await axiosInstance.put(`/pupils/${id}`, pupilData);
      return data;
    } catch (err: any) {
      return handleApiError(err);
    }
  },

  deleteById: async (
    id: string
  ): Promise<PupilsResponse<deletePupilResponse>> => {
    try {
      const { data } = await axiosInstance.delete(`/pupils/${id}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return data;
    } catch (err: any) {
      return handleApiError(err);
    }
  },
};
