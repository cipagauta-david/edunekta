package com.sena.dev.services;

import com.sena.dev.entities.Grado;
import java.util.List;
import javax.ejb.Local;

@Local
public interface GradoFacadeLocal {
    void create(Grado entity);
    void edit(Grado entity);
    void remove(Grado entity);
    Grado find(Object id);
    List<Grado> findAll();
}
