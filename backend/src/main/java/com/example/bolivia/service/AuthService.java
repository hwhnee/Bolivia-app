package com.example.bolivia.service;

import com.example.bolivia.model.User;
import com.example.bolivia.repository.UserRepository; // 추가
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository; // JdbcTemplate -> UserRepository
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) { // 생성자 수정
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User authenticate(String loginId, String rawPassword) {
        User user = userRepository.findByUsernameOrEmail(loginId, loginId)
                .orElseThrow(() -> new BadCredentialsException("Usuario no encontrado."));

        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            throw new BadCredentialsException("ID de usuario o la contraseña no son correctos.");
        }
        
        if (user.getStatus() != User.Status.ACTIVE) {
            throw new BadCredentialsException("La cuenta no está activa o ha sido bloqueada.");
        }

        return user;
    }
}