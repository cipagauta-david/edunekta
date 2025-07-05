package com.sena.dev.services;

import com.sena.dev.entities.Institucion;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class InstitucionFacade implements InstitucionFacadeLocal {

    @PersistenceContext(unitName = "devPU")
    private EntityManager em;

    public void create(Institucion entity) {
        em.persist(entity);
    }

    public void edit(Institucion entity) {
        em.merge(entity);
    }

    public void remove(Institucion entity) {
        em.remove(em.merge(entity));
    }

    public Institucion find(Object id) {
        return em.find(Institucion.class, id);
    }

    public List<Institucion> findAll() {
        return em.createNamedQuery("Institucion.findAll", Institucion.class).getResultList();
    }
}
