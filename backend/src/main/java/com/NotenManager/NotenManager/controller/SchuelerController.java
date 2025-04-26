package com.NotenManager.NotenManager.controller;

import com.NotenManager.NotenManager.dto.SchuelerCreateRequest;
import com.NotenManager.NotenManager.dto.SchuelerDto;
import com.NotenManager.NotenManager.service.SchuelerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lehrer/schueler")
@RequiredArgsConstructor
public class SchuelerController {

    private final SchuelerService schuelerService;

    @GetMapping
    public ResponseEntity<List<SchuelerDto>> alleSchueler(Authentication authentication) {
        return ResponseEntity.ok(schuelerService.getAlleSchueler(authentication));
    }

    @PostMapping
    public ResponseEntity<SchuelerDto> schuelerAnlegen(@RequestBody SchuelerCreateRequest request, Authentication authentication) {
        return ResponseEntity.ok(schuelerService.neuenSchuelerAnlegen(request, authentication));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SchuelerDto> schuelerAktualisieren(@PathVariable Long id, @RequestBody SchuelerCreateRequest request, Authentication authentication) {
        return ResponseEntity.ok(schuelerService.aktualisieren(id, request, authentication));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> schuelerLoeschen(@PathVariable Long id, Authentication authentication) {
        schuelerService.loeschen(id, authentication);
        return ResponseEntity.noContent().build();
    }
}
