package com.sena.dev.services;

import com.sena.dev.entities.UsuarioRol;
import java.util.List;
import javax.ejb.Local;

@Local
public interface UsuarioRolFacadeLocal {
    void create(UsuarioRol entity);
    void edit(UsuarioRol entity);
    void remove(UsuarioRol entity);
    UsuarioRol find(Object id);
    List<UsuarioRol> findAll();
}
