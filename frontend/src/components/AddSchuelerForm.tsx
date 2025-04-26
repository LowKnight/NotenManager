import { useState } from "react";
import axios from "axios";
import axiosClient from "../api/axiosClient";
import { Schueler } from "../types/schueler";

interface Props {
  onSuccess: (schueler: Schueler) => void;
}

export default function AddSchuelerForm({ onSuccess }: Props) {
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");

  const speichern = async () => {
    if (!vorname.trim() || !nachname.trim()) return;

    const res = await axiosClient.post("/api/lehrer/schueler", {
      vorname,
      nachname,
    });
    onSuccess(res.data);
    setVorname("");
    setNachname("");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Vorname"
          value={vorname}
          onChange={(e) => setVorname(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <input
          type="text"
          placeholder="Nachname"
          value={nachname}
          onChange={(e) => setNachname(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      <button
        onClick={speichern}
        className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition-transform transform hover:scale-105"
      >
        Speichern
      </button>
    </div>
  );
}
