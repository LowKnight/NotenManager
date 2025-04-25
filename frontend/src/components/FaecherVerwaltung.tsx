import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Fach } from "../types/fach";

export default function FaecherVerwaltung() {
  const [faecher, setFaecher] = useState<Fach[]>([]);
  const [neuesFach, setNeuesFach] = useState("");

  useEffect(() => {
    ladeFaecher();
  }, []);

  const ladeFaecher = async () => {
    const res = await axiosClient.get("/lehrer/faecher");
    setFaecher(res.data);
  };

  const fachHinzufuegen = async () => {
    if (!neuesFach.trim()) return;
    const res = await axiosClient.post("/lehrer/faecher", { name: neuesFach });
    setFaecher([...faecher, res.data]);
    setNeuesFach("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Neues Fach hinzufügen
        </label>
        <div className="flex gap-2">
          <input
            value={neuesFach}
            onChange={(e) => setNeuesFach(e.target.value)}
            placeholder="z. B. Mathematik"
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            onClick={fachHinzufuegen}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md transition-all"
          >
            Hinzufügen
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Aktive Fächer</h3>
        <ul className="space-y-1 text-gray-800">
          {faecher.map((fach) => (
            <li
              key={fach.id}
              className="bg-indigo-50 border border-indigo-100 rounded px-3 py-1 text-sm"
            >
              {fach.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
