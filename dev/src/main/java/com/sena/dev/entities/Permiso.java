package com.sena.dev.entities;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Entity for managing granular permissions
 * 
 * @author david
 */
@Entity
@Table(name = "permiso")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Permiso.findAll", query = "SELECT p FROM Permiso p"),
    @NamedQuery(name = "Permiso.findByIdPermiso", query = "SELECT p FROM Permiso p WHERE p.idPermiso = :idPermiso"),
    @NamedQuery(name = "Permiso.findByNombre", query = "SELECT p FROM Permiso p WHERE p.nombre = :nombre"),
    @NamedQuery(name = "Permiso.findByModulo", query = "SELECT p FROM Permiso p WHERE p.modulo = :modulo"),
    @NamedQuery(name = "Permiso.findByEstado", query = "SELECT p FROM Permiso p WHERE p.estado = :estado")
})
public class Permiso implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_permiso")
    private Integer idPermiso;
    
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "nombre")
    private String nombre;
    
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "modulo")
    private String modulo;
    
    @Size(max = 255)
    @Column(name = "descripcion")
    private String descripcion;
    
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "accion")
    private String accion; // CREATE, READ, UPDATE, DELETE, ALL
    
    @NotNull
    @Size(min = 1, max = 8)
    @Column(name = "estado")
    private String estado; // ACTIVO, INACTIVO
    
    @OneToMany(mappedBy = "permisoIdPermiso", cascade = CascadeType.ALL)
    private Set<RolPermiso> rolPermisoCollection;

    public Permiso() {
    }

    public Permiso(Integer idPermiso) {
        this.idPermiso = idPermiso;
    }

    public Permiso(Integer idPermiso, String nombre, String modulo, String accion, String estado) {
        this.idPermiso = idPermiso;
        this.nombre = nombre;
        this.modulo = modulo;
        this.accion = accion;
        this.estado = estado;
    }

    public Integer getIdPermiso() {
        return idPermiso;
    }

    public void setIdPermiso(Integer idPermiso) {
        this.idPermiso = idPermiso;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getModulo() {
        return modulo;
    }

    public void setModulo(String modulo) {
        this.modulo = modulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getAccion() {
        return accion;
    }

    public void setAccion(String accion) {
        this.accion = accion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Set<RolPermiso> getRolPermisoCollection() {
        return rolPermisoCollection;
    }

    public void setRolPermisoCollection(Set<RolPermiso> rolPermisoCollection) {
        this.rolPermisoCollection = rolPermisoCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idPermiso != null ? idPermiso.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Permiso)) {
            return false;
        }
        Permiso other = (Permiso) object;
        if ((this.idPermiso == null && other.idPermiso != null) || 
            (this.idPermiso != null && !this.idPermiso.equals(other.idPermiso))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.sena.dev.entities.Permiso[ idPermiso=" + idPermiso + " ]";
    }
} 