package com.edunekta.dev.dto;

import lombok.Builder;
import lombok.Data;
import java.util.Set;

/**
 * DTO para transportar la información del usuario autenticado al frontend.
 * Reemplaza el JSON construido manualmente en PermissionCheckServlet.
 */
@Data
@Builder // Usamos el patrón Builder para una construcción más limpia
public class UserInfoDTO {
    private boolean authenticated;
    private Integer userId;
    private String username; // Generalmente el email
    private String fullName;
    private Set<String> authorities; // Roles y permisos del usuario
}