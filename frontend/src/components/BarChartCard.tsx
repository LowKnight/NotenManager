import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FachStatistikDto } from "../types/statistik";

interface Props {
  fach: FachStatistikDto;
}

export default function BarChartCard({ fach }: Props) {
  const data = Object.entries(fach.notenverteilung).map(([note, count]) => ({
    note,
    anzahl: count,
  }));

  return (
    <div className="bg-white shadow p-4 rounded-xl mb-6">
      <h2 className="text-xl font-bold mb-2">{fach.fach}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="note" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="anzahl" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-600 mt-2">
        Ø Durchschnittsnote: {fach.durchschnitt.toFixed(2)}
      </p>
    </div>
  );
}
