package com.sena.dev.services;

import com.sena.dev.entities.Institucion;
import java.util.List;
import javax.ejb.Local;

@Local
public interface InstitucionFacadeLocal {
    void create(Institucion entity);
    void edit(Institucion entity);
    void remove(Institucion entity);
    Institucion find(Object id);
    List<Institucion> findAll();
}
