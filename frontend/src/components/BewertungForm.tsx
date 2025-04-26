import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import axios from "axios";
import { BewertungRequest } from "../types/bewertung";
import { Fach } from "../types/fach";

interface Props {
  schuelerId: number;
  onClose: () => void;
}

export default function BewertungForm({ schuelerId, onClose }: Props) {
  const [note, setNote] = useState(1);
  const [kommentar, setKommentar] = useState("");
  const [fachId, setFachId] = useState<number>(1);
  const [faecher, setFaecher] = useState<Fach[]>([]);

  useEffect(() => {
    axiosClient.get("/api/lehrer/faecher").then((res) => {
      setFaecher(res.data);
      if (res.data.length > 0) {
        setFachId(res.data[0].id);
      }
    });
  }, []);

  const senden = async () => {
    const request: BewertungRequest = { schuelerId, note, kommentar, fachId };
    await axiosClient.post("/api/lehrer/bewertung", request);
    onClose();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-indigo-700">Bewertung vergeben</h2>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Fach</label>
          <select
            value={fachId}
            onChange={(e) => setFachId(+e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            {faecher.map((fach) => (
              <option key={fach.id} value={fach.id}>
                {fach.name}
              </option>
            ))}
          </select>
        </div>

        <select
          value={note}
          onChange={(e) => setNote(Number(e.target.value))}
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 transition
            ${
              note <= 2
                ? "border-green-400 focus:ring-green-300"
                : note === 3
                ? "border-yellow-400 focus:ring-yellow-300"
                : "border-red-400 focus:ring-red-300"
            }
          `}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Kommentar</label>
          <textarea
            value={kommentar}
            onChange={(e) => setKommentar(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Optionaler Kommentar"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
        >
          Abbrechen
        </button>
        <button
          onClick={senden}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 hover:scale-105 transition"
        >
          Speichern
        </button>
      </div>
    </div>
  );
}
