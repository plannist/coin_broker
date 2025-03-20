package com.coin.broker.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class AuthenticationEntryPointer implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        log.error("AuthenticationEntryPoint[401] >>>>", authException);
        log.error("Request Uri: {}", request.getRequestURI());
        request.setAttribute("javax.servlet.error.status_code", HttpServletResponse.SC_UNAUTHORIZED);
        request.getRequestDispatcher("/error").forward(request, response);
    }
}
