package com.example.bolivia.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long householdId;
    private String aptCode;
    private String dong;
    private String ho;
    private String displayName;
    @Column(insertable=false, updatable=false)
    private String username;
    private String email;
    private String passwordHash;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Enumerated(EnumType.STRING)
    private Status status;
    
    public enum Role { RESIDENT, ADMIN }
    public enum Status { PENDING, ACTIVE, LOCKED }
}