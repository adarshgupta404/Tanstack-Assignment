export type PupilsResponse<T> =
  | {
      success: true;
      message: string;
      data: T;
      count?: number;
    }
  | ErrorResponse;

export type ErrorResponse = {
  success: false;
  error: {
    message: string;
    type: string;
    details?: {
      field: string;
      message: string;
    }[];
  };
};

export type deletePupilResponse = {
  id: string;
  fullName: string;
  deletedAt: string;
};

