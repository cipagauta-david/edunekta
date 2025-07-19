package com.sena.dev.services;

import com.sena.dev.entities.Usuario;
import com.sena.dev.utils.PasswordUtil;
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
    try {
      // First find user by email only (faster query)
      Usuario usuario = em.createNamedQuery("Usuario.findByEmail", Usuario.class)
          .setParameter("email", email)
          .getSingleResult();
      
      // Then verify password using BCrypt
      if (usuario != null && PasswordUtil.verifyPassword(password, usuario.getPassword())) {
        return usuario;
      }
      return null;
    } catch (Exception e) {
      return null; // Si no se encuentra el usuario, se retorna null
    }
  }
  
  /**
   * Create a new user with hashed password
   */
  public void createWithHashedPassword(Usuario usuario, String plainPassword) {
    try {
      if (usuario == null) {
        throw new IllegalArgumentException("Usuario cannot be null");
      }
      if (plainPassword == null || plainPassword.trim().isEmpty()) {
        throw new IllegalArgumentException("Password cannot be null or empty");
      }
      
      // Log the creation attempt
      System.out.println("Creating user with email: " + usuario.getEmail());
      System.out.println("User data before hashing: " + usuario.toString());
      
      // Hash the password
      String hashedPassword = PasswordUtil.hashPassword(plainPassword);
      usuario.setPassword(hashedPassword);
      
      // Log the user data after hashing
      System.out.println("User data after hashing: " + usuario.toString());
      
      // Persist the user
      em.persist(usuario);
      
      // Flush to ensure the data is written to the database
      em.flush();
      
      System.out.println("User created successfully with ID: " + usuario.getIdUsuario());
    } catch (Exception e) {
      System.err.println("Error creating user: " + e.getMessage());
      e.printStackTrace();
      throw e;
    }
  }
  
  /**
   * Update user password with hashing
   */
  public void updatePassword(Integer userId, String newPlainPassword) {
    try {
      Usuario usuario = find(userId);
      if (usuario != null) {
        usuario.setPassword(PasswordUtil.hashPassword(newPlainPassword));
        em.merge(usuario);
          System.out.println("actualizada contraseña");
      }
    } catch (Exception e) {
      // Log error silently
    }
  }
  
  /**
   * Find user by ID with roles and permissions loaded
   */
  public Usuario findWithRoles(Object id) {
    try {
      Usuario usuario = em.createNamedQuery("Usuario.findByIdUsuarioWithRoles", Usuario.class)
          .setParameter("idUsuario", id)
          .getSingleResult();
      
      return usuario;
    } catch (Exception e) {
      return null;
    }
  }
}
