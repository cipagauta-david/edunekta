package com.edunekta.dev.util;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Utility class for password validation and generation.
 * Hashing and verification is now handled by Spring Security's PasswordEncoder.
 */
@Component // Lo convertimos en un bean para poder inyectarlo si es necesario
public class PasswordUtil {

    // Los métodos hashPassword() y verifyPassword() han sido ELIMINADOS.
    // Esa lógica ahora reside en el PasswordEncoder bean.

    /**
     * Check if a password meets security requirements.
     * La lógica interna no cambia, sigue siendo válida.
     */
    public boolean isPasswordValid(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }
        boolean hasUpperCase = password.matches(".*[A-Z].*");
        boolean hasLowerCase = password.matches(".*[a-z].*");
        boolean hasDigit = password.matches(".*\\d.*");
        boolean hasSpecial = password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*");

        return hasUpperCase && hasLowerCase && hasDigit && hasSpecial;
    }

    /**
     * Generate a random password.
     * Lógica mejorada usando SecureRandom y Streams para más seguridad y
     * legibilidad.
     */
    public String generateRandomPassword() {
        String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lower = "abcdefghijklmnopqrstuvwxyz";
        String digits = "0123456789";
        String special = "!@#$%^&*";
        String allChars = upper + lower + digits + special;
        SecureRandom random = new SecureRandom();

        List<Character> passwordChars = new java.util.ArrayList<>();
        passwordChars.add(upper.charAt(random.nextInt(upper.length())));
        passwordChars.add(lower.charAt(random.nextInt(lower.length())));
        passwordChars.add(digits.charAt(random.nextInt(digits.length())));
        passwordChars.add(special.charAt(random.nextInt(special.length())));

        for (int i = 4; i < 12; i++) {
            passwordChars.add(allChars.charAt(random.nextInt(allChars.length())));
        }

        Collections.shuffle(passwordChars);
        return passwordChars.stream()
                .map(String::valueOf)
                .collect(Collectors.joining());
    }
}