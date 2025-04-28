package com.NotenManager.NotenManager.service;

import com.NotenManager.NotenManager.dto.BewertungDto;
import com.NotenManager.NotenManager.dto.BewertungRequest;
import com.NotenManager.NotenManager.dto.MonatsauswertungDto;
import com.NotenManager.NotenManager.model.*;
import com.NotenManager.NotenManager.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BewertungsService {

    private final LehrerRepository lehrerRepository;
    private final SchuelerRepository schuelerRepository;
    private final FachRepository fachRepository;
    private final BewertungseintragRepository bewertungRepository;

    public void eintragSpeichern(BewertungRequest request, Authentication auth) {
        Lehrer lehrer = lehrerRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Lehrer nicht gefunden"));

        Schueler schueler = schuelerRepository.findById(request.getSchuelerId())
                .orElseThrow(() -> new RuntimeException("Schüler nicht gefunden"));

        Fach fach = fachRepository.findById(request.getFachId())
                .orElseThrow(() -> new RuntimeException("Fach nicht gefunden"));

        Bewertungseintrag eintrag = Bewertungseintrag.builder()
                .lehrer(lehrer)
                .schueler(schueler)
                .fach(fach)
                .datum(LocalDate.now())
                .note(request.getNote())
                .kommentar(request.getKommentar())
                .build();

        bewertungRepository.save(eintrag);
    }

    public List<BewertungDto> getMonatsbewertung(Long schuelerId, String monat) {
        Schueler schueler = schuelerRepository.findById(schuelerId)
                .orElseThrow(() -> new RuntimeException("Schüler nicht gefunden"));

        YearMonth ym = YearMonth.parse(monat); // Format: yyyy-MM
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();

        return bewertungRepository.findAllBySchuelerAndDatumBetween(schueler, start, end)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public MonatsauswertungDto getMonatsauswertung(Long schuelerId, String monat) {
        List<BewertungDto> eintraege = getMonatsbewertung(schuelerId, monat);

        double durchschnitt = eintraege.stream()
                .mapToInt(BewertungDto::getNote)
                .average()
                .orElse(0.0);

        int gerundet = (int) Math.round(durchschnitt);

        Schueler schueler = schuelerRepository.findById(schuelerId)
                .orElseThrow(() -> new RuntimeException("Schüler nicht gefunden"));

        MonatsauswertungDto dto = new MonatsauswertungDto();
        dto.setSchuelerName(schueler.getVorname() + " " + schueler.getNachname());
        dto.setMonat(monat);
        dto.setEintraege(eintraege);
        dto.setDurchschnitt(durchschnitt);
        dto.setGesamtnote(gerundet);

        return dto;
    }

    public List<BewertungDto> getAlleBewertungen(Long schuelerId) {
        return bewertungRepository.findAllBySchuelerId(schuelerId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private BewertungDto toDto(Bewertungseintrag eintrag) {
        BewertungDto dto = new BewertungDto();
        dto.setId(eintrag.getId());
        dto.setFach(eintrag.getFach().getName());
        dto.setNote(eintrag.getNote());
        dto.setKommentar(eintrag.getKommentar());
        dto.setDatum(eintrag.getDatum());
        return dto;
    }

    public void deleteBewertung(Long bewertungId) {
        bewertungRepository.deleteById(bewertungId);
    }

    public void mehrereEintraegeSpeichern(List<BewertungRequest> requests, Authentication authentication) {
        for (BewertungRequest request : requests) {
            eintragSpeichern(request, authentication);
        }
    }
}
