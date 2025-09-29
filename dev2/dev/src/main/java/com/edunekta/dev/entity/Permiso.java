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
@Table(name = "permiso")
@Getter
@Setter
@NoArgsConstructor
public class Permiso implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_permiso")
    private Integer idPermiso;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "modulo", nullable = false, length = 100)
    private String modulo;

    @Size(max = 255)
    @Column(name = "descripcion", length = 255)
    private String descripcion;

    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "accion", nullable = false, length = 20)
    private String accion;

    @NotNull
    @Size(min = 1, max = 8)
    @Column(name = "estado", nullable = false, length = 8)
    private String estado;

    @OneToMany(mappedBy = "permisoIdPermiso", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<RolPermiso> rolPermisoCollection;
}
