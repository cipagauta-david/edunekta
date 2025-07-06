package com.sena.dev.entities;

import java.io.Serializable;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Entity for managing role-permission relationships
 * 
 * @author david
 */
@Entity
@Table(name = "rol_permiso")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "RolPermiso.findAll", query = "SELECT rp FROM RolPermiso rp"),
    @NamedQuery(name = "RolPermiso.findByIdRolPermiso", query = "SELECT rp FROM RolPermiso rp WHERE rp.idRolPermiso = :idRolPermiso"),
    @NamedQuery(name = "RolPermiso.findByRol", query = "SELECT rp FROM RolPermiso rp WHERE rp.rolIdRol = :rolIdRol"),
    @NamedQuery(name = "RolPermiso.findByPermiso", query = "SELECT rp FROM RolPermiso rp WHERE rp.permisoIdPermiso = :permisoIdPermiso"),
    @NamedQuery(name = "RolPermiso.findByRolAndPermiso", query = "SELECT rp FROM RolPermiso rp WHERE rp.rolIdRol = :rolIdRol AND rp.permisoIdPermiso = :permisoIdPermiso")
})
public class RolPermiso implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol_permiso")
    private Integer idRolPermiso;
    
    @ManyToOne
    @JoinColumn(name = "rol_id_rol")
    private Rol rolIdRol;
    
    @ManyToOne
    @JoinColumn(name = "permiso_id_permiso")
    private Permiso permisoIdPermiso;

    public RolPermiso() {
    }

    public RolPermiso(Integer idRolPermiso) {
        this.idRolPermiso = idRolPermiso;
    }

    public Integer getIdRolPermiso() {
        return idRolPermiso;
    }

    public void setIdRolPermiso(Integer idRolPermiso) {
        this.idRolPermiso = idRolPermiso;
    }

    public Rol getRolIdRol() {
        return rolIdRol;
    }

    public void setRolIdRol(Rol rolIdRol) {
        this.rolIdRol = rolIdRol;
    }

    public Permiso getPermisoIdPermiso() {
        return permisoIdPermiso;
    }

    public void setPermisoIdPermiso(Permiso permisoIdPermiso) {
        this.permisoIdPermiso = permisoIdPermiso;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idRolPermiso != null ? idRolPermiso.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof RolPermiso)) {
            return false;
        }
        RolPermiso other = (RolPermiso) object;
        if ((this.idRolPermiso == null && other.idRolPermiso != null) || 
            (this.idRolPermiso != null && !this.idRolPermiso.equals(other.idRolPermiso))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.sena.dev.entities.RolPermiso[ idRolPermiso=" + idRolPermiso + " ]";
    }
} 