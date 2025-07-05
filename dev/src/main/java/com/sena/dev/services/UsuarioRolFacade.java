package com.sena.dev.services;

import com.sena.dev.entities.UsuarioRol;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class UsuarioRolFacade implements UsuarioRolFacadeLocal {

    @PersistenceContext(unitName = "devPU")
    private EntityManager em;

    public void create(UsuarioRol entity) {
        em.persist(entity);
    }

    public void edit(UsuarioRol entity) {
        em.merge(entity);
    }

    public void remove(UsuarioRol entity) {
        em.remove(em.merge(entity));
    }

    public UsuarioRol find(Object id) {
        return em.find(UsuarioRol.class, id);
    }

    public List<UsuarioRol> findAll() {
        return em.createNamedQuery("UsuarioRol.findAll", UsuarioRol.class).getResultList();
    }
}
