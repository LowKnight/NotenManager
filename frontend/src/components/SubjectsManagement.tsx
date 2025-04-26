import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import ConfirmModal from "../components/ConfirmModal";
import DeleteButton from "../components/DeleteButton";

interface Subject {
  id: number;
  name: string;
}

const SubjectsManagement = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axiosClient.get("/api/lehrer/faecher")
      .then(response => setSubjects(response.data))
      .catch(error => console.error("Fehler beim Laden der Fächer:", error));
  }, []);

  const handleAddSubject = () => {
    if (newSubject.trim() === "") return;

    axiosClient.post("/api/lehrer/faecher", { name: newSubject })
      .then(response => {
        setSubjects([...subjects, response.data]);
        setNewSubject("");
      })
      .catch(error => console.error("Fehler beim Hinzufügen des Fachs:", error));
  };

  const openModal = (id: number) => {
    setSelectedSubjectId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSubjectId === null) return;

    axiosClient.delete(`/api/lehrer/faecher/${selectedSubjectId}`)
      .then(() => {
        setSubjects(subjects.filter(subject => subject.id !== selectedSubjectId));
      })
      .catch(error => console.error("Fehler beim Löschen des Fachs:", error))
      .finally(() => {
        setIsModalOpen(false);
        setSelectedSubjectId(null);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedSubjectId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Fächer verwalten</h2>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="z.B. Mathematik"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddSubject}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Hinzufügen
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {subjects.map((subject) => (
          <li
            key={subject.id}
            className="flex justify-between items-center bg-indigo-50 border border-indigo-100 rounded p-2 hover:bg-indigo-100 transition"
          >
            <span className="text-gray-800">{subject.name}</span>
            <div className="flex-shrink-0">
              <DeleteButton onClick={() => openModal(subject.id)} />
            </div>
          </li>
        ))}
      </ul>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Fach löschen"
        message="Möchtest du dieses Fach wirklich löschen?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default SubjectsManagement;
