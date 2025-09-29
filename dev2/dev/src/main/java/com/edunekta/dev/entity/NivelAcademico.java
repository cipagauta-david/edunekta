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

    @Lob // Para textos largos, @Lob es más estándar que depender del tamaño de la
         // columna
    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    // El mapeo de la relación no cambia, solo la sintaxis del import
    // Buena práctica: Renombrar 'gradoCollection' a 'grados' para mayor claridad.
    @OneToMany(mappedBy = "nivelAcademico", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Grado> grados;

    // --- ¡TODOS los getters, setters y el constructor vacío han sido eliminados!
    // ---
    // Lombok los genera automáticamente en tiempo de compilación.
}