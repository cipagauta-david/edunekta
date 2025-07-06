package com.sena.dev.services;

import com.sena.dev.entities.RolPermiso;
import java.util.List;
import javax.ejb.Local;

@Local
public interface RolPermisoFacadeLocal {
    void create(RolPermiso entity);
    void edit(RolPermiso entity);
    void remove(RolPermiso entity);
    RolPermiso find(Object id);
    List<RolPermiso> findAll();
    
    // Custom queries
    List<RolPermiso> findByRol(Integer rolId);
    List<RolPermiso> findByPermiso(Integer permisoId);
    RolPermiso findByRolAndPermiso(Integer rolId, Integer permisoId);
} 