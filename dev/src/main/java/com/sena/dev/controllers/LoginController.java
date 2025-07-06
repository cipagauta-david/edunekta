package com.sena.dev.controllers;

import java.io.Serializable;
import javax.inject.Named;
import javax.ejb.EJB;

import com.sena.dev.entities.Usuario;
import com.sena.dev.services.UsuarioFacadeLocal;
import com.sena.dev.utils.SecurityUtil;
import com.sena.dev.security.Filtro;

import javax.enterprise.context.SessionScoped;
import javax.faces.context.FacesContext;
import javax.faces.application.FacesMessage;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Callable;
import java.util.concurrent.Future;

/**
 *
 * @author david
 */
@Named(value = "login")
@SessionScoped
public class LoginController implements Serializable {

    private String usuario;
    private String contrasenna;
    private Integer usuarioId; // Store only the user ID instead of the full object
    private Usuario cachedUser = null; // Cache for user with roles
    private boolean userLoaded = false; // Flag to track if user is loaded
    private boolean permissionsPreloaded = false; // Flag to track if permissions are preloaded
    private ExecutorService executor = Executors.newSingleThreadExecutor();

    @EJB
    private UsuarioFacadeLocal ufl;
    
    public LoginController() {
    }
    
    public String iniciarSesion() {
        Usuario usuarioActual = this.ufl.iniciarSesion(usuario, contrasenna);
        if (usuarioActual != null) {
            // Store only the user ID in the session
            this.usuarioId = usuarioActual.getIdUsuario();
            // Clear cache to force reload
            this.cachedUser = null;
            this.userLoaded = false;
            this.permissionsPreloaded = false;
            FacesContext.getCurrentInstance().getExternalContext().getSessionMap().put("login", this);
            
            // Start async permission preloading
            preloadPermissionsAsync();
            
            return "welcome?faces-redirect=true";
        } else {
            FacesContext.getCurrentInstance().addMessage(null,
                new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error", 
                "Usuario o contraseña incorrectos"));
            return null;
        }
    }
    
    /**
     * Preload permissions asynchronously after login
     */
    private void preloadPermissionsAsync() {
        executor.submit(new Callable<Void>() {
            @Override
            public Void call() throws Exception {
                try {
                    // Get user with roles
                    Usuario userWithRoles = ufl.findWithRoles(usuarioId);
                    if (userWithRoles != null) {
                        // Preload permissions for common modules
                        SecurityUtil.preloadUserPermissions(userWithRoles);
                        permissionsPreloaded = true;
                    }
                } catch (Exception e) {
                    // Log error silently
                }
                return null;
            }
        });
    }
    
    /**
     * Preload permissions if needed (called from welcome page)
     */
    public void preloadPermissionsIfNeeded() {
        if (!permissionsPreloaded && usuarioId != null) {
            preloadPermissionsAsync();
        }
    }
    
    /**
     * Get the current user with roles and permissions loaded (cached)
     */
    public Usuario getUsuarioActual() {
        if (usuarioId != null && !userLoaded) {
            cachedUser = ufl.findWithRoles(usuarioId);
            userLoaded = true;
        }
        return cachedUser;
    }
    
    /**
     * Check if permissions are preloaded
     */
    public boolean isPermissionsPreloaded() {
        return permissionsPreloaded;
    }
    
    /**
     * Clear user cache (call when user data changes)
     */
    public void clearUserCache() {
        this.cachedUser = null;
        this.userLoaded = false;
        this.permissionsPreloaded = false;
    }
    
    /**
     * Logout and clear all caches
     */
    public String logout() {
        // Clear all caches
        SecurityUtil.clearAllPermissionCache();
        Filtro.clearAllAccessCache();
        
        // Clear session
        FacesContext.getCurrentInstance().getExternalContext().invalidateSession();
        
        return "/login?faces-redirect=true";
    }
    
    /**
     * Get the current user ID
     */
    public Integer getUsuarioId() {
        return usuarioId;
    }
    
    /**
     * Set the current user ID
     */
    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getContrasenna() {
        return contrasenna;
    }

    public void setContrasenna(String contrasenna) {
        this.contrasenna = contrasenna;
    }
    
    /**
     * Get current date for display in views
     */
    public String getFechaActual() {
        return new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm").format(new java.util.Date());
    }
}
