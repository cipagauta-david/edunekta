package com.sena.dev.security;

import com.sena.dev.entities.Usuario;
import com.sena.dev.services.UsuarioFacadeLocal;
import com.sena.dev.controllers.LoginController;
import com.sena.dev.utils.SecurityUtil;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Iterator;
import javax.ejb.EJB;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Security filter for protecting resources based on user permissions
 * 
 * @author david
 */
@WebFilter("/*")
public class Filtro implements Filter {
    
    @EJB
    private UsuarioFacadeLocal usuarioFacade;
    
    // Cache for user access decisions to avoid repeated checks
    private static final Map<String, Boolean> accessCache = new ConcurrentHashMap<>();
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // No initialization needed
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) 
            throws IOException, ServletException {
        
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        // Evitar caché en páginas protegidas
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setDateHeader("Expires", 0);

        String loginURI = req.getContextPath() + "/login.xhtml";
        String resourceURI = req.getRequestURI();

        boolean loginRequest = resourceURI.endsWith("login.xhtml") || resourceURI.contains("javax.faces.resource");

        HttpSession session = req.getSession(false);
        boolean loggedIn = false;
        Usuario currentUser = null;
        
        if (session != null && session.getAttribute("login") != null) {
            Object loginObj = session.getAttribute("login");
            try {
                LoginController loginController = (LoginController) loginObj;
                // Get the user ID from the controller
                Integer userId = loginController.getUsuarioId();
                
                if (userId != null) {
                    // Use cached user from LoginController
                    currentUser = loginController.getUsuarioActual();
                    loggedIn = currentUser != null;
                }
            } catch (Exception e) {
                loggedIn = false;
            }
        }

        if (loginRequest) {
            chain.doFilter(request, response);
        } else if (loggedIn && currentUser != null) {
            // Check if user has access to the requested resource
            if (hasAccessToResource(currentUser, resourceURI)) {
                chain.doFilter(request, response);
            } else {
                res.sendRedirect(loginURI);
            }
        } else {
            res.sendRedirect(loginURI);
        }
    }

    private boolean hasAccessToResource(Usuario user, String resourceURI) {
        // Create cache key
        String cacheKey = user.getIdUsuario() + ":" + resourceURI;
        
        // Check cache first
        if (accessCache.containsKey(cacheKey)) {
            return accessCache.get(cacheKey);
        }
        
        boolean hasAccess = false;
        
        // Define module mappings
        if (resourceURI.contains("/views/usuarios/")) {
            hasAccess = SecurityUtil.hasModuleAccess(user, "USUARIOS");
        } else if (resourceURI.contains("/views/roles/")) {
            hasAccess = SecurityUtil.hasModuleAccess(user, "ROLES");
        } else if (resourceURI.contains("/views/permisos/")) {
            hasAccess = SecurityUtil.hasModuleAccess(user, "PERMISOS");
        } else if (resourceURI.contains("/views/nivelAcademico/")) {
            hasAccess = SecurityUtil.hasModuleAccess(user, "NIVELES_ACADEMICOS");
        } else if (resourceURI.contains("/admin.xhtml")) {
            hasAccess = SecurityUtil.isAdmin(user);
        } else {
            // Default: allow access if user is logged in
            hasAccess = true;
        }
        
        // Cache the result
        accessCache.put(cacheKey, hasAccess);
        return hasAccess;
    }
    
    /**
     * Clear access cache for a specific user
     */
    public static void clearUserAccessCache(Integer userId) {
        String userIdStr = userId + ":";
        Iterator<Map.Entry<String, Boolean>> iterator = accessCache.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, Boolean> entry = iterator.next();
            if (entry.getKey().startsWith(userIdStr)) {
                iterator.remove();
            }
        }
    }
    
    /**
     * Clear all access cache
     */
    public static void clearAllAccessCache() {
        accessCache.clear();
    }

    @Override
    public void destroy() {
        // No cleanup needed
    }
}
