package com.example.academic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "full_name")
    private String fullName;

    private String role; // e.g., "admin", "employee", "student"

    private String provider; // e.g., "local", "google"

    @Column(name = "provider_id")
    private String providerId;

    // For backward compatibility
    private String password; // Only for local auth

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getProviderId() { return providerId; }
    public void setProviderId(String providerId) { this.providerId = providerId; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    // Legacy getters/setters for backward compatibility
    public String getUsername() { return email; }
    public void setUsername(String username) { this.email = username; }
    
    public String getGoogleId() { return providerId; }
    public void setGoogleId(String googleId) { this.providerId = googleId; }
    
    public String getAuthProvider() { return provider; }
    public void setAuthProvider(String authProvider) { this.provider = authProvider; }
}
