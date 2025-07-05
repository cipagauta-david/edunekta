/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.sena.dev.entities;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author david
 */
@Entity
@Table(name = "clase")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Clase.findAll", query = "SELECT c FROM Clase c"),
    @NamedQuery(name = "Clase.findByIdClase", query = "SELECT c FROM Clase c WHERE c.idClase = :idClase"),
    @NamedQuery(name = "Clase.findByNombre", query = "SELECT c FROM Clase c WHERE c.nombre = :nombre")
})
public class Clase implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_clase")
    private Integer idClase;
    @NotNull
    @Size(min = 1, max = 100)
    private String nombre;
    @NotNull
    private Date anio;
    @NotNull
    @Size(min = 1, max = 9)
    private String dia;
    @NotNull
    private Time horaInicio;
    @NotNull
    private Time horaFin;
    @ManyToOne
    @JoinColumn(name = "aula_id_aula")
    private Aula aulaIdAula;
    @ManyToOne
    @JoinColumn(name = "grupo_id_grupo")
    private Grupo grupoIdGrupo;
    @ManyToOne
    @JoinColumn(name = "periodo_academico_id_periodo_academico")
    private PeriodoAcademico periodoAcademicoIdPeriodoAcademico;

    public Clase() {
    }

    public Integer getIdClase() {
        return idClase;
    }

    public void setIdClase(Integer idClase) {
        this.idClase = idClase;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Date getAnio() {
        return anio;
    }

    public void setAnio(Date anio) {
        this.anio = anio;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public Time getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(Time horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Time getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(Time horaFin) {
        this.horaFin = horaFin;
    }

    public Aula getAulaIdAula() {
        return aulaIdAula;
    }

    public void setAulaIdAula(Aula aulaIdAula) {
        this.aulaIdAula = aulaIdAula;
    }

    public Grupo getGrupoIdGrupo() {
        return grupoIdGrupo;
    }

    public void setGrupoIdGrupo(Grupo grupoIdGrupo) {
        this.grupoIdGrupo = grupoIdGrupo;
    }

    public PeriodoAcademico getPeriodoAcademicoIdPeriodoAcademico() {
        return periodoAcademicoIdPeriodoAcademico;
    }

    public void setPeriodoAcademicoIdPeriodoAcademico(PeriodoAcademico periodoAcademicoIdPeriodoAcademico) {
        this.periodoAcademicoIdPeriodoAcademico = periodoAcademicoIdPeriodoAcademico;
    }
    
}
