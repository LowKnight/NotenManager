import axiosClient from "../api/axiosClient";
import axios from "axios";

export async function login(email: string, password: string) {
  const response = await axios.post("http://localhost:8080/api/auth/login", {
    email,
    password,
  });
  const jwt = response.data.token;
  localStorage.setItem("token", jwt);
  return jwt;
}
