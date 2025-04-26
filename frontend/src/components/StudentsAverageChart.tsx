import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Schueler } from "../types/schueler";
import { Bewertung } from "../types/bewertung";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";

interface StudentAverage {
  name: string;
  average: number;
}

const StudentsAverageChart = ({ schueler }: { schueler: Schueler[] }) => {
  const [data, setData] = useState<StudentAverage[]>([]);

  useEffect(() => {
    const fetchAndCalculateAverages = async () => {
      const results: StudentAverage[] = await Promise.all(
        schueler.map(async (s) => {
          try {
            const response = await axiosClient.get<Bewertung[]>(`/api/lehrer/bewertung/alle`, {
              params: { schuelerId: s.id }
            });
            const bewertungen = response.data;
            const average =
              bewertungen.length > 0
                ? bewertungen.reduce((sum, b) => sum + b.note, 0) / bewertungen.length
                : 0;

            return { name: `${s.vorname} ${s.nachname}`, average: parseFloat(average.toFixed(2)) };
          } catch (error) {
            console.error(`Fehler beim Laden der Bewertungen für Schüler ${s.vorname} ${s.nachname}:`, error);
            return { name: `${s.vorname} ${s.nachname}`, average: 0 };
          }
        })
      );

      setData(results);
    };

    fetchAndCalculateAverages();
  }, [schueler]);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-indigo-200 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Durchschnittsnoten Übersicht</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} height={80} />
          <YAxis domain={[1, 5]} reversed />
          <Tooltip />
          <Bar dataKey="average" fill="#6366f1">
            <LabelList dataKey="average" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentsAverageChart;
