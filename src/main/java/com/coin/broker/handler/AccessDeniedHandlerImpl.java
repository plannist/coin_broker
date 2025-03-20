package com.coin.broker.handler;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class AccessDeniedHandlerImpl implements AccessDeniedHandler{

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {

        log.error("accessDenied[403] >>>>", accessDeniedException);
        log.error("Request Uri: {}", request.getRequestURI());

        request.setAttribute(RequestDispatcher.ERROR_STATUS_CODE, HttpServletResponse.SC_UNAUTHORIZED);
        request.getRequestDispatcher("/error").forward(request, response);
//        response.sendRedirect("/");
    }
}
