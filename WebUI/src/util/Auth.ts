const bearerTokenKey = "BEARER_TOKEN";

export function getBearerToken() {
  return localStorage.getItem(bearerTokenKey);
}

export function setBearerToken(token: string) {
  localStorage.setItem(bearerTokenKey, token);
}

export function deleteBearerToken() {
  localStorage.removeItem(bearerTokenKey);
}