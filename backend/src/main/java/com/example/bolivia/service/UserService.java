package com.example.bolivia.service;

import com.example.bolivia.dto.ProfileDto;
import com.example.bolivia.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final JdbcTemplate jdbcTemplate;

    public UserService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Método para actualizar el perfil de un usuario
    public void updateUserProfile(Long userId, ProfileDto profileDto) {
        String sql = "UPDATE users SET display_name = ?, email = ?, updated_at = NOW() WHERE id = ?";
        
        int updatedRows = jdbcTemplate.update(sql, profileDto.getUsername(), profileDto.getEmail(), userId);

        if (updatedRows == 0) {
            throw new RuntimeException("No se pudo actualizar el perfil del usuario con ID: " + userId);
        }
    }
}
