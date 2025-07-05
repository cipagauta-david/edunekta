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
import javax.annotation.PostConstruct;

import javax.enterprise.context.SessionScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

/**
 *
 * @author david
 */
@Named(value = "nivelAcademicoController")
@SessionScoped
public class NivelAcademicoController implements Serializable {
    private NivelAcademico nA = new NivelAcademico();
    private boolean isEditing = false;
    
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
    
    public List<NivelAcademico> listarNivelesAcademicos() {
        try {
            List<NivelAcademico> a = this.nAFL.findAll();
            System.out.println(a);
             return a;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    
    public String guardar() {
        try {
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
            
            return "views/nivelAcademico/index?faces-redirect=true";
        } catch (Exception e) {
            addMessage("Error al guardar: " + e.getMessage(), FacesMessage.SEVERITY_ERROR);
            return null;
        }
    }
    
    public void editar(NivelAcademico nivel) {
        this.nA = nivel;
        this.isEditing = true;
    }
    
    public String eliminar(NivelAcademico nivel) {
        try {
            this.nAFL.remove(nivel);
            addMessage("Nivel Académico eliminado exitosamente", FacesMessage.SEVERITY_INFO);
            return "views/nivelAcademico/index?faces-redirect=true";
        } catch (Exception e) {
            addMessage("Error al eliminar: " + e.getMessage(), FacesMessage.SEVERITY_ERROR);
            return null;
        }
    }
    
    public String cancelar() {
        this.nA = new NivelAcademico();
        this.isEditing = false;
        return "views/nivelAcademico/index?faces-redirect=true";
    }
    
    private void addMessage(String summary, FacesMessage.Severity severity) {
        FacesMessage message = new FacesMessage(severity, summary, null);
        FacesContext.getCurrentInstance().addMessage(null, message);
    }

    /**
     * Creates a new instance of NivelAcademicoController
     */
    public NivelAcademicoController() {
    }

    @PostConstruct
    public void init() {
        if (nAFL == null) {
            System.out.println("NivelAcademicoFacadeLocal no está inyectado correctamente.");
        }
    }
}
