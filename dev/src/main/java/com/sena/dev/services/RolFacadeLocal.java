package com.sena.dev.services;

import com.sena.dev.entities.Rol;
import java.util.List;
import javax.ejb.Local;

@Local
public interface RolFacadeLocal {
    void create(Rol entity);
    void edit(Rol entity);
    void remove(Rol entity);
    Rol find(Object id);
    List<Rol> findAll();
}
