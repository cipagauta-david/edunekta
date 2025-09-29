
package com.edunekta.dev.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "grado")
@Getter
@Setter
@NoArgsConstructor
public class Grado implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_grado")
    private Integer idGrado;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "nombre", nullable = false, length = 50)
    private String nombre;

    @Size(max = 65535)
    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nivel_academico_id")
    private NivelAcademico nivelAcademico;

    @OneToMany(mappedBy = "gradoIdGrado", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Usuario> usuarioCollection;
}
