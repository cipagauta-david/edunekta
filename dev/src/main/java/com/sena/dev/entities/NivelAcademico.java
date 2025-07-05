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
@Table(name = "nivel_academico")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NivelAcademico.findAll", query = "SELECT n FROM NivelAcademico n"),
    @NamedQuery(name = "NivelAcademico.findByIdNivelAcademico", query = "SELECT n FROM NivelAcademico n WHERE n.idNivelAcademico = :idNivelAcademico"),
    @NamedQuery(name = "NivelAcademico.findByNombre", query = "SELECT n FROM NivelAcademico n WHERE n.nombre = :nombre")
})
public class NivelAcademico implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nivel_academico")
    private Integer idNivelAcademico;
    @NotNull
    @Size(min = 1, max = 100)
    private String nombre;
    @Size(max = 65535)
    private String descripcion;
    @OneToMany(mappedBy = "nivelAcademico", cascade = CascadeType.ALL)
    private Set<Grado> gradoCollection;

    public NivelAcademico() {
    }

    public Integer getIdNivelAcademico() {
        return idNivelAcademico;
    }

    public void setIdNivelAcademico(Integer idNivelAcademico) {
        this.idNivelAcademico = idNivelAcademico;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Grado> getGradoCollection() {
        return gradoCollection;
    }

    public void setGradoCollection(Set<Grado> gradoCollection) {
        this.gradoCollection = gradoCollection;
    }
    
}
