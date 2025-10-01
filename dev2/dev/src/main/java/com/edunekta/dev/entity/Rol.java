package com.edunekta.dev.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "rol")
@Getter
@Setter
@NoArgsConstructor
public class Rol implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Integer idRol;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "nombre_rol", nullable = false, length = 100)
    private String nombre;

    @NotNull
    @Size(min = 1, max = 65535)
    @Column(name = "descripcion", nullable = false, length = 65535)
    private String descripcion;

    @NotNull
    @Size(min = 1, max = 8)
    @Column(name = "estado", nullable = false, length = 8)
    private String estado;

    @OneToMany(mappedBy = "rolIdRol", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<UsuarioRol> usuarioRolCollection;

    @OneToMany(mappedBy = "rolIdRol", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<RolPermiso> rolPermisoCollection;
}
