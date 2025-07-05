package com.sena.dev.services;

import com.sena.dev.entities.Grupo;
import java.util.List;
import javax.ejb.Local;

@Local
public interface GrupoFacadeLocal {
    void create(Grupo entity);
    void edit(Grupo entity);
    void remove(Grupo entity);
    Grupo find(Object id);
    List<Grupo> findAll();
}
