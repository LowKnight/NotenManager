import { useState } from "react";
import axiosClient from "../api/axiosClient";
import axios from "axios";

interface BewertungModalProps {
  schuelerId: number;
  onClose: () => void;
}

export default function BewertungModal({ schuelerId, onClose }: BewertungModalProps) {
  const [fachId, setFachId] = useState(1); // später dynamisch laden
  const [note, setNote] = useState(1);
  const [kommentar, setKommentar] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/lehrer/bewertung", {
        schuelerId,
        fachId,
        note,
        kommentar,
      });
      onClose(); // Modal schließen & neu laden
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      alert("Fehler beim Speichern.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 w-[400px] shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-violet-700">Bewertung vergeben</h3>

        <label className="block mb-2">Fach</label>
        <select
          value={fachId}
          onChange={(e) => setFachId(Number(e.target.value))}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value={1}>Deutsch</option>
          <option value={2}>Mathe</option>
          <option value={3}>Englisch</option>
        </select>

        <label className="block mb-2">Note (1–5)</label>
        <input
          type="number"
          min={1}
          max={5}
          value={note}
          onChange={(e) => setNote(Number(e.target.value))}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">Kommentar</label>
        <textarea
          value={kommentar}
          onChange={(e) => setKommentar(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">
            Abbrechen
          </button>
          <button type="submit" className="bg-violet-600 text-white px-4 py-2 rounded">
            Speichern
          </button>
        </div>
      </form>
    </div>
  );
}
