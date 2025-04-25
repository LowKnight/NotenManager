package com.NotenManager.NotenManager.repository;

import com.NotenManager.NotenManager.model.Lehrer;
import com.NotenManager.NotenManager.model.Schueler;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchuelerRepository extends JpaRepository<Schueler, Long> {
    int countByLehrer(Lehrer lehrer);
    List<Schueler> findAllByLehrer(Lehrer lehrer);
}