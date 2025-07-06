package com.sena.dev.services;

import com.sena.dev.entities.RolPermiso;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class RolPermisoFacade implements RolPermisoFacadeLocal {

    @PersistenceContext(unitName = "devPU")
    private EntityManager em;

    @Override
    public void create(RolPermiso entity) {
        em.persist(entity);
    }

    @Override
    public void edit(RolPermiso entity) {
        em.merge(entity);
    }

    @Override
    public void remove(RolPermiso entity) {
        em.remove(em.merge(entity));
    }

    @Override
    public RolPermiso find(Object id) {
        return em.find(RolPermiso.class, id);
    }

    @Override
    public List<RolPermiso> findAll() {
        return em.createNamedQuery("RolPermiso.findAll", RolPermiso.class).getResultList();
    }

    @Override
    public List<RolPermiso> findByRol(Integer rolId) {
        return em.createNamedQuery("RolPermiso.findByRol", RolPermiso.class)
                .setParameter("rolIdRol", rolId)
                .getResultList();
    }

    @Override
    public List<RolPermiso> findByPermiso(Integer permisoId) {
        return em.createNamedQuery("RolPermiso.findByPermiso", RolPermiso.class)
                .setParameter("permisoIdPermiso", permisoId)
                .getResultList();
    }

    @Override
    public RolPermiso findByRolAndPermiso(Integer rolId, Integer permisoId) {
        try {
            return em.createNamedQuery("RolPermiso.findByRolAndPermiso", RolPermiso.class)
                    .setParameter("rolIdRol", rolId)
                    .setParameter("permisoIdPermiso", permisoId)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }
} 