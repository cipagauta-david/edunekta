package com.sena.dev.security;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebFilter("/*")
public class Filtro implements Filter {

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
        if (session != null && session.getAttribute("login") != null) {
            Object loginObj = session.getAttribute("login");
            try {
                loggedIn = ((com.sena.dev.controllers.LoginController) loginObj).getUsuario() != null;
            } catch (Exception e) {
                loggedIn = false;
            }
        }

        System.out.println("Filtro: resourceURI=" + resourceURI + ", loginRequest=" + loginRequest + ", loggedIn=" + loggedIn);

        if (loggedIn || loginRequest) {
            chain.doFilter(request, response);
        } else {
            res.sendRedirect(loginURI);
        }
    }

    @Override
    public void destroy() {
        // No cleanup needed
    }
}
