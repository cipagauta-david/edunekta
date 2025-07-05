package com.sena.dev.services;

import com.sena.dev.entities.Grupo;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class GrupoFacade implements GrupoFacadeLocal {

    @PersistenceContext(unitName = "devPU")
    private EntityManager em;

    public void create(Grupo entity) {
        em.persist(entity);
    }

    public void edit(Grupo entity) {
        em.merge(entity);
    }

    public void remove(Grupo entity) {
        em.remove(em.merge(entity));
    }

    public Grupo find(Object id) {
        return em.find(Grupo.class, id);
    }

    public List<Grupo> findAll() {
        return em.createNamedQuery("Grupo.findAll", Grupo.class).getResultList();
    }
}
