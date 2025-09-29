package com.edunekta.dev.service;

import com.edunekta.dev.entity.Rol;
import com.edunekta.dev.entity.Usuario;
import com.edunekta.dev.entity.UsuarioRol;
import com.edunekta.dev.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(username) // Asumiendo que el login es por correo
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con correo: " + username));

        return new User(
                usuario.getEmail(),
                usuario.getPassword(),
                true, // enabled
                true, // accountNonExpired
                true, // credentialsNonExpired
                true, // accountNonLocked
                getAuthorities(usuario) // Los permisos del usuario
        );
    }

    /**
     * Reemplaza la lógica de SecurityUtil.getUserPermissions.
     * Convierte los Roles y Permisos de la entidad en GrantedAuthority de Spring
     * Security.
     */
    private Collection<? extends GrantedAuthority> getAuthorities(Usuario usuario) {
        Set<GrantedAuthority> authorities = new HashSet<>();

        // Agregar roles como autoridades, con el prefijo "ROLE_" por convención
        if (usuario.getUsuarioRolCollection() != null) {
            for (UsuarioRol usuarioRol : usuario.getUsuarioRolCollection()) {
                Rol rol = usuarioRol.getRolIdRol();
                if (rol != null && rol.getEstado().equalsIgnoreCase("ACTIVO")) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + rol.getNombreRol()));

                    // Agregar permisos asociados al rol
                    if (rol.getRolPermisoCollection() != null) {
                        rol.getRolPermisoCollection().stream()
                                .map(rolPermiso -> rolPermiso.getPermisoIdPermiso())
                                .filter(permiso -> permiso != null && permiso.getEstado().equalsIgnoreCase("ACTIVO"))
                                .forEach(permiso -> {
                                    // Creamos autoridades específicas por módulo y acción
                                    // Ej: PERM_USUARIOS_CREATE, PERM_NIVELES_ACADEMICOS_READ
                                    String authorityString = "PERM_" + permiso.getModulo() + "_" + permiso.getAccion();
                                    authorities.add(new SimpleGrantedAuthority(authorityString.toUpperCase()));
                                });
                    }
                }
            }
        }
        return authorities;
    }
}