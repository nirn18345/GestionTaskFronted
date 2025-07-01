export function parseJwt(token: string) {
  try {
    const base64Payload = token.split('.')[1];
    const decodedPayload = atob(base64Payload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
}