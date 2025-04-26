package com.NotenManager.NotenManager.repository;

import com.NotenManager.NotenManager.model.Bewertungseintrag;
import com.NotenManager.NotenManager.model.Lehrer;
import com.NotenManager.NotenManager.model.Schueler;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BewertungseintragRepository extends JpaRepository<Bewertungseintrag, Long> {

    List<Bewertungseintrag> findAllBySchuelerId(Long schuelerId);

    List<Bewertungseintrag> findAllByLehrerAndDatumBetween(Lehrer lehrer, LocalDate start, LocalDate end);

    long countByLehrerAndDatum(Lehrer lehrer, LocalDate datum);

    List<Bewertungseintrag> findAllBySchuelerAndDatumBetween(Schueler schueler, LocalDate start, LocalDate end);
}
