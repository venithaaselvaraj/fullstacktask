package com.college.management.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "faculties")
public class Faculty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Faculty name is required")
    @Column(nullable = false)
    private String name;
    
    @NotBlank(message = "Designation is required")
    @Column(nullable = false)
    private String designation;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(nullable = false, unique = true)
    private String email;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id", nullable = false)
    @NotNull(message = "Department is required")
    private Department department;
    
    // Constructors
    public Faculty() {}
    
    public Faculty(String name, String designation, String email, Department department) {
        this.name = name;
        this.designation = designation;
        this.email = email;
        this.department = department;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }
}