package com.example.bolivia.controller;

import com.example.bolivia.dto.AuthDto;
import com.example.bolivia.model.User;
import com.example.bolivia.security.JwtTokenProvider;
import com.example.bolivia.service.AuthService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtTokenProvider tokenProvider;

    public AuthController(AuthService authService, JwtTokenProvider tokenProvider) {
        this.authService = authService;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthDto.LoginRequest loginRequest) {
        try {
            User user = authService.authenticate(loginRequest.getId(), loginRequest.getPassword());

            String accessToken = tokenProvider.generateAccessToken(user);
            String refreshToken = tokenProvider.generateRefreshToken(user);

            ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true) // Solo se envía en HTTPS
                .path("/")
                .maxAge(7 * 24 * 60 * 60) // 7 días
                .build();
            
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                    .body(new AuthDto.LoginResponse(accessToken, user));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }
}