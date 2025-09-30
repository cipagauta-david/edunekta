package com.edunekta.dev.controller;

import com.edunekta.dev.dto.NivelAcademicoDTO;
import com.edunekta.dev.entity.NivelAcademico;
import com.edunekta.dev.service.NivelAcademicoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/niveles-academicos") // URL base para todas las acciones de este controlador
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_NIVELES_ACADEMICOS_READ')") // Seguridad a nivel de clase
public class NivelAcademicoController {

    private final NivelAcademicoService nivelAcademicoService;

    /**
     * Muestra la lista paginada y filtrada. Reemplaza getPaginatedItems() y
     * search().
     * El estado (página, tamaño, búsqueda) viene en la URL.
     */
    @GetMapping
    public String listar(Model model,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchTerm) {
        Pageable pageable = PageRequest.of(page, size);
        Page<NivelAcademico> paginaNiveles = nivelAcademicoService.listarPaginadoYBuscando(searchTerm, pageable);

        model.addAttribute("pagina", paginaNiveles);
        model.addAttribute("searchTerm", searchTerm);
        return "nivelAcademico/index"; // Devuelve el nombre del archivo HTML de la plantilla
    }

    /**
     * Muestra el formulario para crear un nuevo nivel. Reemplaza
     * mostrarFormulario().
     */

    // AJAX/modal-friendly endpoint for create form fragment
    @GetMapping("/form-crear")
    @PreAuthorize("hasAuthority('PERM_NIVELES_ACADEMICOS_CREATE')")
    public String mostrarFormCrearNivelAcademico(Model model) {
        model.addAttribute("nivelAcademico", new NivelAcademicoDTO());
        model.addAttribute("isEditing", false);
        return "nivelAcademico/form-crear :: form";
    }

    /**
     * Muestra el formulario para editar un nivel existente. Reemplaza editar().
     */

    // AJAX/modal-friendly endpoint for edit form fragment
    @GetMapping("/form-editar/{id}")
    @PreAuthorize("hasAuthority('PERM_NIVELES_ACADEMICOS_UPDATE')")
    public String mostrarFormEditarNivelAcademico(@PathVariable Integer id, Model model, RedirectAttributes redirectAttributes) {
        return nivelAcademicoService.buscarPorId(id)
                .map(nivel -> {
                    NivelAcademicoDTO dto = new NivelAcademicoDTO(nivel.getIdNivelAcademico(), nivel.getNombre(), nivel.getDescripcion());
                    model.addAttribute("nivelAcademico", dto);
                    model.addAttribute("isEditing", true);
                    return "nivelAcademico/form-editar :: form";
                })
                .orElseGet(() -> {
                    redirectAttributes.addFlashAttribute("error", "Nivel académico no encontrado.");
                    return "redirect:/niveles-academicos";
                });
    }


    // AJAX/modal-friendly create
    @PostMapping("/crear")
    @PreAuthorize("hasAuthority('PERM_NIVELES_ACADEMICOS_CREATE')")
    public String crearNivelAcademico(@Valid @ModelAttribute("nivelAcademico") NivelAcademicoDTO dto,
                                      BindingResult result, RedirectAttributes redirectAttributes, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("isEditing", false);
            return "nivelAcademico/form-crear :: form";
        }
        NivelAcademico nivel = new NivelAcademico();
        nivel.setIdNivelAcademico(null); // Always null for create
        nivel.setNombre(dto.getNombre());
        nivel.setDescripcion(dto.getDescripcion());
        nivelAcademicoService.guardar(nivel);
        redirectAttributes.addFlashAttribute("success", "Nivel académico creado exitosamente.");
        return "redirect:/niveles-academicos";
    }

    // AJAX/modal-friendly update
    @PostMapping("/editar/{id}")
    @PreAuthorize("hasAuthority('PERM_NIVELES_ACADEMICOS_UPDATE')")
    public String actualizarNivelAcademico(@PathVariable Integer id,
                                           @Valid @ModelAttribute("nivelAcademico") NivelAcademicoDTO dto,
                                           BindingResult result, RedirectAttributes redirectAttributes, Model model,
                                           @RequestHeader(value = "X-Requested-With", required = false) String requestedWith) {
        if (result.hasErrors()) {
            model.addAttribute("isEditing", true);
            if ("XMLHttpRequest".equals(requestedWith)) {
                return "nivelAcademico/form-editar :: form";
            } else {
                return "nivelAcademico/form-editar";
            }
        }
        NivelAcademico nivel = new NivelAcademico();
        nivel.setIdNivelAcademico(id);
        nivel.setNombre(dto.getNombre());
        nivel.setDescripcion(dto.getDescripcion());
        nivelAcademicoService.guardar(nivel);
        redirectAttributes.addFlashAttribute("success", "Nivel académico actualizado exitosamente.");
        return "redirect:/niveles-academicos";
    }

    /**
     * Procesa la eliminación de un nivel. Reemplaza eliminar().
     */
    @PostMapping("/eliminar/{id}")
    @PreAuthorize("hasAuthority('PERM_NIVELES_ACADEMICOS_DELETE')")
    public String eliminar(@PathVariable Integer id, RedirectAttributes redirectAttributes) {
        if (nivelAcademicoService.eliminarPorId(id)) {
            redirectAttributes.addFlashAttribute("success", "Nivel académico eliminado exitosamente.");
        } else {
            redirectAttributes.addFlashAttribute("error", "Error al eliminar el nivel académico.");
        }
        return "redirect:/niveles-academicos";
    }
}