package com.sena.dev.services;

import com.sena.dev.entities.Clase;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class ClaseFacade implements ClaseFacadeLocal {

    @PersistenceContext(unitName = "devPU")
    private EntityManager em;

    public void create(Clase entity) {
        em.persist(entity);
    }

    public void edit(Clase entity) {
        em.merge(entity);
    }

    public void remove(Clase entity) {
        em.remove(em.merge(entity));
    }

    public Clase find(Object id) {
        return em.find(Clase.class, id);
    }

    public List<Clase> findAll() {
        return em.createNamedQuery("Clase.findAll", Clase.class).getResultList();
    }
}
