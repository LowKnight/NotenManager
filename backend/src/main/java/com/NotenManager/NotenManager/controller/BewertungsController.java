package com.NotenManager.NotenManager.controller;

import com.NotenManager.NotenManager.dto.BewertungDto;
import com.NotenManager.NotenManager.dto.BewertungRequest;
import com.NotenManager.NotenManager.dto.MonatsauswertungDto;
import com.NotenManager.NotenManager.service.BewertungsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lehrer/bewertung")
@RequiredArgsConstructor
public class BewertungsController {

    private final BewertungsService service;

    @PostMapping
    public ResponseEntity<Void> bewertungEintragen(@RequestBody BewertungRequest request, Authentication authentication) {
        service.eintragSpeichern(request, authentication);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<BewertungDto>> getBewertungen(
            @RequestParam Long schuelerId,
            @RequestParam String monat // Format: yyyy-MM
    ) {
        return ResponseEntity.ok(service.getMonatsbewertung(schuelerId, monat));
    }

    @GetMapping("/auswertung")
    public ResponseEntity<MonatsauswertungDto> getAuswertung(
            @RequestParam Long schuelerId,
            @RequestParam String monat
    ) {
        return ResponseEntity.ok(service.getMonatsauswertung(schuelerId, monat));
    }

}
