import { Schueler } from "../types/schueler";

interface Props {
  schueler: Schueler[];
  onBewerten: (id: number) => void;
  onDelete: (id: number) => void;

}

export default function SchuelerList({ schueler, onBewerten, onDelete }: Props) {
  if (schueler.length === 0) {
    return <p className="text-sm text-slate-500 italic">Noch keine Schüler vorhanden.</p>;
  }

  return (
    <ul className="space-y-4">
      {schueler.map((s) => (
        <li key={s.id} className="flex justify-between items-center border-b py-2">
          <div>{s.vorname} {s.nachname}</div>
          <div className="flex gap-2">
            <button
              onClick={() => onBewerten(s.id)}
              className="px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
            >
              Bewerten
            </button>
            <button
              onClick={() => onDelete(s.id)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Löschen
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}