package com.edunekta.dev.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "periodo_academico")
@Getter
@Setter
@NoArgsConstructor
public class PeriodoAcademico implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_periodo_academico")
    private Integer idPeriodoAcademico;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "nombre_periodo", nullable = false, length = 100)
    private String nombrePeriodo;

    @NotNull
    @Size(min = 1, max = 8)
    @Column(name = "estado", nullable = false, length = 8)
    private String estado;

    @OneToMany(mappedBy = "periodoAcademicoIdPeriodoAcademico", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Clase> claseCollection;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_inicio")
    private Date fechaInicio;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_fin")
    private Date fechaFin;
}
