package com.edunekta.dev.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UsuarioUpdateDTO {

    @NotNull
    private Integer idUsuario;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100)
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 100)
    private String apellido;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Debe ser un formato de email válido")
    @Size(max = 255)
    private String email;

    // La contraseña es opcional en la actualización
    @Size(min = 8, message = "La nueva contraseña debe tener al menos 8 caracteres")
    private String password;

    private String confirmPassword;

    @NotNull(message = "Debe seleccionar un grado")
    private Integer gradoId;

    @NotNull(message = "Debe seleccionar un grupo")
    private Integer grupoId;

    private Integer institucionId;
}