package com.NotenManager.NotenManager.controller;

import com.NotenManager.NotenManager.dto.DashboardDto;
import com.NotenManager.NotenManager.model.Lehrer;
import com.NotenManager.NotenManager.security.LehrerPrincipal;
import com.NotenManager.NotenManager.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lehrer")
@RequiredArgsConstructor
public class LehrerController {

    private final DashboardService dashboardService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDto> getDashboardInfo(Authentication authentication) {
        LehrerPrincipal principal = (LehrerPrincipal) authentication.getPrincipal();
        Lehrer lehrer = principal.getLehrer();

        return ResponseEntity.ok(dashboardService.getDashboardInfo(lehrer.getEmail()));
    }

}
