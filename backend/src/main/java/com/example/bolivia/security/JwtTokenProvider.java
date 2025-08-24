package com.example.bolivia.security;

import com.example.bolivia.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Slf4j
@Component
public class JwtTokenProvider {

    private final SecretKey key;
    private final long accessTokenExpirationMs;
    private final long refreshTokenExpirationMs;

    public JwtTokenProvider(
            @Value("${app.jwt.secret}") String secretKey,
            @Value("${app.jwt.access-token-expiration-ms}") long accessTokenValidity,
            @Value("${app.jwt.refresh-token-expiration-ms}") long refreshTokenValidity) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
        this.accessTokenExpirationMs = accessTokenValidity;
        this.refreshTokenExpirationMs = refreshTokenValidity;
    }

    /**
     * Access Token을 생성합니다.
     * @param user 인증된 사용자 엔티티
     * @return 생성된 JWT Access Token 문자열
     */
    public String generateAccessToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + accessTokenExpirationMs);

        return Jwts.builder()
                .setSubject(user.getUsername()) // 로그인 ID(username)를 주제로 설정
                .claim("role", user.getRole().name()) // 사용자 역할을 클레임에 추가
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();
    }

    /**
     * Refresh Token을 생성합니다.
     * @param user 인증된 사용자 엔티티
     * @return 생성된 JWT Refresh Token 문자열
     */
    public String generateRefreshToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + refreshTokenExpirationMs);

        return Jwts.builder()
                .setSubject(user.getUsername()) // 로그인 ID(username)를 주제로 설정
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();
    }

    /**
     * 토큰에서 Claims 정보를 추출합니다.
     * @param token JWT 토큰
     * @return Claims 객체
     */
    private Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    /**
     * 토큰에서 사용자 로그인 ID (username)를 추출합니다.
     * @param token JWT 토큰
     * @return 사용자 로그인 ID
     */
    public String getUsernameFromToken(String token) {
        return parseClaims(token).getSubject();
    }

    /**
     * 토큰의 유효성을 검증합니다.
     * @param token JWT 토큰
     * @return 유효하면 true, 아니면 false
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }
}
