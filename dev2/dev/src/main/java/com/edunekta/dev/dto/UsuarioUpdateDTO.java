package com.edunekta.dev.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UsuarioUpdateDTO {

    @NotNull
    private Integer idUsuario;

    @Size(max = 100)
    private String nombre;

    @Size(max = 100)
    private String apellido;

    @Email(message = "Debe ser un formato de email válido")
    @Size(max = 255)
    private String email;

    private String password;

    private String confirmPassword;

    private Integer gradoId;

    private Integer grupoId;

    private Integer institucionId;

    private Integer rolId;
}