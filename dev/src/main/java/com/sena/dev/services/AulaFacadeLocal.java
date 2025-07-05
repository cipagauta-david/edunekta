package com.sena.dev.services;

import com.sena.dev.entities.Aula;
import java.util.List;
import javax.ejb.Local;

@Local
public interface AulaFacadeLocal {
    void create(Aula entity);
    void edit(Aula entity);
    void remove(Aula entity);
    Aula find(Object id);
    List<Aula> findAll();
}
