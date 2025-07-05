package com.sena.dev.services;

import com.sena.dev.entities.Rol;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class RolFacade implements RolFacadeLocal {

    @PersistenceContext(unitName = "devPU")
    private EntityManager em;

    public void create(Rol entity) {
        em.persist(entity);
    }

    public void edit(Rol entity) {
        em.merge(entity);
    }

    public void remove(Rol entity) {
        em.remove(em.merge(entity));
    }

    public Rol find(Object id) {
        return em.find(Rol.class, id);
    }

    public List<Rol> findAll() {
        return em.createNamedQuery("Rol.findAll", Rol.class).getResultList();
    }
}
