package com.edunekta.dev.repository;

import com.edunekta.dev.entity.RolPermiso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolPermisoRepository extends JpaRepository<RolPermiso, Integer> {
}
