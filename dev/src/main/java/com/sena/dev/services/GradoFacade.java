package com.sena.dev.services;

import com.sena.dev.entities.Grado;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class GradoFacade implements GradoFacadeLocal {

    @PersistenceContext(unitName = "devPU")
    private EntityManager em;

    public void create(Grado entity) {
        em.persist(entity);
    }

    public void edit(Grado entity) {
        em.merge(entity);
    }

    public void remove(Grado entity) {
        em.remove(em.merge(entity));
    }

    public Grado find(Object id) {
        return em.find(Grado.class, id);
    }

    public List<Grado> findAll() {
        return em.createNamedQuery("Grado.findAll", Grado.class).getResultList();
    }
}
