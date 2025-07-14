package com.sena.dev.controllers;

import com.sena.dev.entities.Usuario;
import com.sena.dev.services.UsuarioFacadeLocal;
import com.sena.dev.entities.Institucion;
import com.sena.dev.services.InstitucionFacadeLocal;
import com.sena.dev.entities.Grado;
import com.sena.dev.services.GradoFacadeLocal;
import com.sena.dev.entities.Grupo;
import com.sena.dev.services.GrupoFacadeLocal;
import java.util.List;
import java.util.ArrayList;
import javax.ejb.EJB;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import com.sena.dev.utils.SecurityUtil;
import com.sena.dev.security.Filtro;

/**
 * Optimized UsuarioController with enhanced features and password management
 * 
 * @author david
 */
@Named(value = "usuarioController")
@SessionScoped
public class UsuarioController extends BaseEnhancedController<Usuario> {
    
    @EJB
    private UsuarioFacadeLocal usuarioService;
    
    @EJB
    private InstitucionFacadeLocal institucionService;
    
    @EJB
    private GradoFacadeLocal gradoService;
    
    @EJB
    private GrupoFacadeLocal grupoService;
    
    private String password = "";
    private String confirmPassword = "";
    private boolean showPassword = false;
    
    public UsuarioController() {
        // Initialize with a new user
        selected = createNewEntity();
    }
    
    @Override
    protected List<Usuario> getAllItems() {
        return usuarioService.findAll();
    }
    
    @Override
    protected String getModuleName() {
        return "USUARIOS";
    }
    
    @Override
    protected Usuario createNewEntity() {
        return new Usuario();
    }
    
    @Override
    protected void saveEntity(Usuario usuario) {
        System.out.println("=== SAVE ENTITY ===");
        System.out.println("Is editing: " + isEditing);
        System.out.println("Usuario ID: " + usuario.getIdUsuario());
        System.out.println("Usuario email: " + usuario.getEmail());
        
        if (isEditing) {
            // For editing, only update password if provided
            if (password != null && !password.trim().isEmpty()) {
                System.out.println("Updating password for existing user");
                usuarioService.updatePassword(usuario.getIdUsuario(), password);
            }
            System.out.println("Editing existing user");
            usuarioService.edit(usuario);
            // Clear caches when user is modified
            SecurityUtil.clearUserPermissionCache(usuario);
            Filtro.clearUserAccessCache(usuario.getIdUsuario());
        } else {
            // For creating, use hashed password
            System.out.println("Creating new user with hashed password");
            usuarioService.createWithHashedPassword(usuario, password);
        }
        System.out.println("=== SAVE ENTITY COMPLETE ===");
    }
    
    @Override
    protected void deleteEntity(Usuario usuario) {
        usuarioService.remove(usuario);
        // Clear caches when user is deleted
        SecurityUtil.clearUserPermissionCache(usuario);
        Filtro.clearUserAccessCache(usuario.getIdUsuario());
    }
    
    @Override
    protected String getListPageUrl() {
        return "views/usuarios/index?faces-redirect=true";
    }
    
    @Override
    protected boolean matchesSearch(Usuario usuario, String searchTerm) {
        String term = searchTerm.toLowerCase();
        return (usuario.getNombre() != null && usuario.getNombre().toLowerCase().contains(term)) ||
               (usuario.getApellido() != null && usuario.getApellido().toLowerCase().contains(term)) ||
               (usuario.getEmail() != null && usuario.getEmail().toLowerCase().contains(term));
    }
    
    /**
     * Get password
     */
    public String getPassword() {
        return password;
    }
    
    /**
     * Set password
     */
    public void setPassword(String password) {
        this.password = password;
    }
    
    /**
     * Get confirm password
     */
    public String getConfirmPassword() {
        return confirmPassword;
    }
    
    /**
     * Set confirm password
     */
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
    
    /**
     * Check if password should be shown
     */
    public boolean isShowPassword() {
        return showPassword;
    }
    
    /**
     * Set show password flag
     */
    public void setShowPassword(boolean showPassword) {
        this.showPassword = showPassword;
    }
    
    /**
     * Override save to handle password validation
     */
    @Override
    public String save() {
        System.out.println("=== SAVE METHOD STARTED ===");
        
        try {
            // Check permissions
            if (!canPerformOperation(isEditing ? "UPDATE" : "CREATE")) {
                System.out.println("Permission check failed");
                addMessage("No tiene permisos para realizar esta operación", FacesMessage.SEVERITY_ERROR);
                return null;
            }
            
            System.out.println("Permission check passed");
            
            // Validate required fields for new users
            if (!isEditing) {
                System.out.println("Validating new user fields");
                
                if (selected.getNombre() == null || selected.getNombre().trim().isEmpty()) {
                    System.out.println("Nombre validation failed");
                    addMessage("El nombre es obligatorio", FacesMessage.SEVERITY_ERROR);
                    return null;
                }
                if (selected.getApellido() == null || selected.getApellido().trim().isEmpty()) {
                    System.out.println("Apellido validation failed");
                    addMessage("El apellido es obligatorio", FacesMessage.SEVERITY_ERROR);
                    return null;
                }
                if (selected.getEmail() == null || selected.getEmail().trim().isEmpty()) {
                    System.out.println("Email validation failed");
                    addMessage("El email es obligatorio", FacesMessage.SEVERITY_ERROR);
                    return null;
                }
                
                // Validate password for new users
                if (password == null || password.trim().isEmpty()) {
                    System.out.println("Password validation failed");
                    addMessage("La contraseña es obligatoria para nuevos usuarios", FacesMessage.SEVERITY_ERROR);
                    return null;
                }
                
                // Validate password strength for new users
                if (!com.sena.dev.utils.PasswordUtil.isPasswordValid(password)) {
                    System.out.println("Password strength validation failed");
                    addMessage("La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales", FacesMessage.SEVERITY_ERROR);
                    return null;
                }
                
                // Validate password confirmation
                if (!password.equals(confirmPassword)) {
                    System.out.println("Password confirmation validation failed");
                    addMessage("Las contraseñas no coinciden", FacesMessage.SEVERITY_ERROR);
                    return null;
                }
                
                // Validate required fields for new users
                if (selected.getGradoIdGrado() == null) {
                    System.out.println("Grado validation failed");
                    addMessage("El grado es obligatorio", FacesMessage.SEVERITY_ERROR);
                    return null;
                }
                if (selected.getGrupoIdGrupo() == null) {
                    System.out.println("Grupo validation failed");
                    addMessage("El grupo es obligatorio", FacesMessage.SEVERITY_ERROR);
                    return null;
                }
                
                System.out.println("All validations passed for new user");
            } else {
                System.out.println("Editing existing user - skipping new user validations");
            }
            
            // Log the save attempt
            System.out.println("=== SAVE ATTEMPT ===");
            System.out.println("Attempting to save user: " + selected.getEmail());
            System.out.println("Is editing: " + isEditing);
            System.out.println("User data: " + selected.toString());
            System.out.println("Password length: " + (password != null ? password.length() : "null"));
            System.out.println("Confirm password length: " + (confirmPassword != null ? confirmPassword.length() : "null"));
            System.out.println("Grado: " + (selected.getGradoIdGrado() != null ? selected.getGradoIdGrado().getNombre() : "null"));
            System.out.println("Grupo: " + (selected.getGrupoIdGrupo() != null ? selected.getGrupoIdGrupo().getNombreGrupo() : "null"));
            System.out.println("Institucion: " + (selected.getInstitucionIdInstitucion() != null ? selected.getInstitucionIdInstitucion().getNombre() : "null"));
            System.out.println("===================");
            
            System.out.println("Calling saveEntity...");
            saveEntity(selected);
            System.out.println("saveEntity completed successfully");
            
            String message = isEditing ? "Usuario actualizado exitosamente" : "Usuario creado exitosamente";
            addMessage(message, FacesMessage.SEVERITY_INFO);
            
            System.out.println("Resetting form...");
            // Reset form
            selected = createNewEntity();
            isEditing = false;
            password = "";
            confirmPassword = "";
            showPassword = false;
            filteredItems = null; // Refresh the list
            
            System.out.println("=== SAVE METHOD COMPLETED SUCCESSFULLY ===");
            // Return null to stay on the same page and avoid navigation issues
            return null;
        } catch (Exception e) {
            // Log the full exception for debugging
            System.err.println("=== SAVE METHOD FAILED ===");
            System.err.println("Error saving user: " + e.getMessage());
            e.printStackTrace();
            addMessage("Error al guardar: " + e.getMessage(), FacesMessage.SEVERITY_ERROR);
            return null;
        }
    }
    
    /**
     * Override edit to handle password field
     */
    @Override
    public void edit(Usuario usuario) {
        // Check permissions
        if (!canPerformOperation("UPDATE")) {
            addMessage("No tiene permisos para editar usuarios", FacesMessage.SEVERITY_ERROR);
            return;
        }
        
        selected = usuario;
        isEditing = true;
        password = ""; // Clear password field for editing
        confirmPassword = ""; // Clear confirm password field for editing
        showPassword = false;
    }
    
    /**
     * Override cancel to clear password field
     */
    @Override
    public String cancel() {
        selected = createNewEntity();
        isEditing = false;
        password = "";
        confirmPassword = "";
        showPassword = false;
        return null; // Stay on the same page
    }
    
    /**
     * Generate random password
     */
    public String generatePassword() {
        try {
            password = com.sena.dev.utils.PasswordUtil.generateRandomPassword();
            confirmPassword = password;
            showPassword = true;
            
            // Add success message
            addMessage("Contraseña generada exitosamente", FacesMessage.SEVERITY_INFO);
            
            return null; // Stay on the same page
        } catch (Exception e) {
            System.err.println("Error generating password: " + e.getMessage());
            e.printStackTrace();
            addMessage("Error al generar contraseña: " + e.getMessage(), FacesMessage.SEVERITY_ERROR);
            return null;
        }
    }
    
    /**
     * Toggle password visibility
     */
    public String togglePasswordVisibility() {
        try {
            showPassword = !showPassword;
            return null; // Stay on the same page
        } catch (Exception e) {
            System.err.println("Error toggling password visibility: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * Get user roles as string
     */
    public String getUserRoles(Usuario usuario) {
        if (usuario.getUsuarioRolCollection() == null || usuario.getUsuarioRolCollection().isEmpty()) {
            return null;
        }
        
        StringBuilder roles = new StringBuilder();
        boolean first = true;
        for (com.sena.dev.entities.UsuarioRol usuarioRol : usuario.getUsuarioRolCollection()) {
            if (!first) {
                roles.append(", ");
            }
            roles.append(usuarioRol.getRolIdRol().getNombreRol());
            first = false;
        }
        return roles.toString();
    }
    
    /**
     * Get user's full name
     */
    public String getUserFullName(Usuario usuario) {
        return usuario.getNombre() + " " + usuario.getApellido();
    }
    
    /**
     * Get list of institutions for dropdown
     */
    public List<Institucion> getInstituciones() {
        return institucionService.findAll();
    }
    
    /**
     * Get list of grades for dropdown
     */
    public List<Grado> getGrados() {
        return gradoService.findAll();
    }
    
    /**
     * Get list of groups for dropdown
     */
    public List<Grupo> getGrupos() {
        return grupoService.findAll();
    }
    
    /**
     * Check if required data exists for user creation
     */
    public boolean isDataAvailable() {
        try {
            List<Grado> grados = getGrados();
            List<Grupo> grupos = getGrupos();
            
            System.out.println("Available grados: " + grados.size());
            System.out.println("Available grupos: " + grupos.size());
            
            return !grados.isEmpty() && !grupos.isEmpty();
        } catch (Exception e) {
            System.err.println("Error checking data availability: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * Test database connection (for debugging)
     */
    public void testDatabaseConnection() {
        try {
            // Test basic operations
            List<Usuario> users = usuarioService.findAll();
            List<Institucion> institutions = institucionService.findAll();
            List<Grado> grades = gradoService.findAll();
            List<Grupo> groups = grupoService.findAll();
            
            System.out.println("Database connection test successful:");
            System.out.println("- Users: " + users.size());
            System.out.println("- Institutions: " + institutions.size());
            System.out.println("- Grades: " + grades.size());
            System.out.println("- Groups: " + groups.size());
            
            addMessage("Conexión a la base de datos exitosa", FacesMessage.SEVERITY_INFO);
        } catch (Exception e) {
            System.err.println("Database connection test failed: " + e.getMessage());
            e.printStackTrace();
            addMessage("Error en la conexión a la base de datos: " + e.getMessage(), FacesMessage.SEVERITY_ERROR);
        }
    }
} 