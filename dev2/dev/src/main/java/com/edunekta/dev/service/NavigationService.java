package com.edunekta.dev.service;

import com.edunekta.dev.dto.MenuItemDTO;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class NavigationService {

    /**
     * Construye la lista de elementos del menú para el usuario autenticado.
     * Es sin estado: se llama en cada petición.
     * @param authentication El objeto de autenticación de Spring Security.
     * @return Una lista de MenuItemDTO.
     */
    public List<MenuItemDTO> getMenuItems(Authentication authentication) {
        List<MenuItemDTO> items = new ArrayList<>();
        
        // Obtener todos los permisos del usuario de una vez.
        Set<String> authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        // Dashboard - siempre disponible para usuarios autenticados
        items.add(new MenuItemDTO("Dashboard", "/welcome", "fas fa-tachometer-alt"));

        // Comprobaciones basadas en permisos de Spring Security
        // ¡Mucho más robusto y desacoplado que llamar a SecurityUtil!
        if (hasAnyAuthority(authorities, "PERM_USUARIOS_READ")) {
            items.add(new MenuItemDTO("Usuarios", "/usuarios", "fas fa-users"));
        }
        if (hasAnyAuthority(authorities, "ROLE_ADMIN")) {
            items.add(new MenuItemDTO("Roles", "/roles", "fas fa-user-tag"));
            items.add(new MenuItemDTO("Permisos", "/permisos", "fas fa-key"));
        }
        if (hasAnyAuthority(authorities, "PERM_NIVELES_ACADEMICOS_READ")) {
            items.add(new MenuItemDTO("Niveles Académicos", "/niveles-academicos", "fas fa-graduation-cap"));
        }
        // ... y así sucesivamente para los demás módulos ...
        // if (hasAnyAuthority(authorities, "PERM_INSTITUCIONES_READ")) { ... }

        return items;
    }

    /**
     * Helper para verificar si el usuario tiene al menos uno de los permisos dados.
     */
    private boolean hasAnyAuthority(Set<String> userAuthorities, String... requiredAuthorities) {
        for (String required : requiredAuthorities) {
            if (userAuthorities.contains(required)) {
                return true;
            }
        }
        return false;
    }
}