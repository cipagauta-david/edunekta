package com.edunekta.dev.controller;

import com.edunekta.dev.dto.MenuItemDTO;
import com.edunekta.dev.entity.Usuario;
import com.edunekta.dev.repository.UsuarioRepository;
import com.edunekta.dev.service.NavigationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.Collections;
import java.util.List;

@ControllerAdvice // Se aplica a todos los @Controller
@RequiredArgsConstructor
public class GlobalControllerAdvice {

    private final NavigationService navigationService;
    private final UsuarioRepository usuarioRepository;

    /**
     * Este método se ejecuta antes de CUALQUIER método de controlador.
     * Su valor de retorno se añade al Model con el nombre "menuItems".
     * Reemplaza la necesidad de un bean de sesión para el menú.
     */
    @ModelAttribute("menuItems")
    public List<MenuItemDTO> populateMenuItems() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()
                && !"anonymousUser".equals(authentication.getPrincipal())) {
            return navigationService.getMenuItems(authentication);
        }
        return Collections.emptyList(); // Menú vacío para usuarios no autenticados
    }

    /**
     * Añade el objeto de autenticación completo al modelo.
     * Esto permite a Thymeleaf acceder al nombre de usuario, roles, etc.
     * Reemplaza getUserDisplayName() y getUserPrimaryRole().
     */
    @ModelAttribute("authentication")
    public Authentication populateAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    /**
     * Añade la entidad del usuario actual al modelo para un acceso fácil en las
     * vistas.
     * Reemplaza todas las llamadas a #{login.nombreCompleto},
     * #{login.emailUsuario}, etc.
     */
    @ModelAttribute("currentUser")
    public Usuario populateCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName().toString();
            printAuthenticationDetails();
            return usuarioRepository.findByEmail(email).orElse(null);
        }
        System.out.println(authentication.getName());
        return null;
    }

    public void printAuthenticationDetails() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authenticated: " + auth.isAuthenticated());
        System.out.println("Principal: " + auth.getPrincipal());
        System.out.println("Name: " + auth.getClass());
    }
}