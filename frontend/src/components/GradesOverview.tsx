import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import axios from "axios";

interface Grade {
  subject: string;
  grade: number;
  date: string;
}

const GradesOverview = ({ studentId }: { studentId: number }) => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [averageGrade, setAverageGrade] = useState<number | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/grades/${studentId}`)
      .then(response => {
        setGrades(response.data);
        calculateAverage(response.data);
      })
      .catch(error => console.log(error));
  }, [studentId]);

  const calculateAverage = (grades: Grade[]) => {
    if (grades.length === 0) return;

    const total = grades.reduce((acc, grade) => acc + grade.grade, 0);
    setAverageGrade(total / grades.length);
  };

  const groupedByMonth = grades.reduce((acc, grade) => {
    const month = new Date(grade.date).toLocaleString("de-DE", { month: "long", year: "numeric" });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(grade);
    return acc;
  }, {} as Record<string, Grade[]>);

  return (
    <div>
      <h2>Notenübersicht</h2>
      <h3>Durchschnittsnote: {averageGrade ? averageGrade.toFixed(2) : "Noch keine Noten"}</h3>

      {Object.keys(groupedByMonth).map((month) => (
        <div key={month}>
          <h4>{month}</h4>
          <ul>
            {groupedByMonth[month].map((grade, index) => (
              <li key={index}>
                {grade.subject}: {grade.grade}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GradesOverview;
