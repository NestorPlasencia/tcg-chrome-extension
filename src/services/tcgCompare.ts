import { fetchFromApi } from "./apiService";
import { Category, Game, SubCategory, Product, Price } from "../types/tcgCompare";
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

export const fetchTcgCompareGames = async (
  token: string
): Promise<Game[]> => {
  const url = `${TCG_COMPARE_API_ROOT}/games`;
  const method = "GET";
  return fetchFromApi<Game[]>(url, method, {
    ...TCG_COMPARE_HEADERS,
    "x-xsrf-token": token,
  });
};

export const fetchTcgCompareSubCategories = async (
  token: string
): Promise<SubCategory[]> => {
  const url = `${TCG_COMPARE_API_ROOT}/pokemon-tcg/sub-categories`;
  const method = "GET";
  return fetchFromApi<SubCategory[]>(url, method, {
    ...TCG_COMPARE_HEADERS,
    "x-xsrf-token": token,
  });
};

export const fetchTcgCompareDeals = async (
  token: string
): Promise<Product[]> => {
  const url = `${TCG_COMPARE_API_ROOT}/products/deals?country=USA&limit=100`;
  const method = "GET";
  return fetchFromApi<Product[]>(url, method, {
    ...TCG_COMPARE_HEADERS,
    "x-xsrf-token": token,
  });
};

export const fetchPrices = async (
  category: string,
  product: string,
  token: string
): Promise<Price[]> => {
  const url = `${TCG_COMPARE_API_ROOT}/pokemon-tcg/${category}/${product}/prices/USA`;
  const method = "GET";
  return fetchFromApi<Price[]>(url, method, {
    ...TCG_COMPARE_HEADERS,
    "x-xsrf-token": token,
  });
};

export const fetchPriceHistory = async (
  category: string,
  product: string,
  token: string
): Promise<Price[]> => {
  const url = `${TCG_COMPARE_API_ROOT}/pokemon-tcg/${category}/${product}/prices/USA/history`;
  const method = "GET";
  return fetchFromApi<Price[]>(url, method, {
    ...TCG_COMPARE_HEADERS,
    "x-xsrf-token": token,
  });
};
