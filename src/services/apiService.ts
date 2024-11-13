import {
  SearchResponse,
  SearchRequestBody,
  CategoryLatestSets,
} from "../types/types";
import { HEADERS } from "../constants/constants";

export const searchProducts = async (
  requestBody: SearchRequestBody,
  urlParams: string
): Promise<SearchResponse> => {
  const response = await fetch(
    `https://mp-search-api.tcgplayer.com/v1/search/product?${urlParams}`,
    {
      headers: HEADERS,
      body: JSON.stringify(requestBody),
      method: "POST",
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export async function fetchLatestSets(
  ids: number[]
): Promise<CategoryLatestSets[]> {
  const idsParam = ids.join(",");
  const response = await fetch(
    `https://mp-search-api.tcgplayer.com/v1/product/latestsets/${idsParam}?mpfev=2933`,
    {
      headers: HEADERS,
      body: null,
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch latest sets");
  }

  return response.json();
}
