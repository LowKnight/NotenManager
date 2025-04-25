package com.NotenManager.NotenManager.service;

import com.NotenManager.NotenManager.dto.SchuelerCreateRequest;
import com.NotenManager.NotenManager.dto.SchuelerDto;
import com.NotenManager.NotenManager.model.Lehrer;
import com.NotenManager.NotenManager.model.Schueler;
import com.NotenManager.NotenManager.repository.LehrerRepository;
import com.NotenManager.NotenManager.repository.SchuelerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SchuelerService {

    private final SchuelerRepository schuelerRepository;
    private final LehrerRepository lehrerRepository;

    private Lehrer getAktuellerLehrer(Authentication auth) {
        return lehrerRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Lehrer nicht gefunden"));
    }

    public List<SchuelerDto> getAlleSchueler(Authentication auth) {
        Lehrer lehrer = getAktuellerLehrer(auth);
        return schuelerRepository.findAllByLehrer(lehrer).stream().map(s -> {
            SchuelerDto dto = new SchuelerDto();
            dto.setId(s.getId());
            dto.setVorname(s.getVorname());
            dto.setNachname(s.getNachname());
            return dto;
        }).collect(Collectors.toList());
    }

    public SchuelerDto neuenSchuelerAnlegen(SchuelerCreateRequest request, Authentication auth) {
        Lehrer lehrer = getAktuellerLehrer(auth);
        Schueler s = Schueler.builder()
                .vorname(request.getVorname())
                .nachname(request.getNachname())
                .lehrer(lehrer)
                .build();
        schuelerRepository.save(s);
        SchuelerDto dto = new SchuelerDto();
        dto.setId(s.getId());
        dto.setVorname(s.getVorname());
        dto.setNachname(s.getNachname());
        return dto;
    }

    public SchuelerDto aktualisieren(Long id, SchuelerCreateRequest request, Authentication auth) {
        Schueler s = schuelerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schüler nicht gefunden"));
        if (!s.getLehrer().getEmail().equals(auth.getName()))
            throw new RuntimeException("Zugriff verweigert");

        s.setVorname(request.getVorname());
        s.setNachname(request.getNachname());
        schuelerRepository.save(s);

        SchuelerDto dto = new SchuelerDto();
        dto.setId(s.getId());
        dto.setVorname(s.getVorname());
        dto.setNachname(s.getNachname());
        return dto;
    }

    public void loeschen(Long id, Authentication auth) {
        Schueler s = schuelerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schüler nicht gefunden"));
        if (!s.getLehrer().getEmail().equals(auth.getName()))
            throw new RuntimeException("Zugriff verweigert");
        schuelerRepository.delete(s);
    }
}
