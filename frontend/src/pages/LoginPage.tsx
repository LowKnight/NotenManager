import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosClient.post("/api/auth/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Fehler beim Login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300">
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Passwort</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
