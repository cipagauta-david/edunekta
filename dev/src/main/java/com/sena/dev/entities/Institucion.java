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
@Table(name = "institucion")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Institucion.findAll", query = "SELECT i FROM Institucion i"),
    @NamedQuery(name = "Institucion.findByIdInstitucion", query = "SELECT i FROM Institucion i WHERE i.idInstitucion = :idInstitucion"),
    @NamedQuery(name = "Institucion.findByNombre", query = "SELECT i FROM Institucion i WHERE i.nombre = :nombre")
})
public class Institucion implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_institucion")
    private Integer idInstitucion;
    @NotNull
    @Size(min = 1, max = 100)
    private String nombre;
    @NotNull
    @Size(min = 1, max = 255)
    private String direccion;
    @NotNull
    @Size(min = 1, max = 20)
    private String telefono;
    @NotNull
    @Size(min = 1, max = 100)
    private String correo;
    @NotNull
    @Size(min = 1, max = 100)
    private String rector;
    @OneToMany(mappedBy = "institucionIdInstitucion", cascade = CascadeType.ALL)
    private Set<Usuario> usuarioCollection;

    public Institucion() {
    }

    public Integer getIdInstitucion() {
        return idInstitucion;
    }

    public void setIdInstitucion(Integer idInstitucion) {
        this.idInstitucion = idInstitucion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getRector() {
        return rector;
    }

    public void setRector(String rector) {
        this.rector = rector;
    }

    public Set<Usuario> getUsuarioCollection() {
        return usuarioCollection;
    }

    public void setUsuarioCollection(Set<Usuario> usuarioCollection) {
        this.usuarioCollection = usuarioCollection;
    }
    
}
