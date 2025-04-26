import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { Schueler } from "../types/schueler";
import { Bewertung } from "../types/bewertung";
import SchuelerVerlauf from "../components/SchuelerVerlauf";

interface StudentGradesOverview {
  studentName: string;
  studentId: number;
  bewertungen: Bewertung[];
}

const AllStudentsGradesOverview = ({ schueler }: { schueler: Schueler[] }) => {
  const [overview, setOverview] = useState<StudentGradesOverview[]>([]);
  const [openStudents, setOpenStudents] = useState<Record<number, boolean>>({});

  const fetchAllGrades = async () => {
    const results: StudentGradesOverview[] = await Promise.all(
      schueler.map(async (s) => {
        try {
          const response = await axiosClient.get<Bewertung[]>(`/api/lehrer/bewertung/alle`, {
            params: { schuelerId: s.id }
          });
          return {
            studentName: `${s.vorname} ${s.nachname}`,
            studentId: s.id,
            bewertungen: response.data
          };
        } catch (error) {
          console.error(`Fehler beim Laden der Bewertungen für Schüler ${s.vorname} ${s.nachname}:`, error);
          return {
            studentName: `${s.vorname} ${s.nachname}`,
            studentId: s.id,
            bewertungen: []
          };
        }
      })
    );
    setOverview(results);
  };

  useEffect(() => {
    fetchAllGrades();
  }, [schueler]);

  const toggleStudent = (studentId: number) => {
    setOpenStudents((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const deleteBewertung = async (bewertungId: number, studentId: number) => {
    try {
      await axiosClient.delete(`/api/lehrer/bewertung/${bewertungId}`);
      setOverview((prev) =>
        prev.map((student) =>
          student.studentId === studentId
            ? { ...student, bewertungen: student.bewertungen.filter(b => b.id !== bewertungId) }
            : student
        )
      );
    } catch (error) {
      console.error("Fehler beim Löschen der Bewertung:", error);
    }
  };

  return (
    <div className="space-y-6">
      {overview.map((entry, index) => (
        <div key={index} className="border p-6 rounded-xl shadow-md bg-white">
          <div className="flex justify-between items-center">
            <h3
              className="text-lg font-bold text-indigo-700 cursor-pointer"
              onClick={() => toggleStudent(entry.studentId)}
            >
              {entry.studentName}
            </h3>
            <button
              onClick={() => toggleStudent(entry.studentId)}
              className="text-sm text-indigo-600 hover:underline"
            >
              {openStudents[entry.studentId] ? "Schließen" : "Öffnen"}
            </button>
          </div>

          {openStudents[entry.studentId] && (
            <div className="mt-4">
              <SchuelerVerlauf
                bewertungen={entry.bewertungen}
                onDelete={(bewertungId) => deleteBewertung(bewertungId, entry.studentId)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllStudentsGradesOverview;
