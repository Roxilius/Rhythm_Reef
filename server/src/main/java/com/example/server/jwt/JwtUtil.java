package com.example.server.jwt;

import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import com.example.server.models.Users;

import java.time.Duration;
import java.util.Date;

@Component
public class JwtUtil {
    private String secretKey = "Rhythm Reef";

    private Long accessTokenValidity = 60*60*1000L;

    private final String TOKEN_HEADER = "Authorization";

    private final String TOKEN_PREFIX = "Bearer ";

    private final JwtParser jwtParser;

    public JwtUtil(){
        this.jwtParser = Jwts.parser().setSigningKey(secretKey);
    }
    public String generateToken(Users user) {
        Claims claims = Jwts.claims().setSubject(user.getEmail());
        claims.put("email",user.getEmail());
        claims.put("role",user.getRoles().getRoleName());

        Date tokenCreateTime = new Date();
        Date tokenValidity = new Date(tokenCreateTime.getTime() +
                Duration.ofMinutes(accessTokenValidity).toMillis());

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(tokenValidity)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }
    private Claims parseJwtClaims(String token) {
        return jwtParser.parseClaimsJws(token).getBody();
    }

    public Claims resolveClaims(HttpServletRequest req) {
        try {
            String token = resolveToken(req);
            if (token != null) {
                return parseJwtClaims(token);
            }
            return null;
        } catch (ExpiredJwtException ex) {
            req.setAttribute("expired", ex.getMessage());
            throw ex;
        } catch (Exception ex) {
            req.setAttribute("invalid", ex.getMessage());
            throw ex;
        }
    }

    public String resolveToken(HttpServletRequest request) {

        String bearerToken = request.getHeader(TOKEN_HEADER);
        if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(TOKEN_PREFIX.length());
        }
        return null;
    }

    public boolean validateClaims(Claims claims) {
        try {
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            throw e;
        }
    }
}

// package com.example.server.jwt;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.SignatureException;
// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletResponse;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Component;

// import com.example.server.models.Users;

// import javax.crypto.spec.SecretKeySpec;
// import java.security.Key;
// import java.util.Date;
// import java.time.Duration;
// import java.util.function.Function;

// @Component
// public class JwtUtil {

//     @Value("${jwt.secret}")
//     private String secret;

//     @Value("${jwt.expiration}")
//     private long expirationTime;

//     // Generate a JWT token
//     public String generateToken(Users user) {
//         Claims claims = Jwts.claims().setSubject(user.getEmail());
//         claims.put("email", user.getEmail());
//         claims.put("role", user.getRoles().getRoleName());

//         Date tokenCreateTime = new Date();
//         Date tokenValidity = new Date(tokenCreateTime.getTime() +
//                 Duration.ofMinutes(expirationTime).toMillis());

//         return Jwts.builder()
//                 .setClaims(claims)
//                 .setExpiration(tokenValidity)
//                 .signWith(SignatureAlgorithm.HS512, getSigningKey())
//                 .compact();

//         // return Jwts.builder()
//         //         .setClaims(claims)
//         //         .setSubject(subject)
//         //         .setIssuedAt(new Date(System.currentTimeMillis()))
//         //         .setExpiration(new Date(System.currentTimeMillis() + expirationTime * 1000))
//         //         .signWith(SignatureAlgorithm.HS256, getSigningKey())
//         //         .compact();
//     }

//     // Validate the token and check if it's not expired
//     public boolean validateToken(String token) {
//         try {
//             Jwts.parser().setSigningKey(getSigningKey()).parseClaimsJws(token);
//             return true;
//         } catch (SignatureException | IllegalArgumentException e) {
//             return false;
//         }
//     }

//     // Extract claims from the token
//     public Claims extractClaims(String token) {
//         return Jwts.parser()
//                 .setSigningKey(getSigningKey())
//                 .parseClaimsJws(token)
//                 .getBody();
//     }

//     // Extract specific claim using a resolver function
//     public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//         final Claims claims = extractClaims(token);
//         return claimsResolver.apply(claims);
//     }

//     // Extract the subject (typically the username or user ID)
//     public String extractUsername(String token) {
//         return extractClaim(token, Claims::getSubject);
//     }

//     // Verify the token and extract the subject (user ID)
//     public String verify(String token) throws SignatureException {
//         if (!validateToken(token)) {
//             throw new SignatureException("Invalid JWT token");
//         }
//         return extractUsername(token);
//     }

//     // Utility method to sign out (clear the token)
//     public void signOut(HttpServletResponse response) {
//         Cookie cookie = new Cookie("token", null);
//         cookie.setPath("/");
//         cookie.setHttpOnly(true);
//         cookie.setMaxAge(0);
//         response.addCookie(cookie);
//     }

//     // Get the key used for signing the token
//     private Key getSigningKey() {
//         byte[] keyBytes = secret.getBytes();
//         return new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
//     }
// }