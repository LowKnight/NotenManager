package com.NotenManager.NotenManager.controller;

import com.NotenManager.NotenManager.dto.LehrerStatistikDto;
import com.NotenManager.NotenManager.service.LehrerStatistikService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lehrer/statistik")
@RequiredArgsConstructor
public class LehrerStatistikController {

    private final LehrerStatistikService statistikService;

    @GetMapping
    public ResponseEntity<LehrerStatistikDto> statistikAbrufen(
            @RequestParam String monat,
            Authentication authentication
    ) {
        return ResponseEntity.ok(statistikService.getStatistik(authentication, monat));
    }
}
