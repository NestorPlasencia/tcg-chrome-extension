export async function fetchFromApi<T>(
  url: string,
  method: "GET" | "POST",
  headers: HeadersInit,
  body: string = ""  
): Promise<T> {
  const response = await fetch(url, {
    headers,
    body: body || null,
    method,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

