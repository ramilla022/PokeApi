import { jwtDecode } from "jwt-decode"; 

const SECRET_KEY = "clave-supersecreta"; 

export const generateToken = (payload, expiresInSeconds = 3600) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const payloadWithExp = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encode = (obj) =>
    btoa(JSON.stringify(obj))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  const token = `${encode(header)}.${encode(payloadWithExp)}.simuladafirma`;

  return token;
};

export const saveToken = (token) => {
  localStorage.setItem("jwt", token);
};

export const removeToken = () => {
  localStorage.removeItem("jwt");
};

export const isAuthenticated = () => {
    const token = localStorage.getItem("jwt");
    if (!token) return false;
  
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (err) {
      console.error("Token inválido o expirado:", err);
      return false;
    }
  };