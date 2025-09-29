package com.edunekta.dev.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "clase")
@Getter
@Setter
@NoArgsConstructor
public class Clase implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_clase")
    private Integer idClase;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @NotNull
    @Column(name = "anio", nullable = false)
    private Date anio;

    @NotNull
    @Size(min = 1, max = 9)
    @Column(name = "dia", nullable = false, length = 9)
    private String dia;

    @NotNull
    @Column(name = "hora_inicio", nullable = false)
    private Time horaInicio;

    @NotNull
    @Column(name = "hora_fin", nullable = false)
    private Time horaFin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aula_id_aula")
    private Aula aulaIdAula;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grupo_id_grupo")
    private Grupo grupoIdGrupo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "periodo_academico_id_periodo_academico")
    private PeriodoAcademico periodoAcademicoIdPeriodoAcademico;
}
