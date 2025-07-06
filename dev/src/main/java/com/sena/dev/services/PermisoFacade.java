package com.sena.dev.services;

import com.sena.dev.entities.Permiso;
import com.sena.dev.entities.RolPermiso;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class PermisoFacade implements PermisoFacadeLocal {

    @PersistenceContext(unitName = "devPU")
    private EntityManager em;

    @Override
    public void create(Permiso entity) {
        em.persist(entity);
    }

    @Override
    public void edit(Permiso entity) {
        em.merge(entity);
    }

    @Override
    public void remove(Permiso entity) {
        em.remove(em.merge(entity));
    }

    @Override
    public Permiso find(Object id) {
        return em.find(Permiso.class, id);
    }

    @Override
    public List<Permiso> findAll() {
        return em.createNamedQuery("Permiso.findAll", Permiso.class).getResultList();
    }

    @Override
    public List<Permiso> findByModulo(String modulo) {
        return em.createNamedQuery("Permiso.findByModulo", Permiso.class)
                .setParameter("modulo", modulo)
                .getResultList();
    }

    @Override
    public List<Permiso> findByEstado(String estado) {
        return em.createNamedQuery("Permiso.findByEstado", Permiso.class)
                .setParameter("estado", estado)
                .getResultList();
    }

    @Override
    public List<Permiso> findByRol(Integer rolId) {
        return em.createQuery("SELECT rp.permisoIdPermiso FROM RolPermiso rp WHERE rp.rolIdRol.idRol = :rolId", Permiso.class)
                .setParameter("rolId", rolId)
                .getResultList();
    }
} 