package com.sena.dev.utils;

import org.mindrot.jbcrypt.BCrypt;

/**
 * Utility class for password hashing and verification using BCrypt
 * 
 * @author david
 */
public class PasswordUtil {
    
    private static final int WORKLOAD = 12; // BCrypt workload factor
    
    /**
     * Hash a password using BCrypt
     * 
     * @param plainPassword the plain text password
     * @return the hashed password
     */
    public static String hashPassword(String plainPassword) {
        if (plainPassword == null || plainPassword.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt(WORKLOAD));
    }
    
    /**
     * Verify a password against a hash
     * 
     * @param plainPassword the plain text password to verify
     * @param hashedPassword the hashed password to check against
     * @return true if the password matches, false otherwise
     */
    public static boolean verifyPassword(String plainPassword, String hashedPassword) {
        if (plainPassword == null || hashedPassword == null) {
            return false;
        }
        try {
            return BCrypt.checkpw(plainPassword, hashedPassword);
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if a password meets security requirements
     * 
     * @param password the password to validate
     * @return true if password meets requirements, false otherwise
     */
    public static boolean isPasswordValid(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }
        
        // Check for at least one uppercase letter
        boolean hasUpperCase = password.matches(".*[A-Z].*");
        // Check for at least one lowercase letter
        boolean hasLowerCase = password.matches(".*[a-z].*");
        // Check for at least one digit
        boolean hasDigit = password.matches(".*\\d.*");
        // Check for at least one special character
        boolean hasSpecial = password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*");
        
        return hasUpperCase && hasLowerCase && hasDigit && hasSpecial;
    }
    
    /**
     * Generate a random password
     * 
     * @return a random password that meets security requirements
     */
    public static String generateRandomPassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        StringBuilder password = new StringBuilder();
        
        // Ensure at least one of each required character type
        password.append("ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt((int) (Math.random() * 26))); // Uppercase
        password.append("abcdefghijklmnopqrstuvwxyz".charAt((int) (Math.random() * 26))); // Lowercase
        password.append("0123456789".charAt((int) (Math.random() * 10))); // Digit
        password.append("!@#$%^&*".charAt((int) (Math.random() * 8))); // Special
        
        // Fill the rest randomly
        for (int i = 4; i < 12; i++) {
            password.append(chars.charAt((int) (Math.random() * chars.length())));
        }
        
        // Shuffle the password
        String shuffled = shuffleString(password.toString());
        return shuffled;
    }
    
    private static String shuffleString(String input) {
        char[] characters = input.toCharArray();
        for (int i = characters.length - 1; i > 0; i--) {
            int j = (int) (Math.random() * (i + 1));
            char temp = characters[i];
            characters[i] = characters[j];
            characters[j] = temp;
        }
        return new String(characters);
    }
} 