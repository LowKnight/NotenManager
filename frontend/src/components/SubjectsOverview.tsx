import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Props {
  schuelerId: number;
}

interface Bewertung {
  fachName: string;
  note: number;
  notiz: string;
}

export default function SubjectsOverviewWithCharts({ schuelerId }: Props) {
  const [bewertungen, setBewertungen] = useState<Bewertung[]>([]);

  useEffect(() => {
    axiosClient
      .get(`/api/lehrer/bewertung/alle?schuelerId=${schuelerId}`)
      .then((res) => {
        const transformed = res.data.map((b: any) => ({
          fachName: b.fachName,
          note: b.note,
          notiz: b.notiz,
        }));
        setBewertungen(transformed);
      });
  }, [schuelerId]);

  const gruppiert = bewertungen.reduce((acc: { [key: string]: Bewertung[] }, curr) => {
    acc[curr.fachName] = acc[curr.fachName] || [];
    acc[curr.fachName].push(curr);
    return acc;
  }, {});

  if (bewertungen.length === 0) {
    return <p className="text-sm text-slate-500 italic">Noch keine Bewertungen vorhanden.</p>;
  }

  return (
    <div className="space-y-8">
      {Object.entries(gruppiert).map(([fachName, fachBewertungen]) => (
        <div key={fachName} className="border rounded-xl p-6 bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4">{fachName}</h2>
          <div className="w-full h-60">
            <ResponsiveContainer>
              <BarChart data={fachBewertungen}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="notiz" hide /> {/* oder ein anderes Feld, aktuell als Platzhalter */}
                <YAxis domain={[1, 5]} reversed />
                <Tooltip />
                <Bar dataKey="note" fill="#4F46E5" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}
