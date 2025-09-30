package com.edunekta.dev.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.edunekta.dev.service.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity // Activa la seguridad web de Spring
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
    private final CustomUserDetailsService customUserDetailsService = null;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Este es el reemplazo completo de Filtro.java.
     * Aquí definimos qué URLs están protegidas y qué permisos/roles se necesitan.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/api/data-upload/usuarios-csv"))
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/data-upload/usuarios-csv").hasAuthority("PERM_USUARIOS_CREATE")
                        .requestMatchers("/archivos/csv", "/archivos/pdf").permitAll()
                        // Permitir acceso a recursos estáticos (CSS, JS) y páginas de
                        // login/error
                        .requestMatchers("/css/**", "/js/**", "/login", "/error").permitAll()
                        // Proteger rutas específicas con autoridades. ¡Mucho más robusto que un
                        // `contains()`!
                        .requestMatchers("/views/usuarios/**")
                        .hasAuthority("PERM_USUARIOS_READ")
                        .requestMatchers("/views/roles/**").hasAuthority("PERM_ROLES_READ")
                        .requestMatchers("/views/nivelAcademico/**")
                        .hasAuthority("PERM_NIVELES_ACADEMICOS_READ")
                        .requestMatchers("/admin/**").hasRole("ADMIN") // Ejemplo de protección
                        // por rol
                        // Cualquier otra petición debe estar autenticada
                        .anyRequest().authenticated())
                .formLogin(form -> form
                        .loginPage("/login") // 1. URL de nuestra página de login.
                        .loginProcessingUrl("/perform_login") // 2. URL a la que el form envía
                        // los datos. Spring Security la
                        // intercepta. ¡Esto reemplaza a
                        // iniciarSesion()!
                        .defaultSuccessUrl("/welcome", true) // 3. A dónde ir si el login es
                        // exitoso.
                        .failureUrl("/login?error=true") // 4. A dónde ir si falla. Reemplaza el
                        // FacesMessage.
                        .permitAll())
                .logout(logout -> logout
                        .logoutUrl("/perform_logout") // 5. URL para desloguearse. Spring la
                        // intercepta. ¡Esto reemplaza a logout()!
                        .logoutSuccessUrl("/login?logout=true")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll())
                .exceptionHandling(exceptions -> exceptions
                        .accessDeniedPage("/error403") // Página para error de acceso denegado
                // (reemplaza redirect a
                // error400)
                );
        return http.build();
    }

    /**
     * Configura Spring Security para que use nuestro CustomUserDetailsService y
     * PasswordEncoder.
     */
    /**
     * SE COMENTA PARA ARREGLAR ERRORES*@Bean
     * public AuthenticationManager authenticationManager(HttpSecurity http) throws
     * Exception {
     * AuthenticationManagerBuilder authenticationManagerBuilder = http
     * .getSharedObject(AuthenticationManagerBuilder.class);
     * authenticationManagerBuilder
     * .userDetailsService(customUserDetailsService)
     * .passwordEncoder(passwordEncoder());
     * return authenticationManagerBuilder.build();
     * }
     **/
}