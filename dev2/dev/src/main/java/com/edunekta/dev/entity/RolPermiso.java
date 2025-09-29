package com.edunekta.dev.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;

@Entity
@Table(name = "rol_permiso")
@Getter
@Setter
@NoArgsConstructor
public class RolPermiso implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol_permiso")
    private Integer idRolPermiso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rol_id_rol")
    private Rol rolIdRol;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "permiso_id_permiso")
    private Permiso permisoIdPermiso;
}
