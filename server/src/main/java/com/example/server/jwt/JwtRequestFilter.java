// package com.example.server.jwt;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.MediaType;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import com.example.server.models.Users;
// import com.example.server.repositorys.UsersRepository;

// import java.io.IOException;

// @Component
// public class JwtRequestFilter extends OncePerRequestFilter {

//     @Autowired
//     private JwtUtil jwtUtil;

//     @Autowired
//     private UsersRepository userRepository;

//     @Override
//     protected void doFilterInternal(HttpServletRequest request,
//                                     HttpServletResponse response,
//                                     FilterChain filterChain)
//             throws ServletException, IOException {

//         String token = resolveToken(request);
//         if (token != null) {
//             try {
//                 String subject = jwtUtil.verify(token);
//                 String userId = subject;

//                 Users user = userRepository.findById(userId).orElse(null);
//                 if (user != null) {
//                     UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                             user, null, user.getAuthorities());
//                     authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                     SecurityContextHolder.getContext().setAuthentication(authToken);
//                 } else {
//                     jwtUtil.signOut(response);
//                 }
//             } catch (Exception e) {
//                 response.setStatus(HttpStatus.FORBIDDEN.value());
//                 response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//                 response.getWriter().write("Your access is forbidden");
//             }
//         }

//         filterChain.doFilter(request, response);
//     }

//     private String resolveToken(HttpServletRequest request) {
//         String bearerToken = request.getHeader("Authorization");
//         if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
//             return bearerToken.substring(7);
//         }

//         Cookie[] cookies = request.getCookies();
//         if (cookies != null) {
//             for (Cookie cookie : cookies) {
//                 if ("token".equals(cookie.getName())) {
//                     return cookie.getValue();
//                 }
//             }
//         }

//         return null;
//     }
// }
