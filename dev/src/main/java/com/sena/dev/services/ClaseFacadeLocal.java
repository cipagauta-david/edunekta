package com.sena.dev.services;

import com.sena.dev.entities.Clase;
import java.util.List;
import javax.ejb.Local;

@Local
public interface ClaseFacadeLocal {
    void create(Clase entity);
    void edit(Clase entity);
    void remove(Clase entity);
    Clase find(Object id);
    List<Clase> findAll();
}
