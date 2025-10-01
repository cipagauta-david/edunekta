package com.edunekta.dev.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserProfileController {

    /**
     * Muestra la página de perfil del usuario.
     * Solo los usuarios autenticados pueden acceder.
     * No necesita añadir nada al modelo, ya que GlobalControllerAdvice se encarga de ello.
     */
    @GetMapping("/perfil")
    @PreAuthorize("isAuthenticated()") // Asegura que solo usuarios logueados puedan verla
    public String userProfilePage() {
    return "usuarios/perfil"; // Devuelve el nombre de la plantilla: usuarios/perfil.html
    }
}