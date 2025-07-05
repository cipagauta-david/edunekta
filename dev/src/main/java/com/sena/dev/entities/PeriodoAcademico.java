/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.sena.dev.entities;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author david
 */
@Entity
@Table(name = "periodo_academico")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PeriodoAcademico.findAll", query = "SELECT p FROM PeriodoAcademico p"),
    @NamedQuery(name = "PeriodoAcademico.findByIdPeriodoAcademico", query = "SELECT p FROM PeriodoAcademico p WHERE p.idPeriodoAcademico = :idPeriodoAcademico"),
    @NamedQuery(name = "PeriodoAcademico.findByNombrePeriodo", query = "SELECT p FROM PeriodoAcademico p WHERE p.nombrePeriodo = :nombrePeriodo")
})
public class PeriodoAcademico implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_periodo_academico")
    private Integer idPeriodoAcademico;
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "nombre_periodo")
    private String nombrePeriodo;
    @NotNull
    @Size(min = 1, max = 8)
    private String estado;
    @OneToMany(mappedBy = "periodoAcademicoIdPeriodoAcademico", cascade = CascadeType.ALL)
    private Set<Clase> claseCollection;

    public PeriodoAcademico() {
    }

    public Integer getIdPeriodoAcademico() {
        return idPeriodoAcademico;
    }

    public void setIdPeriodoAcademico(Integer idPeriodoAcademico) {
        this.idPeriodoAcademico = idPeriodoAcademico;
    }

    public String getNombrePeriodo() {
        return nombrePeriodo;
    }

    public void setNombrePeriodo(String nombrePeriodo) {
        this.nombrePeriodo = nombrePeriodo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Set<Clase> getClaseCollection() {
        return claseCollection;
    }

    public void setClaseCollection(Set<Clase> claseCollection) {
        this.claseCollection = claseCollection;
    }
    
}
