package com.edunekta.dev.controller;

import com.edunekta.dev.entity.NivelAcademico;
import com.edunekta.dev.service.NivelAcademicoService;
import com.edunekta.dev.service.generateFiles.NivelAcademicoFileService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;



/**
 * Controlador general para generación de archivos (CSV, PDF, etc) de cualquier
 * entidad.
 * Se puede extender fácilmente para usuarios, grados, etc.
 */
@RestController
@RequestMapping("/generarArchivos")
@RequiredArgsConstructor
public class GenerarArchivoController {
    // Inyectar aquí los servicios de otras entidades cuando se requiera
    private final NivelAcademicoService nivelAcademicoService;
    private final NivelAcademicoFileService nivelAcademicoFileService;

    /**
     * Endpoint general para CSV de cualquier entidad.
     * Ejemplo: /generarArchivos/csv?entidad=niveles-academicos&searchTerm=...
     */
    @GetMapping("/csv")
    public void descargarCsv(
            @RequestParam String entidad,
            @RequestParam(required = false) String searchTerm,
            HttpServletResponse response) throws IOException {
        switch (entidad) {
            case "niveles-academicos" -> {
                response.setContentType("text/csv; charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=niveles_academicos.csv");
                Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE);
                Page<NivelAcademico> pagina = nivelAcademicoService.listarPaginadoYBuscando(searchTerm, pageable);
                nivelAcademicoFileService.writeCsv(pagina.getContent(), response.getOutputStream());
            }
            // Agrega aquí más entidades en el futuro
            default -> throw new IllegalArgumentException("Entidad no soportada para CSV: " + entidad);
        }
    }

    /**
     * Endpoint general para PDF de cualquier entidad.
     * Ejemplo: /generarArchivos/pdf?entidad=niveles-academicos&searchTerm=...
     */
    @GetMapping("/pdf")
    public void descargarPdf(
            @RequestParam String entidad,
            @RequestParam(required = false) String searchTerm,
            HttpServletResponse response) throws IOException {
        switch (entidad) {
            case "niveles-academicos" -> {
                response.setContentType("application/pdf");
                response.setHeader("Content-Disposition", "attachment; filename=niveles_academicos_analisis.pdf");
                Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE);
                Page<NivelAcademico> pagina = nivelAcademicoService.listarPaginadoYBuscando(searchTerm, pageable);
                try {
                    nivelAcademicoFileService.writePdf(pagina.getContent(), response.getOutputStream());
                } catch (com.lowagie.text.DocumentException e) {
                    throw new IOException("Error al generar PDF", e);
                }
            }
            // Agrega aquí más entidades en el futuro
            default -> throw new IllegalArgumentException("Entidad no soportada para PDF: " + entidad);
        }
    }
}
