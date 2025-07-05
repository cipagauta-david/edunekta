package com.sena.dev.services;

import com.sena.dev.entities.Usuario;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class UsuarioFacade implements UsuarioFacadeLocal {

  @PersistenceContext(unitName = "devPU")
  private EntityManager em;

  public void create(Usuario entity) {
    em.persist(entity);
  }

  public void edit(Usuario entity) {
    em.merge(entity);
  }

  public void remove(Usuario entity) {
    em.remove(em.merge(entity));
  }

  public Usuario find(Object id) {
    return em.find(Usuario.class, id);
  }

  public List<Usuario> findAll() {
    return em.createNamedQuery("Usuario.findAll", Usuario.class).getResultList();
  }

  @Override
  public Usuario iniciarSesion(String email, String password) {
      
        System.out.println(email+password);
    try {
      return em.createNamedQuery("Usuario.iniciarSesion", Usuario.class)
          .setParameter("email", email)
          .setParameter("password", password)
          .getSingleResult();
    } catch (Exception e) {
        
        System.out.println("exeption");
      return null; // Si no se encuentra el usuario, se retorna null
    }
  }
}
