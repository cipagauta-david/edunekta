package com.sena.dev.services;

import com.sena.dev.entities.Aula;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class AulaFacade implements AulaFacadeLocal {

    @PersistenceContext(unitName = "devPU")
    private EntityManager em;

    public void create(Aula entity) {
        em.persist(entity);
    }

    public void edit(Aula entity) {
        em.merge(entity);
    }

    public void remove(Aula entity) {
        em.remove(em.merge(entity));
    }

    public Aula find(Object id) {
        return em.find(Aula.class, id);
    }

    public List<Aula> findAll() {
        return em.createQuery("SELECT a FROM Aula a", Aula.class).getResultList();
    }
}
