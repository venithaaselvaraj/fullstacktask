package com.college.management.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
@Table(name = "departments")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Department name is required")
    @Column(nullable = false)
    private String name;
    
    @NotBlank(message = "HOD is required")
    @Column(nullable = false)
    private String hod;
    
    @NotBlank(message = "Building is required")
    @Column(nullable = false)
    private String building;
    
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Faculty> faculties;
    
    // Constructors
    public Department() {}
    
    public Department(String name, String hod, String building) {
        this.name = name;
        this.hod = hod;
        this.building = building;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getHod() { return hod; }
    public void setHod(String hod) { this.hod = hod; }
    
    public String getBuilding() { return building; }
    public void setBuilding(String building) { this.building = building; }
    
    public List<Faculty> getFaculties() { return faculties; }
    public void setFaculties(List<Faculty> faculties) { this.faculties = faculties; }
}