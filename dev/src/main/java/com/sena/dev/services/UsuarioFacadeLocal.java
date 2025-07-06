package com.sena.dev.services;

import com.sena.dev.entities.Usuario;
import java.util.List;
import javax.ejb.Local;

@Local
public interface UsuarioFacadeLocal {
    void create(Usuario entity);
    void edit(Usuario entity);
    void remove(Usuario entity);
    Usuario find(Object id);
    List<Usuario> findAll();

    Usuario iniciarSesion(String email, String password);
    
    // New methods for password management
    void createWithHashedPassword(Usuario usuario, String plainPassword);
    void updatePassword(Integer userId, String newPlainPassword);
    
    // Method to find user with roles and permissions
    Usuario findWithRoles(Object id);
}
