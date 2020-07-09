export const bearerTokenKey = "BEARER_TOKEN";

export function getBearerToken() {
  return localStorage.getItem(bearerTokenKey);
}