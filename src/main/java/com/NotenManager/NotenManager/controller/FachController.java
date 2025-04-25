package com.NotenManager.NotenManager.controller;

import com.NotenManager.NotenManager.model.Fach;
import com.NotenManager.NotenManager.repository.FachRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lehrer/faecher")
@RequiredArgsConstructor
public class FachController {

    private final FachRepository fachRepository;

    @GetMapping
    public ResponseEntity<List<Fach>> alleFaecher() {
        return ResponseEntity.ok(fachRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Fach> neuesFach(@RequestBody Fach fach) {
        if (fach.getName() == null || fach.getName().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(fachRepository.save(fach));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> fachLoeschen(@PathVariable Long id) {
        if (!fachRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        fachRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
