package com.NotenManager.NotenManager.dto;

import lombok.Data;

@Data
public class BewertungRequest {
    private Long schuelerId;
    private Long fachId;
    private int note;
    private String kommentar;
}
