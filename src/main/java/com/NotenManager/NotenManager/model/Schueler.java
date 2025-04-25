package com.NotenManager.NotenManager.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Schueler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vorname;
    private String nachname;

    @ManyToOne
    @JoinColumn(name = "lehrer_id")
    private Lehrer lehrer;
}
