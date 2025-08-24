package com.example.bolivia.service;

import com.example.bolivia.model.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder;

    public AuthService(JdbcTemplate jdbcTemplate, PasswordEncoder passwordEncoder) {
        this.jdbcTemplate = jdbcTemplate;
        this.passwordEncoder = passwordEncoder;
    }

    public User authenticate(String loginId, String rawPassword) {
        // Se usa el campo 'username' (ID de login) o 'email' para la autenticación
        String sql = "SELECT * FROM users WHERE username = ? OR email = ?";

        try {
            User user = jdbcTemplate.queryForObject(sql, new Object[]{loginId, loginId}, userRowMapper());

            if (user == null || !passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
                throw new BadCredentialsException("ID de usuario o la contraseña no son correctos.");
            }
            
            if (user.getStatus() != User.Status.ACTIVE) {
                throw new BadCredentialsException("La cuenta no está activa o ha sido bloqueada.");
            }

            return user;

        } catch (EmptyResultDataAccessException e) {
            throw new BadCredentialsException("Usuario no encontrado.");
        }
    }

    private RowMapper<User> userRowMapper() {
        return (rs, rowNum) -> {
            User user = new User();
            user.setId(rs.getLong("id"));
            user.setHouseholdId(rs.getLong("household_id"));
            user.setAptCode(rs.getString("apt_code"));
            user.setDong(rs.getString("dong"));
            user.setHo(rs.getString("ho"));
            user.setDisplayName(rs.getString("display_name"));
            user.setUsername(rs.getString("username"));
            user.setEmail(rs.getString("email"));
            user.setPasswordHash(rs.getString("password_hash"));
            user.setRole(User.Role.valueOf(rs.getString("role")));
            user.setStatus(User.Status.valueOf(rs.getString("status")));
            return user;
        };
    }
}