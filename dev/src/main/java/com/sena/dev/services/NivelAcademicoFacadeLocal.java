package com.sena.dev.services;

import com.sena.dev.entities.NivelAcademico;
import java.util.List;
import javax.ejb.Local;

@Local
public interface NivelAcademicoFacadeLocal {
    void create(NivelAcademico entity);
    void edit(NivelAcademico entity);
    void remove(NivelAcademico entity);
    NivelAcademico find(Object id);
    List<NivelAcademico> findAll();
}
