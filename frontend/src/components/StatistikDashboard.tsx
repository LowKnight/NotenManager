import AllStudentsGradesOverview from "./AllStudentsGradesOverview";
import { Schueler } from "../types/schueler";

interface StatistikDashboardProps {
  schueler: Schueler[];
}

export default function StatistikDashboard({ schueler }: StatistikDashboardProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Statistikübersicht</h2>
      <AllStudentsGradesOverview schueler={schueler} />
    </div>
  );
}
