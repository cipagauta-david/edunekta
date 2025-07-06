package com.sena.dev.controllers;

import java.io.Serializable;
import java.util.List;
import java.util.ArrayList;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;

/**
 * Base enhanced controller that combines simplicity with advanced features
 * 
 * @author david
 */
public abstract class BaseEnhancedController<T> implements Serializable {
    
    protected T selected;
    protected boolean isEditing = false;
    protected String searchTerm = "";
    protected List<T> filteredItems;
    protected int currentPage = 1;
    protected int pageSize = 10;
    protected int totalPages;
    
    // Cached permissions to avoid repeated checks
    private Boolean canCreate = null;
    private Boolean canRead = null;
    private Boolean canUpdate = null;
    private Boolean canDelete = null;
    private Integer cachedUserId = null;
    
    /**
     * Get the selected entity
     */
    public T getSelected() {
        return selected;
    }
    
    /**
     * Set the selected entity
     */
    public void setSelected(T selected) {
        this.selected = selected;
    }
    
    /**
     * Check if currently editing
     */
    public boolean isIsEditing() {
        return isEditing;
    }
    
    /**
     * Set editing mode
     */
    public void setIsEditing(boolean isEditing) {
        this.isEditing = isEditing;
    }
    
    /**
     * Get search term
     */
    public String getSearchTerm() {
        return searchTerm;
    }
    
    /**
     * Set search term
     */
    public void setSearchTerm(String searchTerm) {
        this.searchTerm = searchTerm;
    }
    
    /**
     * Get filtered items
     */
    public List<T> getFilteredItems() {
        if (filteredItems == null) {
            search();
        }
        return filteredItems;
    }
    
    /**
     * Set filtered items
     */
    public void setFilteredItems(List<T> filteredItems) {
        this.filteredItems = filteredItems;
    }
    
    /**
     * Get current page
     */
    public int getCurrentPage() {
        return currentPage;
    }
    
    /**
     * Set current page
     */
    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }
    
    /**
     * Get page size
     */
    public int getPageSize() {
        return pageSize;
    }
    
    /**
     * Set page size
     */
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
    
    /**
     * Get total pages
     */
    public int getTotalPages() {
        return totalPages;
    }
    
    /**
     * Set total pages
     */
    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
    
    /**
     * Get all items from service
     */
    protected abstract List<T> getAllItems();
    
    /**
     * Get the module name for permission checking
     */
    protected abstract String getModuleName();
    
    /**
     * Create new entity instance
     */
    protected abstract T createNewEntity();
    
    /**
     * Save entity (create or update)
     */
    protected abstract void saveEntity(T entity);
    
    /**
     * Delete entity
     */
    protected abstract void deleteEntity(T entity);
    
    /**
     * Get the list page URL
     */
    protected abstract String getListPageUrl();
    
    /**
     * Check if entity matches search term
     */
    protected abstract boolean matchesSearch(T entity, String searchTerm);
    
    /**
     * Search functionality
     */
    public void search() {
        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
            List<T> allItems = getAllItems();
            filteredItems = new ArrayList<T>();
            for (T entity : allItems) {
                if (matchesSearch(entity, searchTerm)) {
                    filteredItems.add(entity);
                }
            }
        } else {
            filteredItems = getAllItems();
        }
        
        // Calculate pagination
        if (filteredItems != null) {
            totalPages = (int) Math.ceil((double) filteredItems.size() / pageSize);
            if (currentPage > totalPages) {
                currentPage = totalPages > 0 ? totalPages : 1;
            }
        }
    }
    
    /**
     * Clear search
     */
    public void clearSearch() {
        searchTerm = "";
        filteredItems = null;
        currentPage = 1;
    }
    
    /**
     * Get paginated items
     */
    public List<T> getPaginatedItems() {
        List<T> items = getFilteredItems();
        if (items == null || items.isEmpty()) {
            return items;
        }
        
        int startIndex = (currentPage - 1) * pageSize;
        int endIndex = Math.min(startIndex + pageSize, items.size());
        
        if (startIndex >= items.size()) {
            return new ArrayList<>();
        }
        
        return items.subList(startIndex, endIndex);
    }
    
    /**
     * Navigate to next page
     */
    public void nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
        }
    }
    
    /**
     * Navigate to previous page
     */
    public void previousPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }
    
    /**
     * Check if there's a next page
     */
    public boolean hasNextPage() {
        return currentPage < totalPages;
    }
    
    /**
     * Check if there's a previous page
     */
    public boolean hasPreviousPage() {
        return currentPage > 1;
    }
    
    /**
     * Get current user from session
     */
    protected com.sena.dev.entities.Usuario getCurrentUser() {
        FacesContext facesContext = FacesContext.getCurrentInstance();
        if (facesContext != null) {
            HttpSession session = (HttpSession) facesContext.getExternalContext().getSession(false);
            if (session != null) {
                Object loginObj = session.getAttribute("login");
                if (loginObj instanceof com.sena.dev.controllers.LoginController) {
                    return ((com.sena.dev.controllers.LoginController) loginObj).getUsuarioActual();
                }
            }
        }
        return null;
    }
    
    /**
     * Check if permissions need to be refreshed
     */
    private boolean needsPermissionRefresh() {
        com.sena.dev.entities.Usuario currentUser = getCurrentUser();
        if (currentUser == null) {
            return true;
        }
        return !currentUser.getIdUsuario().equals(cachedUserId);
    }
    
    /**
     * Refresh cached permissions (optimized for async preloading)
     */
    private void refreshPermissions() {
        com.sena.dev.entities.Usuario currentUser = getCurrentUser();
        if (currentUser != null) {
            cachedUserId = currentUser.getIdUsuario();
            
            // Check if permissions are already preloaded
            LoginController loginController = getLoginController();
            if (loginController != null && loginController.isPermissionsPreloaded()) {
                // Use preloaded permissions
                canCreate = com.sena.dev.utils.SecurityUtil.canPerformOperation(currentUser, getModuleName(), "CREATE");
                canRead = com.sena.dev.utils.SecurityUtil.canPerformOperation(currentUser, getModuleName(), "READ");
                canUpdate = com.sena.dev.utils.SecurityUtil.canPerformOperation(currentUser, getModuleName(), "UPDATE");
                canDelete = com.sena.dev.utils.SecurityUtil.canPerformOperation(currentUser, getModuleName(), "DELETE");
            } else {
                // Load permissions synchronously (fallback)
                canCreate = com.sena.dev.utils.SecurityUtil.canPerformOperation(currentUser, getModuleName(), "CREATE");
                canRead = com.sena.dev.utils.SecurityUtil.canPerformOperation(currentUser, getModuleName(), "READ");
                canUpdate = com.sena.dev.utils.SecurityUtil.canPerformOperation(currentUser, getModuleName(), "UPDATE");
                canDelete = com.sena.dev.utils.SecurityUtil.canPerformOperation(currentUser, getModuleName(), "DELETE");
            }
        } else {
            cachedUserId = null;
            canCreate = false;
            canRead = false;
            canUpdate = false;
            canDelete = false;
        }
    }
    
    /**
     * Get LoginController from session
     */
    private LoginController getLoginController() {
        FacesContext facesContext = FacesContext.getCurrentInstance();
        if (facesContext != null) {
            HttpSession session = (HttpSession) facesContext.getExternalContext().getSession(false);
            if (session != null) {
                Object loginObj = session.getAttribute("login");
                if (loginObj instanceof LoginController) {
                    return (LoginController) loginObj;
                }
            }
        }
        return null;
    }
    
    /**
     * Check if current user can perform a specific operation (cached)
     */
    public boolean canPerformOperation(String operation) {
        if (needsPermissionRefresh()) {
            refreshPermissions();
        }
        
        if ("CREATE".equals(operation)) {
            return canCreate != null && canCreate;
        } else if ("READ".equals(operation)) {
            return canRead != null && canRead;
        } else if ("UPDATE".equals(operation)) {
            return canUpdate != null && canUpdate;
        } else if ("DELETE".equals(operation)) {
            return canDelete != null && canDelete;
        }
        
        return false;
    }
    
    /**
     * Check if user can create
     */
    public boolean canCreate() {
        return canPerformOperation("CREATE");
    }
    
    /**
     * Check if user can read
     */
    public boolean canRead() {
        return canPerformOperation("READ");
    }
    
    /**
     * Check if user can update
     */
    public boolean canUpdate() {
        return canPerformOperation("UPDATE");
    }
    
    /**
     * Check if user can delete
     */
    public boolean canDelete() {
        return canPerformOperation("DELETE");
    }
    
    /**
     * Save entity with permission checking
     */
    public String save() {
        try {
            // Check permissions
            if (!canPerformOperation(isEditing ? "UPDATE" : "CREATE")) {
                addMessage("No tiene permisos para realizar esta operación", FacesMessage.SEVERITY_ERROR);
                return null;
            }
            
            saveEntity(selected);
            
            String message = isEditing ? "Registro actualizado exitosamente" : "Registro creado exitosamente";
            addMessage(message, FacesMessage.SEVERITY_INFO);
            
            // Reset form
            selected = createNewEntity();
            isEditing = false;
            filteredItems = null; // Refresh the list
            
            return getListPageUrl();
        } catch (Exception e) {
            addMessage("Error al guardar: " + e.getMessage(), FacesMessage.SEVERITY_ERROR);
            return null;
        }
    }
    
    /**
     * Edit entity with permission checking
     */
    public void edit(T entity) {
        // Check permissions
        if (!canPerformOperation("UPDATE")) {
            addMessage("No tiene permisos para editar registros", FacesMessage.SEVERITY_ERROR);
            return;
        }
        
        selected = entity;
        isEditing = true;
    }
    
    /**
     * Delete entity with permission checking
     */
    public String delete(T entity) {
        try {
            // Check permissions
            if (!canPerformOperation("DELETE")) {
                addMessage("No tiene permisos para eliminar registros", FacesMessage.SEVERITY_ERROR);
                return null;
            }
            
            deleteEntity(entity);
            addMessage("Registro eliminado exitosamente", FacesMessage.SEVERITY_INFO);
            filteredItems = null; // Refresh the list
            return getListPageUrl();
        } catch (Exception e) {
            addMessage("Error al eliminar: " + e.getMessage(), FacesMessage.SEVERITY_ERROR);
            return null;
        }
    }
    
    /**
     * Cancel operation
     */
    public String cancel() {
        selected = createNewEntity();
        isEditing = false;
        return getListPageUrl();
    }
    
    /**
     * Add message to FacesContext
     */
    protected void addMessage(String summary, FacesMessage.Severity severity) {
        FacesMessage message = new FacesMessage(severity, summary, null);
        FacesContext.getCurrentInstance().addMessage(null, message);
    }
} 