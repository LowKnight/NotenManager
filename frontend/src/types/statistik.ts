// src/types/statistik.ts
export interface FachStatistikDto {
  fach: string;
  durchschnitt: number;
  notenverteilung: {
    [note: number]: number;
  };
}

export interface LehrerStatistikDto {
  monat: string;
  fachStatistik: FachStatistikDto[];
}
