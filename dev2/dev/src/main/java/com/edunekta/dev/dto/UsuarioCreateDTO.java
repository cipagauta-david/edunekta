package com.edunekta.dev.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UsuarioCreateDTO {
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

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    // Aquí podrías añadir una anotación de validación de contraseña más compleja si
    // lo deseas
    private String password;

    @NotBlank(message = "La confirmación de contraseña es obligatoria")
    private String confirmPassword;

    @NotNull(message = "Debe seleccionar un grado")
    private Integer gradoId;

    @NotNull(message = "Debe seleccionar un grupo")
    private Integer grupoId;

    // Institución puede ser opcional
    private Integer institucionId;

    // Podrías añadir validación de roles aquí si los asignas en la creación
    // private List<Integer> rolesIds;
}