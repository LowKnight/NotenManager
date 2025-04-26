package com.NotenManager.NotenManager.service;

import com.NotenManager.NotenManager.dto.DashboardDto;
import com.NotenManager.NotenManager.model.Lehrer;
import com.NotenManager.NotenManager.repository.BewertungseintragRepository;
import com.NotenManager.NotenManager.repository.LehrerRepository;
import com.NotenManager.NotenManager.repository.SchuelerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final LehrerRepository lehrerRepository;
    private final SchuelerRepository schuelerRepository;
    private final BewertungseintragRepository bewertungseintragRepository;

    public DashboardDto getDashboardInfo(String email) {
        Lehrer lehrer = lehrerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Lehrer nicht gefunden"));

        int schuelerCount = schuelerRepository.countByLehrer(lehrer);
        int bewertungenHeute = Math.toIntExact(bewertungseintragRepository.countByLehrerAndDatum(lehrer, LocalDate.now()));

        return new DashboardDto(
                lehrer.getVorname(),
                lehrer.getNachname(),
                lehrer.getEmail(),
                LocalDate.now().toString(),
                schuelerCount,
                bewertungenHeute
        );
    }
}
