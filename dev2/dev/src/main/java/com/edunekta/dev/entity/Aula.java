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
@Table(name = "aula")
@Getter
@Setter
@NoArgsConstructor
public class Aula implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_aula")
    private Integer idAula;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "nombre", nullable = false, length = 50)
    private String nombre;

    @NotNull
    @Column(name = "capacidad", nullable = false)
    private int capacidad;

    @Size(max = 100)
    @Column(name = "ubicacion", length = 100)
    private String ubicacion;

    @OneToMany(mappedBy = "aulaIdAula", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Clase> claseCollection;
}
