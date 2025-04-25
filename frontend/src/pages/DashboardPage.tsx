import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Schueler } from "../types/schueler";
import SchuelerList from "../components/SchuelerList";
import AddSchuelerForm from "../components/AddSchuelerForm";
import BewertungForm from "../components/BewertungForm";
import FaecherVerwaltung from "../components/FaecherVerwaltung";

export default function DashboardPage() {
  const [schueler, setSchueler] = useState<Schueler[]>([]);
  const [ausgewaehlt, setAusgewaehlt] = useState<number | null>(null);

  useEffect(() => {
    axiosClient.get("/lehrer/schueler").then((res) => setSchueler(res.data));
  }, []);

  const hinzufuegen = (neuer: Schueler) => {
    setSchueler([...schueler, neuer]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 text-slate-800 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-14 space-y-16">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-800">
            📊 Lehrer-Dashboard
          </h1>
          <p className="text-lg text-slate-500">
            Modernes Bewertungssystem mit animierter Oberfläche
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Schülerübersicht */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-indigo-200 hover:scale-[1.01] transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4">Schülerübersicht</h2>
            <SchuelerList schueler={schueler} onBewerten={setAusgewaehlt} />
          </div>

          {/* Schüler anlegen */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-indigo-200 hover:scale-[1.01] transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4">Neuen Schüler anlegen</h2>
            <AddSchuelerForm onSuccess={hinzufuegen} />
          </div>
        </div>

        {/* Fächerverwaltung */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-indigo-200 hover:scale-[1.01] transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4">Fächer verwalten</h2>
          <FaecherVerwaltung />
        </div>

        {/* Bewertung Modal */}
        {ausgewaehlt && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-lg border border-slate-200">
              <BewertungForm schuelerId={ausgewaehlt} onClose={() => setAusgewaehlt(null)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
