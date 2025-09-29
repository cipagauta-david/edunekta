package com.edunekta.dev.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
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
    @Column(name = "email")
    private String email;
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "password")
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
}
