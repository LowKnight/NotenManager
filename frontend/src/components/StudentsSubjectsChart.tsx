import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Props {
  schuelerId: number;
}

interface Bewertung {
  fachName: string;
  note: number;
}

const NOTE_FARBEN: Record<number, string> = {
  1: "#10B981", // grün
  2: "#3B82F6", // blau
  3: "#F59E0B", // gelb
  4: "#F97316", // orange
  5: "#EF4444", // rot
};

export default function StudentsSubjectsChart({ schuelerId }: Props) {
  const [bewertungen, setBewertungen] = useState<Bewertung[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBewertungen() {
      try {
        const res = await axiosClient.get(`/api/lehrer/bewertung/alle?schuelerId=${schuelerId}`);
        const transformed = res.data.map((b: any) => ({
          fachName: b.fach,
          note: b.note,
        }));
        setBewertungen(transformed);
      } catch (error) {
        console.error("Fehler beim Laden der Bewertungen:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBewertungen();
  }, [schuelerId]);

  if (loading) {
    return <p className="text-center text-slate-500 italic">Lade Bewertungen...</p>;
  }

  if (bewertungen.length === 0) {
    return <p className="text-center text-slate-500 italic">Noch keine Bewertungen für diesen Schüler vorhanden.</p>;
  }

  // Bewertungen nach Fach gruppieren
  const gruppiertNachFach: Record<string, Bewertung[]> = {};
  bewertungen.forEach((bewertung) => {
    if (!gruppiertNachFach[bewertung.fachName]) {
      gruppiertNachFach[bewertung.fachName] = [];
    }
    gruppiertNachFach[bewertung.fachName].push(bewertung);
  });

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(gruppiertNachFach).map(([fachName, bewertungenFach]) => {
          const noteCounts = [1, 2, 3, 4, 5].map((note) => ({
            note,
            anzahl: bewertungenFach.filter((b) => b.note === note).length,
          })).filter((n) => n.anzahl > 0);

          const durchschnitt = (
            bewertungenFach.reduce((sum, b) => sum + b.note, 0) / bewertungenFach.length
          ).toFixed(2);

          return (
            <div key={fachName} className="bg-slate-50 rounded-xl p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-center">{fachName}</h3>
              <div className="w-full h-48">
                <ResponsiveContainer>
                  <BarChart
                    data={noteCounts}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    barSize={40}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="note" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar
                      dataKey="anzahl"
                      animationDuration={800}
                      isAnimationActive={true}
                    >
                      {noteCounts.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={NOTE_FARBEN[entry.note] || "#6366F1"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-slate-600 mt-2">
                Durchschnittsnote: <span className="font-semibold">{durchschnitt}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
