package com.edunekta.dev.config;

import com.edunekta.dev.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity // Activa la seguridad web de Spring
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;

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
                .authorizeHttpRequests(authz -> authz
                        // Permitir acceso a recursos estáticos (CSS, JS) y páginas de login/error
                        .requestMatchers("/css/**", "/js/**", "/login", "/error").permitAll()
                        // Proteger rutas específicas con autoridades. ¡Mucho más robusto que un
                        // `contains()`!
                        .requestMatchers("/views/usuarios/**").hasAuthority("PERM_USUARIOS_READ")
                        .requestMatchers("/views/roles/**").hasAuthority("PERM_ROLES_READ")
                        .requestMatchers("/views/nivelAcademico/**").hasAuthority("PERM_NIVELES_ACADEMICOS_READ")
                        .requestMatchers("/admin/**").hasRole("ADMIN") // Ejemplo de protección por rol
                        // Cualquier otra petición debe estar autenticada
                        .anyRequest().authenticated())
                .formLogin(form -> form
                        .loginPage("/login") // URL de nuestra página de login
                        .loginProcessingUrl("/perform_login") // URL a la que el formulario debe enviar los datos
                        .defaultSuccessUrl("/welcome", true) // A dónde ir después de un login exitoso
                        .failureUrl("/login?error=true") // A dónde ir si el login falla
                        .permitAll())
                .logout(logout -> logout
                        .logoutUrl("/perform_logout")
                        .logoutSuccessUrl("/login?logout=true")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll())
                .exceptionHandling(exceptions -> exceptions
                        .accessDeniedPage("/error403") // Página para error de acceso denegado (reemplaza redirect a
                                                       // error400)
                );

        return http.build();
    }

    /**
     * Configura Spring Security para que use nuestro CustomUserDetailsService y
     * PasswordEncoder.
     */
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http
                .getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }
}