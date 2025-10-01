package com.edunekta.dev.service.generateFiles;

import com.edunekta.dev.entity.NivelAcademico;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PiePlot;
import org.jfree.data.general.DefaultPieDataset;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import org.jfree.chart.ChartUtils;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.Set;
import java.util.HashSet;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.List;
import java.awt.image.BufferedImage;

import org.springframework.stereotype.Service;

@Service
public class NivelAcademicoFileService {
    public void writeCsv(List<NivelAcademico> lista, OutputStream out) throws IOException {
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
                Set<Integer> gruposUnicos = new HashSet<>();
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

    public void writePdf(List<NivelAcademico> lista, OutputStream out) throws IOException, DocumentException {
        // --- Preparar datos para los gráficos ---
        Map<String, Integer> estudiantesPorNivel = new LinkedHashMap<>();
        Map<String, Integer> gruposPorNivel = new LinkedHashMap<>();
        Map<String, Integer> gradosPorNivel = new LinkedHashMap<>();

        for (NivelAcademico nivel : lista) {
            int totalEstudiantes = 0;
            int totalGrupos = 0;
            int totalGrados = 0;
            Set<Integer> gruposUnicos = new HashSet<>();
            if (nivel.getGradoCollection() != null) {
                totalGrados = nivel.getGradoCollection().size();
                for (var grado : nivel.getGradoCollection()) {
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
            estudiantesPorNivel.put(nivel.getNombre(), totalEstudiantes);
            gruposPorNivel.put(nivel.getNombre(), totalGrupos);
            gradosPorNivel.put(nivel.getNombre(), totalGrados);
        }

        try (Document document = new Document()) {
            PdfWriter.getInstance(document, out);
            document.open();
            Font titleFont = new Font(Font.HELVETICA, 16, Font.BOLD);
            Paragraph title = new Paragraph("Análisis de Niveles Académicos", titleFont);
            document.add(title);
            document.add(new Paragraph("Total registros: " + lista.size()));

            int width = 400, height = 300;
            // --- Gráfico 1: Estudiantes por Nivel Académico ---
            DefaultPieDataset<String> dataset1 = new DefaultPieDataset<>();
            for (var entry : estudiantesPorNivel.entrySet()) {
                dataset1.setValue(entry.getKey(), entry.getValue());
            }
            JFreeChart chart1 = ChartFactory.createRingChart(
                "Estudiantes por Nivel Académico", dataset1, false, false, false);
            @SuppressWarnings("unchecked")
            PiePlot<String> plot1 = (PiePlot<String>) chart1.getPlot();
            plot1.setLabelFont(new java.awt.Font("SansSerif", java.awt.Font.PLAIN, 10));
            plot1.setSectionOutlinesVisible(false);
            plot1.setCircular(true);
            BufferedImage chartImage1 = chart1.createBufferedImage(width, height);
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

            document.newPage();

            // --- Gráfico 2: Grupos por Nivel Académico ---
            DefaultPieDataset<String> dataset2 = new DefaultPieDataset<>();
            for (var entry : gruposPorNivel.entrySet()) {
                dataset2.setValue(entry.getKey(), entry.getValue());
            }
            JFreeChart chart2 = ChartFactory.createRingChart(
                "Grupos por Nivel Académico", dataset2, false, false, false);
            @SuppressWarnings("unchecked")
            PiePlot<String> plot2 = (PiePlot<String>) chart2.getPlot();
            plot2.setLabelFont(new java.awt.Font("SansSerif", java.awt.Font.PLAIN, 10));
            plot2.setSectionOutlinesVisible(false);
            plot2.setCircular(true);
            BufferedImage chartImage2 = chart2.createBufferedImage(width, height);
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

            document.newPage();

            // --- Gráfico 3: Grados por Nivel Académico ---
            DefaultPieDataset<String> dataset3 = new DefaultPieDataset<>();
            for (var entry : gradosPorNivel.entrySet()) {
                dataset3.setValue(entry.getKey(), entry.getValue());
            }
            JFreeChart chart3 = ChartFactory.createRingChart(
                "Grados por Nivel Académico", dataset3, false, false, false);
            @SuppressWarnings("unchecked")
            PiePlot<String> plot3 = (PiePlot<String>) chart3.getPlot();
            plot3.setLabelFont(new java.awt.Font("SansSerif", java.awt.Font.PLAIN, 10));
            plot3.setSectionOutlinesVisible(false);
            plot3.setCircular(true);
            BufferedImage chartImage3 = chart3.createBufferedImage(width, height);
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
}
