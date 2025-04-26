import axiosClient from "../api/axiosClient";
import axios from "axios";

export const fetchBewertungen = async (schuelerId: number, monat: string) => {
  const response = await axios.get('/api/lehrer/bewertung', {
    params: { schuelerId, monat },
  });
  return response.data;
};
