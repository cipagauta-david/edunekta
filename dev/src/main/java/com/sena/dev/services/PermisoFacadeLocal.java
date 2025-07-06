package com.sena.dev.services;

import com.sena.dev.entities.Permiso;
import java.util.List;
import javax.ejb.Local;

@Local
public interface PermisoFacadeLocal {
    void create(Permiso entity);
    void edit(Permiso entity);
    void remove(Permiso entity);
    Permiso find(Object id);
    List<Permiso> findAll();
    
    // Custom queries
    List<Permiso> findByModulo(String modulo);
    List<Permiso> findByEstado(String estado);
    List<Permiso> findByRol(Integer rolId);
} 