package com.NotenManager.NotenManager.dto;

import lombok.Data;
import java.util.Map;

@Data
public class FachStatistikDto {
    private String fach;
    private double durchschnitt;
    private Map<Integer, Integer> notenverteilung;
}
