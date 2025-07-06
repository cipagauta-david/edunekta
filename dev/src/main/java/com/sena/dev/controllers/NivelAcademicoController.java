/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSF/JSFManagedBean.java to edit this template
 */
package com.sena.dev.controllers;

import com.sena.dev.entities.NivelAcademico;
import java.io.Serializable;
import javax.inject.Named;
import javax.ejb.EJB;

import com.sena.dev.services.NivelAcademicoFacadeLocal;
import java.util.List;
import java.util.ArrayList;
import javax.annotation.PostConstruct;

import javax.enterprise.context.SessionScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

/**
 * Enhanced NivelAcademicoController with security and advanced features
 * 
 * @author david
 */
@Named(value = "nivelAcademicoController")
@SessionScoped
public class NivelAcademicoController extends BaseEnhancedController<NivelAcademico> {
    private NivelAcademico nA = new NivelAcademico();
    private boolean isEditing = false;
    private boolean showForm = false;
    private String searchTerm = "";
    private List<NivelAcademico> filteredItems;
    
    @EJB
    private NivelAcademicoFacadeLocal nAFL;

    public NivelAcademico getnA() {
        return nA;
    }

    public void setnA(NivelAcademico nA) {
        this.nA = nA;
    }
    
    public boolean isIsEditing() {
        return isEditing;
    }

    public void setIsEditing(boolean isEditing) {
        this.isEditing = isEditing;
    }
    
    public boolean isShowForm() {
        return showForm;
    }

    public void setShowForm(boolean showForm) {
        this.showForm = showForm;
    }
    
    public String getSearchTerm() {
        return searchTerm;
    }

    public void setSearchTerm(String searchTerm) {
        this.searchTerm = searchTerm;
    }
    
    public List<NivelAcademico> getFilteredItems() {
        if (filteredItems == null) {
            search();
        }
        return filteredItems;
    }

    public void setFilteredItems(List<NivelAcademico> filteredItems) {
        this.filteredItems = filteredItems;
    }
    
    @Override
    protected List<NivelAcademico> getAllItems() {
        try {
            return this.nAFL.findAll();
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
    
    @Override
    protected String getModuleName() {
        return "NIVELES_ACADEMICOS";
    }
    
    @Override
    protected NivelAcademico createNewEntity() {
        return new NivelAcademico();
    }
    
    @Override
    protected void saveEntity(NivelAcademico entity) {
        if (isEditing) {
            this.nAFL.edit(entity);
        } else {
            this.nAFL.create(entity);
        }
    }
    
    @Override
    protected void deleteEntity(NivelAcademico entity) {
        this.nAFL.remove(entity);
    }
    
    @Override
    protected String getListPageUrl() {
        return "views/nivelAcademico/index?faces-redirect=true";
    }
    
    @Override
    protected boolean matchesSearch(NivelAcademico entity, String searchTerm) {
        String term = searchTerm.toLowerCase();
        return (entity.getNombre() != null && entity.getNombre().toLowerCase().contains(term)) ||
               (entity.getDescripcion() != null && entity.getDescripcion().toLowerCase().contains(term));
    }
    
    /**
     * Search functionality
     */
    public void search() {
        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
            List<NivelAcademico> allItems = getAllItems();
            filteredItems = new ArrayList<NivelAcademico>();
            for (NivelAcademico nivel : allItems) {
                if (matchesSearch(nivel, searchTerm)) {
                    filteredItems.add(nivel);
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
    public List<NivelAcademico> getPaginatedItems() {
        List<NivelAcademico> items = getFilteredItems();
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
    
    public String guardar() {
        try {
            // Check permissions
            if (!canPerformOperation(isEditing ? "UPDATE" : "CREATE")) {
                addMessage("No tiene permisos para realizar esta operación", FacesMessage.SEVERITY_ERROR);
                return null;
            }
            
            if (isEditing) {
                // Actualizar
                this.nAFL.edit(nA);
                addMessage("Nivel Académico actualizado exitosamente", FacesMessage.SEVERITY_INFO);
            } else {
                // Crear nuevo
                this.nAFL.create(nA);
                addMessage("Nivel Académico creado exitosamente", FacesMessage.SEVERITY_INFO);
            }
            
            // Limpiar el formulario
            this.nA = new NivelAcademico();
            this.isEditing = false;
            this.showForm = false;
            this.filteredItems = null; // Refresh the list
            
            return null; // Permanece en la misma página
        } catch (Exception e) {
            addMessage("Error al guardar: " + e.getMessage(), FacesMessage.SEVERITY_ERROR);
            return null;
        }
    }
    
    public String editar(NivelAcademico nivel) {
        // Check permissions
        if (!canPerformOperation("UPDATE")) {
            addMessage("No tiene permisos para editar niveles académicos", FacesMessage.SEVERITY_ERROR);
            return null;
        }
        
        this.nA = nivel;
        this.isEditing = true;
        this.showForm = true;
        return null; // Permanece en la misma página
    }
    
    public String eliminar(NivelAcademico nivel) {
        try {
            // Check permissions
            if (!canPerformOperation("DELETE")) {
                addMessage("No tiene permisos para eliminar niveles académicos", FacesMessage.SEVERITY_ERROR);
                return null;
            }
            
            this.nAFL.remove(nivel);
            addMessage("Nivel Académico eliminado exitosamente", FacesMessage.SEVERITY_INFO);
            this.filteredItems = null; // Refresh the list
            return null; // Permanece en la misma página
        } catch (Exception e) {
            addMessage("Error al eliminar: " + e.getMessage(), FacesMessage.SEVERITY_ERROR);
            return null;
        }
    }
    
    public String cancelar() {
        this.nA = new NivelAcademico();
        this.isEditing = false;
        this.showForm = false;
        return null; // Permanece en la misma página
    }
    
    public String mostrarFormulario() {
        this.showForm = true;
        this.isEditing = false;
        this.nA = new NivelAcademico();
        return null;
    }
    
    public String ocultarFormulario() {
        this.showForm = false;
        this.isEditing = false;
        this.nA = new NivelAcademico();
        return null;
    }

    /**
     * Creates a new instance of NivelAcademicoController
     */
    public NivelAcademicoController() {
        // Initialize with a new entity
        selected = createNewEntity();
    }

    @PostConstruct
    public void init() {
        if (nAFL == null) {
            System.out.println("NivelAcademicoFacadeLocal no está inyectado correctamente.");
        }
    }
}
