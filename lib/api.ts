export const API_BASE_URL = "http://localhost/growthspire/backend";

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}/${endpoint}`;
  
  const defaultOptions: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return { success: false, message: "Connection to server failed" };
  }
}
