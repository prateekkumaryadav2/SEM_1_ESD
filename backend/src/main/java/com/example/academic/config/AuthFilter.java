package com.example.academic.config;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthFilter extends HttpFilter {

    public static final Map<String, String> TOKENS = new ConcurrentHashMap<>();
    public static final Map<String, String> TOKEN_ROLES = new ConcurrentHashMap<>();

    @Override
    protected void doFilter(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        String path = req.getRequestURI();
        
        // Skip authentication for login and OAuth endpoints
        if (path.startsWith("/api/auth/") || path.startsWith("/api/oauth/")) {
            chain.doFilter(req, res);
            return;
        }

        String token = req.getHeader("X-Auth-Token");
        if (token == null || !TOKENS.containsKey(token)) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.setContentType("application/json");
            res.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }
        
        // Set user email and role as request attributes for downstream filters
        String userEmail = TOKENS.get(token);
        String userRole = TOKEN_ROLES.get(token);
        req.setAttribute("userEmail", userEmail);
        req.setAttribute("userRole", userRole);
        
        chain.doFilter(req, res);
    }
}
