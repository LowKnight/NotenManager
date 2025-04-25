import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axiosClient.post("/auth/login", { email, passwort });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Login fehlgeschlagen");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        className="w-full p-2 border mb-2"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full p-2 border mb-4"
        placeholder="Passwort"
        value={passwort}
        onChange={(e) => setPasswort(e.target.value)}
      />
      <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded">
        Anmelden
      </button>
    </div>
  );
}
