package com.sena.dev.utils;

import com.sena.dev.entities.Usuario;
import com.sena.dev.entities.Rol;
import com.sena.dev.entities.Permiso;
import com.sena.dev.entities.RolPermiso;
import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Utility class for security and permission checking
 * 
 * @author david
 */
public class SecurityUtil {
    
    // Cache for user permissions to avoid repeated calculations
    private static final Map<Integer, Set<Permiso>> permissionCache = new ConcurrentHashMap<>();
    
    /**
     * Check if a user has a specific permission
     * 
     * @param usuario the user to check
     * @param modulo the module to check permission for
     * @param accion the action to check permission for
     * @return true if user has permission, false otherwise
     */
    public static boolean hasPermission(Usuario usuario, String modulo, String accion) {
        if (usuario == null || usuario.getUsuarioRolCollection() == null) {
            return false;
        }
        
        Set<Permiso> userPermissions = getUserPermissions(usuario);
        
        for (Permiso p : userPermissions) {
            if (p.getModulo().equals(modulo) && 
                (p.getAccion().equals(accion) || p.getAccion().equals("ALL")) &&
                ("ACTIVO".equals(p.getEstado()) || "Activo".equals(p.getEstado()))) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Check if a user has any permission for a module
     * 
     * @param usuario the user to check
     * @param modulo the module to check
     * @return true if user has any permission for the module, false otherwise
     */
    public static boolean hasModuleAccess(Usuario usuario, String modulo) {
        if (usuario == null || usuario.getUsuarioRolCollection() == null) {
            return false;
        }
        
        Set<Permiso> userPermissions = getUserPermissions(usuario);
        
        for (Permiso p : userPermissions) {
            System.out.println( p.getModulo()+ "is == to? " + modulo);
            System.out.println("Name: " + p.getNombre());
            System.out.println("Status: " + p.getEstado());
            if (p.getModulo().equals(modulo) && 
                ("ACTIVO".equals(p.getEstado()) || "Activo".equals(p.getEstado()))) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Get all permissions for a user (cached)
     * 
     * @param usuario the user
     * @return set of permissions
     */
    public static Set<Permiso> getUserPermissions(Usuario usuario) {
        if (usuario == null) {
            return new HashSet<>();
        }
        
        // Check cache first
        Integer userId = usuario.getIdUsuario();
        if (permissionCache.containsKey(userId)) {
            return permissionCache.get(userId);
        }
        
        Set<Permiso> permissions = new HashSet<>();
        
        if (usuario.getUsuarioRolCollection() != null) {
            for (com.sena.dev.entities.UsuarioRol usuarioRol : usuario.getUsuarioRolCollection()) {
                Rol rol = usuarioRol.getRolIdRol();
                
                // Check for both "ACTIVO" and "Activo" (case insensitive)
                boolean isRoleActive = rol != null && 
                    ("ACTIVO".equals(rol.getEstado()) || "Activo".equals(rol.getEstado()));
                
                if (isRoleActive && rol.getRolPermisoCollection() != null) {
                    for (RolPermiso rolPermiso : rol.getRolPermisoCollection()) {
                        Permiso permiso = rolPermiso.getPermisoIdPermiso();
                        
                        // Check for both "ACTIVO" and "Activo" (case insensitive)
                        boolean isPermissionActive = permiso != null && 
                            ("ACTIVO".equals(permiso.getEstado()) || "Activo".equals(permiso.getEstado()));
                        
                        if (isPermissionActive) {
                            permissions.add(permiso);
                        }
                    }
                }
            }
        }
        
        // Cache the result
        permissionCache.put(userId, permissions);
        return permissions;
    }
    
    /**
     * Preload permissions for a user (optimized for async loading)
     * 
     * @param usuario the user
     */
    public static void preloadUserPermissions(Usuario usuario) {
        if (usuario != null) {
            getUserPermissions(usuario); // This will cache the permissions
        }
    }
    
    /**
     * Clear permission cache for a specific user
     * 
     * @param usuario the user whose cache should be cleared
     */
    public static void clearUserPermissionCache(Usuario usuario) {
        if (usuario != null) {
            permissionCache.remove(usuario.getIdUsuario());
        }
    }
    
    /**
     * Clear all permission cache
     */
    public static void clearAllPermissionCache() {
        permissionCache.clear();
    }
    
    /**
     * Get all modules a user has access to
     * 
     * @param usuario the user
     * @return list of module names
     */
    public static List<String> getUserModules(Usuario usuario) {
        Set<Permiso> permissions = getUserPermissions(usuario);
        
        List<String> modules = new ArrayList<String>();
        for (Permiso permiso : permissions) {
            String modulo = permiso.getModulo();
            if (!modules.contains(modulo)) {
                modules.add(modulo);
            }
        }
        return modules;
    }
    
    /**
     * Check if user is admin (has ALL permissions)
     * 
     * @param usuario the user to check
     * @return true if user is admin, false otherwise
     */
    public static boolean isAdmin(Usuario usuario) {
        if (usuario == null || usuario.getUsuarioRolCollection() == null) {
            return false;
        }
        
        for (com.sena.dev.entities.UsuarioRol usuarioRol : usuario.getUsuarioRolCollection()) {
            if (usuarioRol.getRolIdRol() != null && 
                "ADMIN".equals(usuarioRol.getRolIdRol().getNombreRol()) &&
                ("ACTIVO".equals(usuarioRol.getRolIdRol().getEstado()) || "Activo".equals(usuarioRol.getRolIdRol().getEstado()))) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Get user's primary role (first active role)
     * 
     * @param usuario the user
     * @return the primary role or null if none
     */
    public static Rol getPrimaryRole(Usuario usuario) {
        if (usuario == null || usuario.getUsuarioRolCollection() == null) {
            return null;
        }
        
        for (com.sena.dev.entities.UsuarioRol usuarioRol : usuario.getUsuarioRolCollection()) {
            if (usuarioRol.getRolIdRol() != null && 
                ("ACTIVO".equals(usuarioRol.getRolIdRol().getEstado()) || "Activo".equals(usuarioRol.getRolIdRol().getEstado()))) {
                return usuarioRol.getRolIdRol();
            }
        }
        return null;
    }
    
    /**
     * Check if user can perform CRUD operations on a module
     * 
     * @param usuario the user
     * @param modulo the module
     * @param operation the operation (CREATE, READ, UPDATE, DELETE)
     * @return true if user can perform the operation, false otherwise
     */
    public static boolean canPerformOperation(Usuario usuario, String modulo, String operation) {
        boolean hasPermission = hasPermission(usuario, modulo, operation);
        boolean hasAllPermission = hasPermission(usuario, modulo, "ALL");
        
        return hasPermission || hasAllPermission;
    }
} 