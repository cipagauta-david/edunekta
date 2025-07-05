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
@Table(name = "aula")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Aula.findAll", query = "SELECT a FROM Aula a"),
    @NamedQuery(name = "Aula.findByIdAula", query = "SELECT a FROM Aula a WHERE a.idAula = :idAula"),
    @NamedQuery(name = "Aula.findByNombre", query = "SELECT a FROM Aula a WHERE a.nombre = :nombre")
})
public class Aula implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_aula")
    private Integer idAula;
    @NotNull
    @Size(min = 1, max = 50)
    private String nombre;
    @NotNull
    private int capacidad;
    @Size(max = 100)
    private String ubicacion;
    @OneToMany(mappedBy = "aulaIdAula", cascade = CascadeType.ALL)
    private Set<Clase> claseCollection;

    public Aula() {
    }

    public Integer getIdAula() {
        return idAula;
    }

    public void setIdAula(Integer idAula) {
        this.idAula = idAula;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(int capacidad) {
        this.capacidad = capacidad;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public Set<Clase> getClaseCollection() {
        return claseCollection;
    }

    public void setClaseCollection(Set<Clase> claseCollection) {
        this.claseCollection = claseCollection;
    }
    
}
