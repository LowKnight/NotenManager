import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axiosClient.post("/auth/register", {
        email, passwort, vorname, nachname
      });
      alert("Registrierung erfolgreich");
      navigate("/login");
    } catch (err) {
      alert("Registrierung fehlgeschlagen");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registrieren</h1>
      <input className="w-full p-2 border mb-2" placeholder="Vorname" value={vorname} onChange={(e) => setVorname(e.target.value)} />
      <input className="w-full p-2 border mb-2" placeholder="Nachname" value={nachname} onChange={(e) => setNachname(e.target.value)} />
      <input className="w-full p-2 border mb-2" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="w-full p-2 border mb-4" placeholder="Passwort" value={passwort} onChange={(e) => setPasswort(e.target.value)} />
      <button onClick={handleRegister} className="w-full bg-green-600 text-white p-2 rounded">
        Registrieren
      </button>
    </div>
  );
}
