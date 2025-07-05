package com.sena.dev.services;

import com.sena.dev.entities.PeriodoAcademico;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class PeriodoAcademicoFacade implements PeriodoAcademicoFacadeLocal {

    @PersistenceContext(unitName = "devPU")
    private EntityManager em;

    public void create(PeriodoAcademico entity) {
        em.persist(entity);
    }

    public void edit(PeriodoAcademico entity) {
        em.merge(entity);
    }

    public void remove(PeriodoAcademico entity) {
        em.remove(em.merge(entity));
    }

    public PeriodoAcademico find(Object id) {
        return em.find(PeriodoAcademico.class, id);
    }

    public List<PeriodoAcademico> findAll() {
        return em.createNamedQuery("PeriodoAcademico.findAll", PeriodoAcademico.class).getResultList();
    }
}
