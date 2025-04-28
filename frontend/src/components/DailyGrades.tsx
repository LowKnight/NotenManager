import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import axios from "axios";


interface Student {
  id: number;
  name: string;
}

interface Grade {
  subject: string;
  grade: number;
  date: string;
}

const DailyGrades = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<string[]>(["Mathematik", "Deutsch", "Englisch"]); // Beispielhafte Fächer
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [newGrade, setNewGrade] = useState<number | string>("");

  // Alle Schüler laden
  useEffect(() => {
    axios.get("http://`${process.env.REACT_APP_API_URL}/api/students")
      .then(response => setStudents(response.data))
      .catch(error => console.log(error));
  }, []);

  // Noten für einen Schüler laden
  useEffect(() => {
    if (selectedStudent !== null) {
      axios.get(`http://`${process.env.REACT_APP_API_URL}/api/grades/${selectedStudent}`)
        .then(response => setGrades(response.data))
        .catch(error => console.log(error));
    }
  }, [selectedStudent]);

  const handleSubmitGrade = () => {
    if (selectedStudent !== null && newGrade !== "") {
      axios.post("http://`${process.env.REACT_APP_API_URL}/api/grades", {
        studentId: selectedStudent,
        subject: "Mathematik", // Beispiel: Setze hier das ausgewählte Fach
        grade: newGrade,
        date: new Date().toISOString(), // aktuelles Datum als String
      })
        .then(response => {
          setGrades([...grades, response.data]);
          setNewGrade("");
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div>
      <h2>Tägliche Bewertungen</h2>
      <div>
        <label>Schüler auswählen:</label>
        <select onChange={(e) => setSelectedStudent(Number(e.target.value))}>
          <option value={""}>Bitte wählen</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      {selectedStudent && (
        <div>
          <h3>Noten für {students.find((student) => student.id === selectedStudent)?.name}</h3>
          <div>
            <label>Fach:</label>
            <select>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Note:</label>
            <input
              type="number"
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
              min="1"
              max="6"
              step="0.1"
              placeholder="Gib die Note ein"
            />
          </div>

          <button onClick={handleSubmitGrade}>Note speichern</button>

          <div>
            <h4>Gespeicherte Noten</h4>
            <ul>
              {grades.map((grade, index) => (
                <li key={index}>
                  {grade.subject}: {grade.grade} (Datum: {grade.date})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyGrades;
