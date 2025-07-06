package com.sena.dev.controllers;

import com.sena.dev.entities.Usuario;
import com.sena.dev.utils.SecurityUtil;
import java.io.Serializable;
import java.util.List;
import java.util.ArrayList;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;

/**
 * Controller for dynamic navigation based on user roles
 * 
 * @author david
 */
@Named(value = "navigationController")
@SessionScoped
public class NavigationController implements Serializable {
    
    private List<MenuItem> menuItems;
    private Integer cachedUserId = null;
    
    public NavigationController() {
    }
    
    /**
     * Get current user from session
     */
    private Usuario getCurrentUser() {
        FacesContext facesContext = FacesContext.getCurrentInstance();
        if (facesContext != null) {
            HttpSession session = (HttpSession) facesContext.getExternalContext().getSession(false);
            if (session != null) {
                Object loginObj = session.getAttribute("login");
                if (loginObj instanceof LoginController) {
                    return ((LoginController) loginObj).getUsuarioActual();
                }
            }
        }
        return null;
    }
    
    /**
     * Get dynamic menu items based on user permissions (cached)
     */
    public List<MenuItem> getMenuItems() {
        Usuario currentUser = getCurrentUser();
        
        // Check if we need to rebuild the menu
        if (menuItems == null || currentUser == null || 
            !currentUser.getIdUsuario().equals(cachedUserId)) {
            menuItems = buildMenuItems();
            cachedUserId = currentUser != null ? currentUser.getIdUsuario() : null;
        }
        return menuItems;
    }
    
    /**
     * Build menu items based on user permissions
     */
    private List<MenuItem> buildMenuItems() {
        List<MenuItem> items = new ArrayList<>();
        Usuario currentUser = getCurrentUser();
        
        if (currentUser == null) {
            return items;
        }
        
        // Dashboard - always available for logged in users
        items.add(new MenuItem("Dashboard", "/welcome.xhtml", "fas fa-tachometer-alt"));
        
        // User management - only for users with USUARIOS permission
        if (SecurityUtil.hasModuleAccess(currentUser, "USUARIOS")) {
            items.add(new MenuItem("Usuarios", "/views/usuarios/index.xhtml", "fas fa-users"));
        }
        
        // Role management - only for admins
        if (SecurityUtil.isAdmin(currentUser)) {
            items.add(new MenuItem("Roles", "/views/roles/index.xhtml", "fas fa-user-tag"));
            items.add(new MenuItem("Permisos", "/views/permisos/index.xhtml", "fas fa-key"));
        }
        
        // Academic level management
        if (SecurityUtil.hasModuleAccess(currentUser, "NIVEL_ACADEMICO")) {
            items.add(new MenuItem("Niveles Académicos", "/views/nivelAcademico/index.xhtml", "fas fa-graduation-cap"));
        }
        
        // Institutions
        if (SecurityUtil.hasModuleAccess(currentUser, "INSTITUCIONES")) {
            items.add(new MenuItem("Instituciones", "/views/instituciones/index.xhtml", "fas fa-building"));
        }
        
        // Grades
        if (SecurityUtil.hasModuleAccess(currentUser, "GRADOS")) {
            items.add(new MenuItem("Grados", "/views/grados/index.xhtml", "fas fa-layer-group"));
        }
        
        // Groups
        if (SecurityUtil.hasModuleAccess(currentUser, "GRUPOS")) {
            items.add(new MenuItem("Grupos", "/views/grupos/index.xhtml", "fas fa-users-cog"));
        }
        
        // Classes
        if (SecurityUtil.hasModuleAccess(currentUser, "CLASES")) {
            items.add(new MenuItem("Clases", "/views/clases/index.xhtml", "fas fa-chalkboard-teacher"));
        }
        
        // Classrooms
        if (SecurityUtil.hasModuleAccess(currentUser, "AULAS")) {
            items.add(new MenuItem("Aulas", "/views/aulas/index.xhtml", "fas fa-door-open"));
        }
        
        return items;
    }
    
    /**
     * Refresh menu items (call this when user permissions change)
     */
    public void refreshMenu() {
        menuItems = null;
        cachedUserId = null;
    }
    
    /**
     * Check if user can access a specific module
     */
    public boolean canAccessModule(String module) {
        Usuario currentUser = getCurrentUser();
        return currentUser != null && SecurityUtil.hasModuleAccess(currentUser, module);
    }
    
    /**
     * Check if user can perform a specific operation
     */
    public boolean canPerformOperation(String module, String operation) {
        Usuario currentUser = getCurrentUser();
        return currentUser != null && SecurityUtil.canPerformOperation(currentUser, module, operation);
    }
    
    /**
     * Get user's display name
     */
    public String getUserDisplayName() {
        Usuario currentUser = getCurrentUser();
        if (currentUser != null) {
            return currentUser.getNombre() + " " + currentUser.getApellido();
        }
        return "";
    }
    
    /**
     * Get user's primary role
     */
    public String getUserPrimaryRole() {
        Usuario currentUser = getCurrentUser();
        if (currentUser != null) {
            com.sena.dev.entities.Rol primaryRole = SecurityUtil.getPrimaryRole(currentUser);
            return primaryRole != null ? primaryRole.getNombreRol() : "";
        }
        return "";
    }
    
    /**
     * Inner class for menu items
     */
    public static class MenuItem {
        private String name;
        private String url;
        private String icon;
        
        public MenuItem(String name, String url, String icon) {
            this.name = name;
            this.url = url;
            this.icon = icon;
        }
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public String getUrl() {
            return url;
        }
        
        public void setUrl(String url) {
            this.url = url;
        }
        
        public String getIcon() {
            return icon;
        }
        
        public void setIcon(String icon) {
            this.icon = icon;
        }
    }
} 