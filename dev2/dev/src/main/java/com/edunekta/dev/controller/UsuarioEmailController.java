package com.edunekta.dev.controller;

import com.edunekta.dev.entity.Usuario;
import com.edunekta.dev.repository.UsuarioRepository;
import com.edunekta.dev.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/usuarios/email")
@RequiredArgsConstructor
public class UsuarioEmailController {
    private final UsuarioRepository usuarioRepository;
    private final EmailService emailService;

    @GetMapping
    public String mostrarFormularioEnvio(Model model) {
        List<Usuario> usuarios = usuarioRepository.findAll();
        model.addAttribute("usuarios", usuarios);
        return "usuarios/email-form";
    }

    @PostMapping
    public String enviarCorreos(@RequestParam("usuarioIds") List<Integer> usuarioIds,
                                @RequestParam("subject") String subject,
                                @RequestParam("body") String body,
                                Model model) {
        List<Usuario> usuarios = usuarioRepository.findAll();
        model.addAttribute("usuarios", usuarios);
        List<String> emails = usuarioRepository.findAllById(usuarioIds)
                .stream().map(Usuario::getEmail).collect(Collectors.toList());
        try {
            emailService.sendMassiveEmail(emails, subject, body, true);
            model.addAttribute("success", "Correos enviados exitosamente.");
        } catch (MessagingException e) {
            model.addAttribute("error", "Error al enviar correos: " + e.getMessage());
        }
        return "usuarios/email-form";
    }
}
