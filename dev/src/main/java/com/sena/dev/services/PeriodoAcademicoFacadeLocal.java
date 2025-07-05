package com.sena.dev.services;

import com.sena.dev.entities.PeriodoAcademico;
import java.util.List;
import javax.ejb.Local;

@Local
public interface PeriodoAcademicoFacadeLocal {
    void create(PeriodoAcademico entity);
    void edit(PeriodoAcademico entity);
    void remove(PeriodoAcademico entity);
    PeriodoAcademico find(Object id);
    List<PeriodoAcademico> findAll();
}
