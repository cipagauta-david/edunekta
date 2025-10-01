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
@Table(name = "grupo")
@Getter
@Setter
@NoArgsConstructor
public class Grupo implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_grupo")
    private Integer idGrupo;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "nombre_grupo", nullable = false, length = 100)
    private String nombre;

    @Size(max = 65535)
    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "grupoIdGrupo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Usuario> usuarioCollection;

    @OneToMany(mappedBy = "grupoIdGrupo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Clase> claseCollection;
}
