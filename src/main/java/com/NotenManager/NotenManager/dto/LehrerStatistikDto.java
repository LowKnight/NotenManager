package com.NotenManager.NotenManager.dto;

import lombok.Data;
import java.util.List;

@Data
public class LehrerStatistikDto {
    private String monat;
    private List<FachStatistikDto> fachStatistik;
}
