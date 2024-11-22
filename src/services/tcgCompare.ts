import { fetchFromApi } from "./apiService";
import { Category } from "../types/tcgCompare";
import {
  TCG_COMPARE_HEADERS,
  TCG_COMPARE_API_ROOT,
} from "../constants/tcgCompare";

export const fetchTcgCompareCategories = async (
  token: string
): Promise<Category[]> => {
  const url = `${TCG_COMPARE_API_ROOT}/pokemon-tcg/categories`;
  const method = "GET";
  return fetchFromApi<Category[]>(url, method, {
    ...TCG_COMPARE_HEADERS,
    "x-xsrf-token": token,
  });
};
