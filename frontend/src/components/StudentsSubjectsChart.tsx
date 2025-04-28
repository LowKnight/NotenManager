import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Props {
  schuelerId: number;
}

interface Bewertung {
  fachName: string;
  note: number;
}

export default function StudentsSubjectsChart({ schuelerId }: Props) {
  const [bewertungen, setBewertungen] = useState<Bewertung[]>([]);

  useEffect(() => {
    axiosClient
      .get(`/api/lehrer/bewertung/alle?schuelerId=${schuelerId}`)
      .then((res) => {
        const transformed = res.data.map((b: any) => ({
          fachName: b.fachName,
          note: b.note,
        }));
        setBewertungen(transformed);
      });
  }, [schuelerId]);

  if (bewertungen.length === 0) {
    return <p className="text-sm text-slate-500 italic">Noch keine Bewertungen für diesen Schüler vorhanden.</p>;
  }

  return (
    <div className="w-full h-80">
      <h2 className="text-2xl font-bold mb-4">Fachnotenübersicht</h2>
      <ResponsiveContainer>
        <BarChart data={bewertungen}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fachName" />
          <YAxis domain={[1, 5]} reversed />
          <Tooltip />
          <Bar dataKey="note" fill="#6366F1" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
