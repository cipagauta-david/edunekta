package com.edunekta.dev.entity; // Paquete actualizado

import jakarta.persistence.*; // Importa el paquete de Jakarta Persistence
import jakarta.validation.constraints.NotNull; // Importa el paquete de Jakarta Validation
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Set;

/**
 * Representa el nivel académico (ej. Primaria, Secundaria) en el sistema.
 * 
 * @author david (migrated by Spring Boot expert)
 */
@Entity
@Table(name = "nivel_academico")
// --- Anotaciones de Lombok para reducir el código repetitivo ---
@Getter
@Setter
@NoArgsConstructor // Reemplaza el constructor público vacío
public class NivelAcademico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nivel_academico")
    private Integer idNivelAcademico;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "nombre") // Es buena práctica siempre especificar el nombre de la columna
    private String nombre;


    @Size(max = 65535)
    @Column(name = "descripcion")
    private String descripcion;


    @OneToMany(mappedBy = "nivelAcademico", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Grado> gradoCollection;

    // --- ¡TODOS los getters, setters y el constructor vacío han sido eliminados!
    // ---
    // Lombok los genera automáticamente en tiempo de compilación.
}