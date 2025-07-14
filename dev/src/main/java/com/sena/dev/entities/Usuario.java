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
@Table(name = "usuario")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Usuario.findAll", query = "SELECT u FROM Usuario u"),
    @NamedQuery(name = "Usuario.findByIdUsuario", query = "SELECT u FROM Usuario u WHERE u.idUsuario = :idUsuario"),
    @NamedQuery(name = "Usuario.findByIdUsuarioWithRoles", query = "SELECT DISTINCT u FROM Usuario u LEFT JOIN FETCH u.usuarioRolCollection ur LEFT JOIN FETCH ur.rolIdRol r LEFT JOIN FETCH r.rolPermisoCollection rp LEFT JOIN FETCH rp.permisoIdPermiso p WHERE u.idUsuario = :idUsuario"),
    @NamedQuery(name = "Usuario.findByEmail", query = "SELECT u FROM Usuario u WHERE u.email = :email"),
    @NamedQuery(name = "Usuario.findByEmailWithRoles", query = "SELECT DISTINCT u FROM Usuario u LEFT JOIN FETCH u.usuarioRolCollection ur LEFT JOIN FETCH ur.rolIdRol r LEFT JOIN FETCH r.rolPermisoCollection rp LEFT JOIN FETCH rp.permisoIdPermiso p WHERE u.email = :email"),
    @NamedQuery(name = "Usuario.iniciarSesion", query = "SELECT u FROM Usuario u WHERE u.email = :email AND u.password = :password")
})
public class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;
    @NotNull
    @Size(min = 1, max = 100)
    private String nombre;
    @NotNull
    @Size(min = 1, max = 100)
    private String apellido;
    @NotNull
    @Size(min = 1, max = 150)
    private String email;
    @NotNull
    @Size(min = 1, max = 255)
    private String password;
    @OneToMany(mappedBy = "usuarioIdUsuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<UsuarioRol> usuarioRolCollection;
    @ManyToOne
    @JoinColumn(name = "grado_id_grado")
    private Grado gradoIdGrado;
    @ManyToOne
    @JoinColumn(name = "grupo_id_grupo")
    private Grupo grupoIdGrupo;
    @ManyToOne
    @JoinColumn(name = "institucion_id_institucion")
    private Institucion institucionIdInstitucion;

    public Usuario() {
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<UsuarioRol> getUsuarioRolCollection() {
        return usuarioRolCollection;
    }

    public void setUsuarioRolCollection(Set<UsuarioRol> usuarioRolCollection) {
        this.usuarioRolCollection = usuarioRolCollection;
    }

    public Grado getGradoIdGrado() {
        return gradoIdGrado;
    }

    public void setGradoIdGrado(Grado gradoIdGrado) {
        this.gradoIdGrado = gradoIdGrado;
    }

    public Grupo getGrupoIdGrupo() {
        return grupoIdGrupo;
    }

    public void setGrupoIdGrupo(Grupo grupoIdGrupo) {
        this.grupoIdGrupo = grupoIdGrupo;
    }

    public Institucion getInstitucionIdInstitucion() {
        return institucionIdInstitucion;
    }

    public void setInstitucionIdInstitucion(Institucion institucionIdInstitucion) {
        this.institucionIdInstitucion = institucionIdInstitucion;
    }
    
    @Override
    public String toString() {
        return "Usuario{" +
                "idUsuario=" + idUsuario +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", email='" + email + '\'' +
                ", password='" + (password != null ? "[HIDDEN]" : "null") + '\'' +
                ", gradoIdGrado=" + (gradoIdGrado != null ? gradoIdGrado.getIdGrado() : "null") +
                ", grupoIdGrupo=" + (grupoIdGrupo != null ? grupoIdGrupo.getIdGrupo() : "null") +
                ", institucionIdInstitucion=" + (institucionIdInstitucion != null ? institucionIdInstitucion.getIdInstitucion() : "null") +
                '}';
    }
    
}
