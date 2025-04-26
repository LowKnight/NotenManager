import { Schueler } from "../types/schueler";

interface Props {
  schueler: Schueler[];
  onBewerten: (id: number) => void;
}

export default function SchuelerList({ schueler, onBewerten }: Props) {
  if (schueler.length === 0) {
    return <p className="text-sm text-slate-500 italic">Noch keine Schüler vorhanden.</p>;
  }

  return (
    <ul className="space-y-4">
      {schueler.map((s) => (
        <li
          key={s.id}
          className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all"
        >
          <span className="font-medium text-gray-800">
            {s.vorname} {s.nachname}
          </span>
          <button
            onClick={() => onBewerten(s.id)}
            className="bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-700 transition-transform transform hover:scale-105"
          >
            Note vergeben
          </button>
        </li>
      ))}
    </ul>
  );
}
