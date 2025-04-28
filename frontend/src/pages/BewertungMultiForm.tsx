import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Fach } from "../types/fach";

interface BewertungMultiFormProps {
  schuelerId: number;
  onClose: () => void;
  onSuccess: () => void;
}

interface BewertungEntry {
  fachId: number;
  note: number;
  notiz: string;
}

export default function BewertungMultiForm({ schuelerId, onClose, onSuccess }: BewertungMultiFormProps) {
  const [faecher, setFaecher] = useState<Fach[]>([]);
  const [bewertungen, setBewertungen] = useState<BewertungEntry[]>([]);

  useEffect(() => {
    axiosClient.get("/api/lehrer/faecher").then((res) => {
      setFaecher(res.data);
      setBewertungen(res.data.map((fach: Fach) => ({ fachId: fach.id, note: 1, notiz: "" })));
    });
  }, []);

  const handleNoteChange = (fachId: number, note: number) => {
    setBewertungen((prev) =>
      prev.map((b) => (b.fachId === fachId ? { ...b, note } : b))
    );
  };

  const handleNotizChange = (fachId: number, notiz: string) => {
    setBewertungen((prev) =>
      prev.map((b) => (b.fachId === fachId ? { ...b, notiz } : b))
    );
  };

  const speichern = async () => {
    const payload = bewertungen.map((b) => ({ ...b, schuelerId }));
    await axiosClient.post("/api/lehrer/bewertung/multi", payload);
    onSuccess();
    onClose();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Bewertungen für alle Fächer</h2>

      {faecher.map((fach) => (
        <div key={fach.id} className="space-y-2">
          <h3 className="text-lg font-semibold">{fach.name}</h3>
          <div className="flex flex-col gap-2">
            <input
              type="number"
              min={1}
              max={5}
              value={bewertungen.find((b) => b.fachId === fach.id)?.note || 1}
              onChange={(e) => handleNoteChange(fach.id, parseInt(e.target.value))}
              className="border rounded p-2 w-24"
              placeholder="Note"
            />
            <textarea
              value={bewertungen.find((b) => b.fachId === fach.id)?.notiz || ""}
              onChange={(e) => handleNotizChange(fach.id, e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Notiz"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-end gap-4 pt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 transition"
        >
          Ohne Bewertungen speichern
        </button>
        <button
          onClick={speichern}
          className="px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition"
        >
          Speichern
        </button>
      </div>
      </div>
  );
}