package com.NotenManager.NotenManager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DashboardDto {
    private String vorname;
    private String nachname;
    private String email;
    private String heutigesDatum;
    private int anzahlSchueler;
    private int anzahlBewertungenHeute;


}


