import {
  SearchRequestResponse,
  SearchRequestBody,
  LatestSetsByCategory,
  GetProductsForSkusResponse,
  ProductLine,
  Product,
  CatalogGroup,
} from "../types/types";
import { HEADERS, API_ROOT, CATALOG_API_ROOT } from "../constants/constants";

async function fetchFromApi<T>(
  url: string,
  method: "GET" | "POST",
  body: string = ""
): Promise<T> {
  const response = await fetch(url, {
    headers: HEADERS,
    body: body || null,
    method,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export const fetchLatestSets = async (
  ids: number[]
): Promise<LatestSetsByCategory[]> => {
  const idsParam = ids.join(",");
  const url = `${API_ROOT}/product/latestsets/${idsParam}?mpfev=2933`;
  const method = "GET";
  return fetchFromApi<LatestSetsByCategory[]>(url, method);
};

export const getProductsForSkus = async (
  skus: number[]
): Promise<GetProductsForSkusResponse> => {
  const url = `${API_ROOT}/product/getProductForSkus?mpfev=2933`;
  const method = "POST";
  const body = JSON.stringify(skus);
  return fetchFromApi<GetProductsForSkusResponse>(url, method, body);
};

export const fetchProductLines = async (): Promise<ProductLine[]> => {
  const url = `${API_ROOT}/search/productLines?mpfev=2933`;
  const method = "GET";

  return fetchFromApi<ProductLine[]>(url, method);
};

export const fetchCatalogGroups = async (): Promise<CatalogGroup[]> => {
  const url = `${CATALOG_API_ROOT}/Catalog/CatalogGroups?mpfev=2933`;
  const method = "GET";
  return fetchFromApi<CatalogGroup[]>(url, method);
};

export const fetchProductsByIds = async (
  productIds: number[]
): Promise<Product[]> => {
  const url = `${API_ROOT}/search/request?mpfev=2933`;
  const method = "POST";
  const body = JSON.stringify({
    from: 0,
    size: 10,
    filters: {
      term: {
        productId: productIds,
      },
    },
  });
  const response = await fetchFromApi<SearchRequestResponse>(url, method, body);
  if (response.results?.length > 0) {
    return response.results[0].results;
  } else {
    throw new Error("No products found");
  }
};

export const searchProducts = async (
  requestBody: SearchRequestBody
): Promise<Product[]> => {
  const url = `${API_ROOT}/search/product?isList=true&mpfev=2933`;
  const method = "POST";
  const body = JSON.stringify(requestBody);
  const response = await fetchFromApi<SearchRequestResponse>(url, method, body);
  if (response.results?.length > 0) {
    return response.results[0].results;
  } else {
    throw new Error("No products found");
  }
};
