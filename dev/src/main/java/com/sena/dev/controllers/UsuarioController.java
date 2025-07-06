package com.sena.dev.controllers;

import com.sena.dev.entities.Usuario;
import com.sena.dev.services.UsuarioFacadeLocal;
import com.sena.dev.entities.Institucion;
import com.sena.dev.services.InstitucionFacadeLocal;
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
    
    private String confirmPassword = "";
    private String confirmPassword2 = "";
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
        if (isEditing) {
            // For editing, only update password if provided
            if (confirmPassword != null && !confirmPassword.trim().isEmpty()) {
                usuarioService.updatePassword(usuario.getIdUsuario(), confirmPassword);
            }
            usuarioService.edit(usuario);
            // Clear caches when user is modified
            SecurityUtil.clearUserPermissionCache(usuario);
            Filtro.clearUserAccessCache(usuario.getIdUsuario());
        } else {
            // For creating, use hashed password
            usuarioService.createWithHashedPassword(usuario, confirmPassword);
        }
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
     * Get confirm password2
     */
    public String getConfirmPassword2() {
        return confirmPassword2;
    }
    
    /**
     * Set confirm password2
     */
    public void setConfirmPassword2(String confirmPassword2) {
        this.confirmPassword2 = confirmPassword2;
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
        try {
            // Check permissions
            if (!canPerformOperation(isEditing ? "UPDATE" : "CREATE")) {
                addMessage("No tiene permisos para realizar esta operación", FacesMessage.SEVERITY_ERROR);
                return null;
            }
            
            // Validate password for new users
            if (!isEditing && (confirmPassword == null || confirmPassword.trim().isEmpty())) {
                addMessage("La contraseña es obligatoria para nuevos usuarios", FacesMessage.SEVERITY_ERROR);
                return null;
            }
            
            // Validate password strength for new users
            if (!isEditing && !com.sena.dev.utils.PasswordUtil.isPasswordValid(confirmPassword)) {
                addMessage("La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales", FacesMessage.SEVERITY_ERROR);
                return null;
            }
            
            // Validate password confirmation
            if (!isEditing && !confirmPassword.equals(confirmPassword2)) {
                addMessage("Las contraseñas no coinciden", FacesMessage.SEVERITY_ERROR);
                return null;
            }
            
            saveEntity(selected);
            
            String message = isEditing ? "Usuario actualizado exitosamente" : "Usuario creado exitosamente";
            addMessage(message, FacesMessage.SEVERITY_INFO);
            
            // Reset form
            selected = createNewEntity();
            isEditing = false;
            confirmPassword = "";
            confirmPassword2 = "";
            showPassword = false;
            filteredItems = null; // Refresh the list
            
            return getListPageUrl();
        } catch (Exception e) {
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
        confirmPassword = ""; // Clear password field for editing
        confirmPassword2 = ""; // Clear confirm password field for editing
        showPassword = false;
    }
    
    /**
     * Override cancel to clear password field
     */
    @Override
    public String cancel() {
        selected = createNewEntity();
        isEditing = false;
        confirmPassword = "";
        confirmPassword2 = "";
        showPassword = false;
        return getListPageUrl();
    }
    
    /**
     * Generate random password
     */
    public void generatePassword() {
        confirmPassword = com.sena.dev.utils.PasswordUtil.generateRandomPassword();
        confirmPassword2 = confirmPassword;
        showPassword = true;
    }
    
    /**
     * Toggle password visibility
     */
    public void togglePasswordVisibility() {
        showPassword = !showPassword;
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
} 