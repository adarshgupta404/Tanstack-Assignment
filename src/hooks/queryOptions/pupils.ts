// src/queryOptions/pupils.ts
import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";

import { pupilsApi } from "@/api/pupilsApi";
import type { PupilSchemaType } from "@/types/validator/pupils";
import type { PupilsResponse } from "@/types/response";

export const userKeys = {
  all: ["pupils"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: any) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export function createPupilQueryOptions(
  options?: Omit<
    UseQueryOptions<PupilsResponse<PupilSchemaType[]>>,
    "queryKey" | "queryFn"
  >,
  params?: { page?: number; limit?: number }
) {
  return queryOptions({
    ...options,
    queryKey: userKeys.all,
    queryFn: () => pupilsApi.getAll(params),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 1,
  });
}

export function createPupilDetailQueryOptions(
  id: string,
  options?: Omit<
    UseQueryOptions<PupilsResponse<PupilSchemaType>>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: userKeys.detail(id),
    queryFn: () => pupilsApi.getById(id),
    enabled: !!id,
    refetchInterval: 1000 * 60 * 1,
    staleTime: 1000 * 60 * 1,
  });
}
