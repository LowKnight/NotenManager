package com.NotenManager.NotenManager.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bewertungseintrag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate datum;

    private int note; // 1 = sehr gut, ... 5 = nicht genügend

    @Column(length = 500)
    private String kommentar;

    @ManyToOne
    @JoinColumn(name = "schueler_id")
    private Schueler schueler;

    @ManyToOne
    @JoinColumn(name = "lehrer_id")
    private Lehrer lehrer;

    @ManyToOne
    @JoinColumn(name = "fach_id")
    private Fach fach;
}
