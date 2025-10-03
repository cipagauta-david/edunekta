package com.edunekta.dev.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

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
    @Pattern(regexp = ".+@.+\\.com$", message = "Debe ser un formato de email válido")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$", message = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número")
    private String password;

    @NotBlank(message = "La confirmación de contraseña es obligatoria")
    private String confirmPassword;

    private Integer gradoId;

    private Integer grupoId;

    private Integer institucionId;

    @NotNull(message = "El rol es obligatorio")
    private Integer rolId;

    // Podrías añadir validación de roles aquí si los asignas en la creación
    // private List<Integer> rolesIds;
}