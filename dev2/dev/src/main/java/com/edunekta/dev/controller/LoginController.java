package com.edunekta.dev.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

  /**
   * Simplemente muestra la página de login.
   * Esta es la ÚNICA responsabilidad de este controlador.
   */
  @GetMapping("/login")
  public String loginPage() {
    return "login"; // Devuelve el nombre de la plantilla Thymeleaf: login.html
  }

  /**
   * Muestra la página de bienvenida después de un login exitoso.
   */
  @GetMapping("/welcome")
  public String welcomePage() {
    return "welcome"; // Devuelve la plantilla welcome.html
  }
}