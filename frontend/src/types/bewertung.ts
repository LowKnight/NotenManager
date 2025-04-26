export interface BewertungRequest {
  schuelerId: number;
  fachId: number;
  note: number;
  kommentar: string;
}
export interface Bewertung {
  id: number;
  fach: string;
  note: number;
  kommentar: string;
  datum: string;
}
