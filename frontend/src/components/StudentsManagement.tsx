import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import axios from "axios";

interface Student {
  id: number;
  name: string;
}

const StudentsManagement = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/students"`)
      .then(response => setStudents(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleAddStudent = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/students", { name: newStudent }`)
      .then(response => setStudents([...students, response.data]))
      .catch(error => console.log(error));
  };

  const handleDeleteStudent = (id: number) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/students/${id}`)
      .then(() => setStudents(students.filter(student => student.id !== id)))
      .catch(error => console.log(error));

  };

  return (
    <div>
      <h2>Schüler verwalten</h2>
      <input
        type="text"
        value={newStudent}
        onChange={(e) => setNewStudent(e.target.value)}
        placeholder="Neuen Schüler hinzufügen"
      />
      <button onClick={handleAddStudent}>Hinzufügen</button>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} <button onClick={() => handleDeleteStudent(student.id)}>Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsManagement;
