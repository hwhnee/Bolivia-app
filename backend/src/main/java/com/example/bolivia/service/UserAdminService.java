package com.example.bolivia.service;

import com.example.bolivia.dto.UserAdminDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class UserAdminService {

    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder;

    public UserAdminService(JdbcTemplate jdbcTemplate, PasswordEncoder passwordEncoder) {
        this.jdbcTemplate = jdbcTemplate;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserAdminDto.UserDetail> getAllUsers() {
        String sql = "SELECT id, display_name, email, username, role, status, apt_code, dong, ho FROM users ORDER BY id DESC";
        return jdbcTemplate.query(sql, (rs, rowNum) -> new UserAdminDto.UserDetail(
                rs.getLong("id"),
                rs.getString("display_name"),
                rs.getString("email"),
                rs.getString("username"),
                rs.getString("role"),
                rs.getString("status"),
                rs.getString("apt_code"),
                rs.getString("dong"),
                rs.getString("ho")
        ));
    }

    @Transactional
    public void createUser(UserAdminDto.UserRequest request) {
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        String sql = "INSERT INTO users (apt_code, dong, ho, display_name, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, request.getAptCode(), request.getDong(), request.getHo(), request.getDisplayName(), request.getEmail(), hashedPassword, request.getRole(), request.getStatus());
    }

    @Transactional
    public void updateUser(Long userId, UserAdminDto.UserRequest request) {
        String sql = "UPDATE users SET display_name = ?, email = ?, dong = ?, ho = ?, role = ?, status = ? WHERE id = ?";
        jdbcTemplate.update(sql, request.getDisplayName(), request.getEmail(), request.getDong(), request.getHo(), request.getRole(), request.getStatus(), userId);
    }

    @Transactional
    public void deleteUser(Long userId) {
        String sql = "DELETE FROM users WHERE id = ?";
        jdbcTemplate.update(sql, userId);
    }
}
