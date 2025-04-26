package com.NotenManager.NotenManager.repository;

import com.NotenManager.NotenManager.model.Lehrer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LehrerRepository extends JpaRepository<Lehrer, Long> {
    boolean existsByEmail(String email);
    Optional<Lehrer> findByEmail(String email);


}
