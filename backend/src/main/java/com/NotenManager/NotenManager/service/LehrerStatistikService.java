package com.NotenManager.NotenManager.service;

import com.NotenManager.NotenManager.dto.FachStatistikDto;
import com.NotenManager.NotenManager.dto.LehrerStatistikDto;
import com.NotenManager.NotenManager.model.Bewertungseintrag;
import com.NotenManager.NotenManager.model.Lehrer;
import com.NotenManager.NotenManager.model.Schueler;
import com.NotenManager.NotenManager.repository.BewertungseintragRepository;
import com.NotenManager.NotenManager.repository.LehrerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LehrerStatistikService {

    private final BewertungseintragRepository bewertungRepository;
    private final LehrerRepository lehrerRepository;

    public LehrerStatistikDto getStatistik(Authentication auth, String monat) {
        Lehrer lehrer = lehrerRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Lehrer nicht gefunden"));

        YearMonth ym = YearMonth.parse(monat); // Format: yyyy-MM
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();

        List<Bewertungseintrag> eintraege = bewertungRepository.findAllByLehrerAndDatumBetween(lehrer, start, end);

        Map<String, List<Bewertungseintrag>> gruppiertNachFach = eintraege.stream()
                .collect(Collectors.groupingBy(e -> e.getFach().getName()));

        List<FachStatistikDto> statistikList = new ArrayList<>();

        for (Map.Entry<String, List<Bewertungseintrag>> entry : gruppiertNachFach.entrySet()) {
            String fach = entry.getKey();
            List<Bewertungseintrag> fachEintraege = entry.getValue();

            double avg = fachEintraege.stream().mapToInt(Bewertungseintrag::getNote).average().orElse(0.0);

            Map<Integer, Integer> verteilung = new HashMap<>();
            for (int i = 1; i <= 5; i++) verteilung.put(i, 0);
            for (Bewertungseintrag b : fachEintraege) {
                verteilung.computeIfPresent(b.getNote(), (k, v) -> v + 1);
            }

            FachStatistikDto dto = new FachStatistikDto();
            dto.setFach(fach);
            dto.setDurchschnitt(avg);
            dto.setNotenverteilung(verteilung);

            statistikList.add(dto);
        }

        LehrerStatistikDto result = new LehrerStatistikDto();
        result.setMonat(monat);
        result.setFachStatistik(statistikList);
        return result;
    }
}
