import { useEffect, useState } from "react";
import { fetchBewertungen } from "../services/bewertungService";
import BewertungModal from "./BewertungModal";
import { useParams } from "react-router-dom";

interface BewertungDto {
  fach: string;
  note: number;
  datum: string;
  notiz: string;
}

export default function SchuelerDetail() {
  const { id } = useParams();
  const [bewertungen, setBewertungen] = useState<BewertungDto[]>([]);
  const [monat, setMonat] = useState<string>(new Date().toISOString().slice(0, 7));
  const [durchschnitt, setDurchschnitt] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const ladeBewertungen = () => {
    if (!id) return;
    fetchBewertungen(Number(id), monat)
      .then(data => {
        setBewertungen(data);
        berechneDurchschnitt(data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    ladeBewertungen();
  }, [id, monat]);

  const berechneDurchschnitt = (bewertungen: BewertungDto[]) => {
    if (bewertungen.length === 0) {
      setDurchschnitt(null);
      return;
    }
    const summe = bewertungen.reduce((acc, curr) => acc + curr.note, 0);
    setDurchschnitt(summe / bewertungen.length);
  };

  const wechselMonat = (richtung: "vor" | "zurueck") => {
    const [jahr, monatNummer] = monat.split("-").map(Number);
    const date = new Date(jahr, monatNummer - 1);
    date.setMonth(date.getMonth() + (richtung === "vor" ? -1 : 1));
    const neuesMonat = date.toISOString().slice(0, 7);
    setMonat(neuesMonat);
  };

  const getMonatsName = (monatStr: string) => {
    const [jahr, monat] = monatStr.split("-").map(Number);
    return new Date(jahr, monat - 1).toLocaleString("de-AT", { month: "long", year: "numeric" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bewertungen</h2>

      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => wechselMonat("vor")} className="p-2 bg-gray-200 rounded hover:bg-gray-300">«</button>
        <span className="font-semibold">{getMonatsName(monat)}</span>
        <button onClick={() => wechselMonat("zurueck")} className="p-2 bg-gray-200 rounded hover:bg-gray-300">»</button>
      </div>

      <div className="mb-4">
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-violet-600 text-white rounded">
          Bewertung vergeben
        </button>
      </div>

      {durchschnitt !== null && (
        <div className="mb-6 text-lg">
          Durchschnittsnote: <span className="font-bold">{durchschnitt.toFixed(2)}</span>
        </div>
      )}

      {bewertungen.length > 0 ? (
        <div className="space-y-4">
          {bewertungen.map((bewertung, index) => (
            <div key={index} className="p-4 bg-white rounded-xl shadow">
              <h3 className="text-lg font-semibold">{bewertung.fach}</h3>
              <p>Note: {bewertung.note}</p>
              <p>Datum: {new Date(bewertung.datum).toLocaleDateString()}</p>
              <p>Notiz: {bewertung.notiz}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Keine Bewertungen im gewählten Monat vorhanden.</p>
      )}

      {showModal && (
        <BewertungModal
          schuelerId={Number(id)}
          onClose={() => {
            setShowModal(false);
            ladeBewertungen();
          }}
        />
      )}
    </div>
  );
}
