package com.edunekta.dev.controller;

import com.edunekta.dev.dto.UserInfoDTO;
import com.edunekta.dev.entity.Usuario;
import com.edunekta.dev.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api") // Prefijo para todos los endpoints de API en este controlador
@RequiredArgsConstructor
public class UserInfoController {

    private final UsuarioRepository usuarioRepository;

    /**
     * Endpoint para obtener la información del usuario actualmente autenticado.
     * Reemplaza completamente a PermissionCheckServlet.
     * Es stateless y seguro.
     *
     * @param authentication Inyectado automáticamente por Spring Security. Contiene el Principal del usuario.
     * @return Un ResponseEntity con el DTO de información del usuario.
     */
    @GetMapping("/user-info")
    public ResponseEntity<UserInfoDTO> getCurrentUserInfo(Authentication authentication) {
        // Si no hay autenticación, devolvemos una respuesta indicándolo.
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.ok(UserInfoDTO.builder().authenticated(false).build());
        }

        // Buscamos el usuario en la BD para obtener datos frescos como el nombre completo.
        // authentication.getName() devuelve el username (nuestro email).
        Usuario usuario = usuarioRepository.findByEmail(authentication.getName())
                .orElse(null); // Si no se encuentra, es un estado anómalo, pero lo manejamos.
        
        if (usuario == null) {
            // Esto no debería pasar si el usuario está autenticado, pero es una salvaguarda.
             return ResponseEntity.ok(UserInfoDTO.builder().authenticated(false).build());
        }
        
        // Construimos el DTO usando el patrón Builder.
        UserInfoDTO userInfo = UserInfoDTO.builder()
                .authenticated(true)
                .userId(usuario.getIdUsuario())
                .username(usuario.getEmail())
                .fullName(usuario.getNombre() + " " + usuario.getApellido())
                .authorities(authentication.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toSet()))
                .build();

        return ResponseEntity.ok(userInfo);
    }
}