import { Bewertung } from "../types/bewertung";

interface VerlaufProps {
  bewertungen: Bewertung[];
  onDelete: (bewertungId: number) => void;
}

const SchuelerVerlauf = ({ bewertungen, onDelete }: VerlaufProps) => {
  const sorted = [...bewertungen].sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());

  return (
    <div className="border-l-2 border-indigo-300 ml-4 pl-4 space-y-6">
      {sorted.map((bewertung) => (
        <div key={bewertung.id} className="relative">
          <div className="absolute -left-3 top-1 w-2 h-2 bg-indigo-500 rounded-full"></div>
          <div className="text-sm text-gray-500">{new Date(bewertung.datum).toLocaleDateString()}</div>
          <div className="font-semibold">{bewertung.fach}: Note {bewertung.note}</div>
          <div className="text-gray-700">{bewertung.kommentar || "Keine Notiz vorhanden"}</div>
          <button
            onClick={() => onDelete(bewertung.id)}
            className="text-xs text-red-600 mt-2 hover:underline"
          >
            Löschen
          </button>
        </div>
      ))}
    </div>
  );
};

export default SchuelerVerlauf;
