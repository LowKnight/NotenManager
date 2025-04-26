package com.NotenManager.NotenManager.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BewertungDto {
    private Long id;
    private String fach;
    private int note;
    private String kommentar;
    private LocalDate datum;
}
