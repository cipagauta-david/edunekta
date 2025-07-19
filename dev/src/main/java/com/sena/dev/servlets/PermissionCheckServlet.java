package com.sena.dev.servlets;

import com.sena.dev.controllers.LoginController;
import com.sena.dev.entities.Usuario;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet for handling permission checks via AJAX
 * 
 * @author david
 */
@WebServlet(name = "PermissionCheckServlet", urlPatterns = {"/permission-check"})
public class PermissionCheckServlet extends HttpServlet {

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        PrintWriter out = response.getWriter();
        StringBuilder json = new StringBuilder();
        
        try {
            HttpSession session = request.getSession(false);
            if (session == null) {
                json.append("{\"error\":\"No session found\",\"permissionsLoaded\":false}");
                out.print(json.toString());
                return;
            }
            
            LoginController loginController = (LoginController) session.getAttribute("login");
            if (loginController == null) {
                json.append("{\"error\":\"No login controller found\",\"permissionsLoaded\":false}");
                out.print(json.toString());
                return;
            }
            
            // Check if permissions are loaded
            boolean permissionsLoaded = loginController.isPermissionsPreloaded();
            
            if (permissionsLoaded) {
                // Get available modules
                List<String> modules = loginController.getAvailableModules();
                boolean isAdmin = loginController.isAdmin();
                
                // Build JSON response
                json.append("{");
                json.append("\"permissionsLoaded\":true,");
                json.append("\"isAdmin\":").append(isAdmin).append(",");
                json.append("\"modules\":[");
                
                if (modules != null && !modules.isEmpty()) {
                    for (int i = 0; i < modules.size(); i++) {
                        if (i > 0) json.append(",");
                        json.append("\"").append(modules.get(i)).append("\"");
                    }
                }
                
                json.append("]");
                
                // Add user info
                Usuario currentUser = loginController.getUsuarioActual();
                if (currentUser != null) {
                    json.append(",\"userId\":").append(currentUser.getIdUsuario());
                    json.append(",\"userName\":\"").append(currentUser.getNombre()).append(" ").append(currentUser.getApellido()).append("\"");
                }
                
                json.append("}");
            } else {
                json.append("{\"permissionsLoaded\":false}");
            }
            
            out.print(json.toString());
            
        } catch (Exception e) {
            json.append("{\"error\":\"Server error: ").append(e.getMessage().replace("\"", "\\\"")).append("\",\"permissionsLoaded\":false}");
            out.print(json.toString());
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Servlet for checking user permissions";
    }
} 