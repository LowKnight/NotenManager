package com.NotenManager.NotenManager.dto;

import lombok.Data;

import java.util.List;

@Data
public class MonatsauswertungDto {
    private String schuelerName;
    private String monat;
    private double durchschnitt;
    private int gesamtnote;
    private List<BewertungDto> eintraege;
}
