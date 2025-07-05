package com.sena.dev.services;

import com.sena.dev.entities.NivelAcademico;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class NivelAcademicoFacade implements NivelAcademicoFacadeLocal {

    @PersistenceContext(unitName = "devPU")
    private EntityManager em;

    public void create(NivelAcademico entity) {
        em.persist(entity);
    }

    public void edit(NivelAcademico entity) {
        em.merge(entity);
    }

    public void remove(NivelAcademico entity) {
        em.remove(em.merge(entity));
    }

    public NivelAcademico find(Object id) {
        return em.find(NivelAcademico.class, id);
    }

    public List<NivelAcademico> findAll() {
        List<NivelAcademico> a;

        a = em.createNamedQuery("NivelAcademico.findAll", NivelAcademico.class).getResultList();

        System.out.println(a);
        return a;
    }
}
