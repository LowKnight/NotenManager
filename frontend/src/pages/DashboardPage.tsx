import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Schueler } from "../types/schueler";
import SchuelerList from "../components/SchuelerList";
import AddSchuelerForm from "../components/AddSchuelerForm";
import BewertungForm from "../components/BewertungForm";
import SubjectsManagement from "../components/SubjectsManagement";
import StatistikDashboard from "../components/StatistikDashboard";
import StudentsAverageChart from "../components/StudentsAverageChart";
import BewertungMultiForm from "../pages/BewertungMultiForm";
import StudentsSubjectsChart from "../components/StudentsSubjectsChart";
import BarChartCard from "../components/BarChartCard";
import { FachStatistikDto } from "../types/statistik";

export default function DashboardPage() {
  const [schueler, setSchueler] = useState<Schueler[]>([]);
  const [ausgewaehlt, setAusgewaehlt] = useState<number | null>(null);
  const [multiBewertungOffen, setMultiBewertungOffen] = useState(false);
  const [neuAngelegterSchuelerId, setNeuAngelegterSchuelerId] = useState<number | null>(null);
  const [fachStatistiken, setFachStatistiken] = useState<FachStatistikDto[]>([]);

  useEffect(() => {
    reloadSchueler();
    reloadFachStatistiken();
  }, []);

  const reloadSchueler = () => {
    axiosClient.get("/api/lehrer/schueler").then((res) => setSchueler(res.data));
  };

  const reloadFachStatistiken = () => {
    const aktuellerMonat = new Date().toISOString().slice(0, 7);
    axiosClient.get("/api/lehrer/statistik", { params: { monat: aktuellerMonat } })
      .then((res) => {
        // res.data ist ein einzelner LehrerStatistikDto, daraus brauchen wir die Liste der Fächer
        setFachStatistiken(res.data.faecherStatistiken);
      });
  };

  const hinzufuegen = (neuer: Schueler) => {
    setSchueler([...schueler, neuer]);
    setNeuAngelegterSchuelerId(neuer.id);
    setMultiBewertungOffen(true);
  };

  const loeschenSchueler = async (id: number) => {
    if (window.confirm("Willst du diesen Schüler wirklich löschen?")) {
      try {
        await axiosClient.delete(`/api/lehrer/schueler/${id}`);
        reloadSchueler();
        reloadFachStatistiken();
        alert("Schüler erfolgreich gelöscht!");
      } catch (error: any) {
        if (error.response && error.response.status === 409) {
          alert("Schüler kann nicht gelöscht werden, da noch Bewertungen oder Verlinkungen existieren.");
        } else {
          alert("Schüler kann nicht gelöscht werden > Bewertungen oder Notizen sind noch eingetragen.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 text-slate-800 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-14 space-y-16">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-800">
            Lehrer-Dashboard
          </h1>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Schülerübersicht */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-indigo-200 hover:scale-[1.01] transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4">Schülerübersicht</h2>
            <SchuelerList schueler={schueler} onBewerten={setAusgewaehlt} onDelete={loeschenSchueler}/>
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
          <SubjectsManagement />
        </div>

        {/* Statistikübersicht */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-indigo-200 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4">Statistikübersicht</h2>
            <StatistikDashboard schueler={schueler} />
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-indigo-200 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4">Durchschnittsnoten Diagramm</h2>
            <StudentsAverageChart schueler={schueler} />
          </div>
        </div>

        {/* Fächer-Notenverteilung Übersicht */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {Array.isArray(fachStatistiken) && fachStatistiken.map((fach) => (
            <BarChartCard key={fach.fach} fach={fach} />
          ))}
        </div>

        {schueler.map((s) => (
          <div key={s.id} className="bg-white rounded-3xl p-6 mb-10 shadow-md border border-slate-200">
            <h2 className="text-3xl font-bold mb-6 text-center">{s.vorname} {s.nachname}</h2>
            <StudentsSubjectsChart schuelerId={s.id} />
          </div>
        ))}


        {/* Einzelbewertung Modal */}
        {ausgewaehlt && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-lg border border-slate-200">
              <BewertungForm schuelerId={ausgewaehlt} onClose={() => setAusgewaehlt(null)} />
            </div>
          </div>
        )}

        {/* Mehrfachbewertung Modal */}
        {multiBewertungOffen && neuAngelegterSchuelerId && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-3xl border border-slate-200 overflow-y-auto max-h-[90vh]">
              <BewertungMultiForm
                schuelerId={neuAngelegterSchuelerId}
                onClose={() => {
                  setMultiBewertungOffen(false);
                  setNeuAngelegterSchuelerId(null);
                }}
                onSuccess={reloadSchueler}
              />
            </div>
          </div>
        )}

        {/* Fachnoten-Diagramm pro Schüler */}
        {ausgewaehlt && !multiBewertungOffen && (
          <div className="bg-white rounded-3xl p-6 mt-10 border border-slate-200 shadow-lg">
            <StudentsSubjectsChart schuelerId={ausgewaehlt} />
          </div>
        )}
      </div>
    </div>
  );
}
