package com.NotenManager.NotenManager.service;

import com.NotenManager.NotenManager.dto.AuthRequest;
import com.NotenManager.NotenManager.dto.AuthResponse;
import com.NotenManager.NotenManager.dto.DashboardDto;
import com.NotenManager.NotenManager.dto.RegisterRequest;
import com.NotenManager.NotenManager.model.Lehrer;
import com.NotenManager.NotenManager.repository.BewertungseintragRepository;
import com.NotenManager.NotenManager.repository.LehrerRepository;
import com.NotenManager.NotenManager.repository.SchuelerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final LehrerRepository lehrerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final SchuelerRepository schuelerRepository;
    private final BewertungseintragRepository bewertungseintragRepository;

    public String register(RegisterRequest request) {
        if (lehrerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("E-Mail bereits registriert.");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        Lehrer lehrer = Lehrer.builder()
                .vorname(request.getVorname())
                .nachname(request.getNachname())
                .email(request.getEmail())
                .password(encodedPassword) // jetzt sicher verschlüsselt!
                .build();

        lehrerRepository.save(lehrer);

        return "Registrierung erfolgreich";
    }

    public AuthResponse login(AuthRequest request) {
        Lehrer lehrer = lehrerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        if (lehrer.getPassword() == null || lehrer.getPassword().isBlank()) {
            throw new RuntimeException("Benutzer hat kein gültiges Passwort gespeichert");
        }

        if (!passwordEncoder.matches(request.getPassword(), lehrer.getPassword())) {
            throw new RuntimeException("Ungültige Anmeldedaten");
        }

        String token = jwtService.generateToken(lehrer.getEmail());
        return new AuthResponse(token);
    }

    public DashboardDto getDashboardInfo(String email) {
        Lehrer lehrer = lehrerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Lehrer nicht gefunden"));

        int schuelerCount = schuelerRepository.countByLehrer(lehrer);
        int bewertungenHeute = (int) bewertungseintragRepository.countByLehrerAndDatum(lehrer, LocalDate.now());

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
