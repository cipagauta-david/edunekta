package com.edunekta.dev.controller;

import com.edunekta.dev.entity.NivelAcademico;
import com.edunekta.dev.service.NivelAcademicoService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PiePlot;
import org.jfree.data.general.DefaultPieDataset;
// import org.jfree.chart.plot.PiePlot3D;
import org.jfree.chart.ChartUtils;

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
                List<NivelAcademico> lista = pagina.getContent();

                // Calcular datos adicionales para cada nivel
                // (Estudiantes, Grupos, Grados)
                // Prepara el OutputStreamWriter con BOM para Excel y otros lectores
                var out = response.getOutputStream();
                // Escribir BOM UTF-8
                out.write(new byte[] {(byte)0xEF, (byte)0xBB, (byte)0xBF});
                try (CSVPrinter csvPrinter = new CSVPrinter(
                        new OutputStreamWriter(out, StandardCharsets.UTF_8),
                        CSVFormat.DEFAULT.builder().setHeader(
                                "id_nivel_academico", "nombre", "descripción", "Cantidad Estudiantes", "Cantidad Grupos", "Cantidad Grados"
                        ).build())) {
                    for (NivelAcademico n : lista) {
                        int totalEstudiantes = 0;
                        int totalGrupos = 0;
                        int totalGrados = 0;
                        java.util.Set<Integer> gruposUnicos = new java.util.HashSet<>();
                        if (n.getGradoCollection() != null) {
                            totalGrados = n.getGradoCollection().size();
                            for (var grado : n.getGradoCollection()) {
                                if (grado.getUsuarioCollection() != null) {
                                    totalEstudiantes += grado.getUsuarioCollection().size();
                                    for (var usuario : grado.getUsuarioCollection()) {
                                        if (usuario.getGrupoIdGrupo() != null && usuario.getGrupoIdGrupo().getIdGrupo() != null) {
                                            gruposUnicos.add(usuario.getGrupoIdGrupo().getIdGrupo());
                                        }
                                    }
                                }
                            }
                            totalGrupos = gruposUnicos.size();
                        }
                        csvPrinter.printRecord(
                                n.getIdNivelAcademico(),
                                n.getNombre(),
                                n.getDescripcion(),
                                totalEstudiantes,
                                totalGrupos,
                                totalGrados
                        );
                    }
                }
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
                List<NivelAcademico> lista = pagina.getContent();

                // --- Preparar datos para los gráficos ---
                java.util.Map<String, Integer> estudiantesPorNivel = new java.util.LinkedHashMap<>();
                java.util.Map<String, Integer> gruposPorNivel = new java.util.LinkedHashMap<>();
                java.util.Map<String, Integer> gradosPorNivel = new java.util.LinkedHashMap<>();

                for (NivelAcademico nivel : lista) {
                    int totalEstudiantes = 0;
                    int totalGrupos = 0;
                    int totalGrados = 0;
                    java.util.Set<Integer> gruposUnicos = new java.util.HashSet<>();
                    if (nivel.getGradoCollection() != null) {
                        totalGrados = nivel.getGradoCollection().size();
                        for (var grado : nivel.getGradoCollection()) {
                            if (grado.getUsuarioCollection() != null) {
                                totalEstudiantes += grado.getUsuarioCollection().size();
                                for (var usuario : grado.getUsuarioCollection()) {
                                    if (usuario.getGrupoIdGrupo() != null
                                            && usuario.getGrupoIdGrupo().getIdGrupo() != null) {
                                        gruposUnicos.add(usuario.getGrupoIdGrupo().getIdGrupo());
                                    }
                                }
                            }
                        }
                        totalGrupos = gruposUnicos.size();
                    }
                    estudiantesPorNivel.put(nivel.getNombre(), totalEstudiantes);
                    gruposPorNivel.put(nivel.getNombre(), totalGrupos);
                    gradosPorNivel.put(nivel.getNombre(), totalGrados);
                }

                // --- Generar PDF con openpdf ---
                try (Document document = new Document()) {
                    PdfWriter.getInstance(document, response.getOutputStream());
                    document.open();
                    // Título en negrita y centrado
                    Font titleFont = new Font(Font.HELVETICA, 16, Font.BOLD);
                    Paragraph title = new Paragraph("Análisis de Niveles Académicos", titleFont);
                    document.add(title);
                    document.add(new Paragraph("Total registros: " + lista.size()));

                    // --- Gráfico 1: Estudiantes por Nivel Académico ---
                    int width = 400, height = 300;
                    DefaultPieDataset<String> dataset1 = new DefaultPieDataset<>();
                    for (var entry : estudiantesPorNivel.entrySet()) {
                        dataset1.setValue(entry.getKey(), entry.getValue());
                    }
                    JFreeChart chart1 = ChartFactory.createRingChart(
                        "Estudiantes por Nivel Académico", dataset1, false, false, false);
                    PiePlot<String> plot1 = (PiePlot<String>) chart1.getPlot();
                    plot1.setLabelFont(new java.awt.Font("SansSerif", java.awt.Font.PLAIN, 10));
                    plot1.setSectionOutlinesVisible(false);
                    plot1.setCircular(true);
                    java.awt.image.BufferedImage chartImage1 = chart1.createBufferedImage(width, height);
                    java.io.ByteArrayOutputStream baos1 = new java.io.ByteArrayOutputStream();
                    ChartUtils.writeBufferedImageAsPNG(baos1, chartImage1);
                    Image image1 = Image.getInstance(baos1.toByteArray());
                    image1.setAlignment(Element.ALIGN_CENTER);
                    document.add(image1);

                    // Tabla 1: Estudiantes por Nivel Académico
                    document.add(new Paragraph("\n "));
                    PdfPTable table = new PdfPTable(2);
                    table.addCell("Nivel Académico");
                    table.addCell("Cantidad de Estudiantes");
                    for (var entry : estudiantesPorNivel.entrySet()) {
                        table.addCell(entry.getKey());
                        table.addCell(entry.getValue().toString());
                    }
                    document.add(table);

                    // --- Page break before next graph/table pair ---
                    document.newPage();

                    // --- Gráfico 2: Grupos por Nivel Académico ---
                    DefaultPieDataset<String> dataset2 = new DefaultPieDataset<>();
                    for (var entry : gruposPorNivel.entrySet()) {
                        dataset2.setValue(entry.getKey(), entry.getValue());
                    }
                    JFreeChart chart2 = ChartFactory.createRingChart(
                        "Grupos por Nivel Académico", dataset2, false, false, false);
                    PiePlot<String> plot2 = (PiePlot<String>) chart2.getPlot();
                    plot2.setLabelFont(new java.awt.Font("SansSerif", java.awt.Font.PLAIN, 10));
                    plot2.setSectionOutlinesVisible(false);
                    plot2.setCircular(true);
                    java.awt.image.BufferedImage chartImage2 = chart2.createBufferedImage(width, height);
                    java.io.ByteArrayOutputStream baos2 = new java.io.ByteArrayOutputStream();
                    ChartUtils.writeBufferedImageAsPNG(baos2, chartImage2);
                    Image image2 = Image.getInstance(baos2.toByteArray());
                    image2.setAlignment(Element.ALIGN_CENTER);
                    document.add(image2);

                    // Tabla 2: Grupos por Nivel Académico
                    document.add(new Paragraph("\n "));
                    PdfPTable tableG = new PdfPTable(2);
                    tableG.addCell("Nivel Académico");
                    tableG.addCell("Cantidad de Grupos");
                    for (var entry : gruposPorNivel.entrySet()) {
                        tableG.addCell(entry.getKey());
                        tableG.addCell(entry.getValue().toString());
                    }
                    document.add(tableG);

                    // --- Page break before next graph/table pair ---
                    document.newPage();

                    // --- Gráfico 3: Grados por Nivel Académico ---
                    DefaultPieDataset<String> dataset3 = new DefaultPieDataset<>();
                    for (var entry : gradosPorNivel.entrySet()) {
                        dataset3.setValue(entry.getKey(), entry.getValue());
                    }
                    JFreeChart chart3 = ChartFactory.createRingChart(
                        "Grados por Nivel Académico", dataset3, false, false, false);
                    PiePlot<String> plot3 = (PiePlot<String>) chart3.getPlot();
                    plot3.setLabelFont(new java.awt.Font("SansSerif", java.awt.Font.PLAIN, 10));
                    plot3.setSectionOutlinesVisible(false);
                    plot3.setCircular(true);
                    java.awt.image.BufferedImage chartImage3 = chart3.createBufferedImage(width, height);
                    java.io.ByteArrayOutputStream baos3 = new java.io.ByteArrayOutputStream();
                    ChartUtils.writeBufferedImageAsPNG(baos3, chartImage3);
                    Image image3 = Image.getInstance(baos3.toByteArray());
                    image3.setAlignment(Element.ALIGN_CENTER);
                    document.add(image3);

                    // Tabla 3: Grados por Nivel Académico
                    document.add(new Paragraph("\n "));
                    PdfPTable tableGr = new PdfPTable(2);
                    tableGr.addCell("Nivel Académico");
                    tableGr.addCell("Cantidad de Grados");
                    for (var entry : gradosPorNivel.entrySet()) {
                        tableGr.addCell(entry.getKey());
                        tableGr.addCell(entry.getValue().toString());
                    }
                    document.add(tableGr);

                    document.close();
                }
            }
            // Agrega aquí más entidades en el futuro
            default -> throw new IllegalArgumentException("Entidad no soportada para PDF: " + entidad);
        }
    }
}
