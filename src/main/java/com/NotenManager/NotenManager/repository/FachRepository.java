package com.NotenManager.NotenManager.repository;

import com.NotenManager.NotenManager.model.Fach;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FachRepository extends JpaRepository<Fach, Long> {
    Optional<Fach> findByName(String name);
}
