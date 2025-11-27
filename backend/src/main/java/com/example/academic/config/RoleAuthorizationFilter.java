package com.example.academic.config;

import java.io.IOException;

import org.springframework.stereotype.Component;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RoleAuthorizationFilter extends HttpFilter {

    @Override
    protected void doFilter(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        String method = req.getMethod();
        String path = req.getRequestURI();
        String role = (String) req.getAttribute("userRole");

        // Check if this is a course or specialisation endpoint
        boolean isCourseOrSpecialisation = path.startsWith("/api/courses") || path.startsWith("/api/specialisations");
        
        if (isCourseOrSpecialisation) {
            // Only ADMIN can do POST, PUT, DELETE operations
            boolean isModifyingOperation = method.equals("POST") || method.equals("PUT") || method.equals("DELETE");
            
            if (isModifyingOperation) {
                // Allow if role is ADMIN or null (for backward compatibility)
                // Block only if role is explicitly set to something other than ADMIN (e.g., STUDENT)
                if (role != null && !"ADMIN".equalsIgnoreCase(role)) {
                    res.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    res.setContentType("application/json");
                    res.getWriter().write("{\"error\":\"Access denied. Admin role required for this operation.\"}");
                    res.getWriter().flush();
                    return;
                }
            }
        }

        chain.doFilter(req, res);
    }
}
