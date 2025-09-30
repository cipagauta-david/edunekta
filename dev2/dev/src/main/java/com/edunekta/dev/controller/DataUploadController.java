package com.edunekta.dev.controller;

import com.edunekta.dev.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/data-upload") // Prefijo para todos los endpoints de carga
@RequiredArgsConstructor
public class DataUploadController {

    private final UsuarioService usuarioService;

    @PostMapping("/usuarios-csv")
    @PreAuthorize("hasAuthority('PERM_USUARIOS_CREATE')") // Solo usuarios con permiso de crear usuarios pueden hacer esto
    public ResponseEntity<Map<String, Object>> uploadUsuariosCsv(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "El archivo no puede estar vacío."));
        }

        try {
            Map<String, Integer> result = usuarioService.procesarCsvUsuarios(file);
            return ResponseEntity.ok(Map.of(
                "message", "Archivo procesado.",
                "usuariosCreados", result.get("creados"),
                "errores", result.get("errores")
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Error al procesar el archivo: " + e.getMessage()));
        }
    }
}