package com.example.bolivia.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
public class User implements UserDetails {
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

    // --- UserDetails 인터페이스 구현 메서드 ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Enum 타입의 role을 Spring Security가 이해하는 "ROLE_" 접두사를 붙인 문자열로 변환합니다.
        // 예: Role.ADMIN -> "ROLE_ADMIN"
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }

    @Override
    public String getPassword() {
        // 비밀번호 필드명인 'passwordHash'를 반환합니다.
        return this.passwordHash;
    }

    @Override
    public String getUsername() {
        // 로그인 ID 필드명인 'username'을 반환합니다.
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // 계정 만료 로직이 없으므로 true 반환
    }

    @Override
    public boolean isAccountNonLocked() {
        // 계정 상태가 LOCKED가 아니면 true를 반환합니다.
        return this.status != Status.LOCKED;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 자격 증명 만료 로직이 없으므로 true 반환
    }

    @Override
    public boolean isEnabled() {
        // 계정 상태가 ACTIVE이면 true를 반환합니다.
        return this.status == Status.ACTIVE;
    }
}
