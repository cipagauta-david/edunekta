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
@Table(name = "institucion")
@Getter
@Setter
@NoArgsConstructor
public class Institucion implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_institucion")
    private Integer idInstitucion;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "direccion", nullable = false, length = 255)
    private String direccion;

    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "telefono", nullable = false, length = 20)
    private String telefono;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "correo", nullable = false, length = 100)
    private String correo;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "rector", nullable = false, length = 100)
    private String rector;

    @OneToMany(mappedBy = "institucionIdInstitucion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Usuario> usuarioCollection;
}
