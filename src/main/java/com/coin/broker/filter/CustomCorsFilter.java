package com.coin.broker.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.stereotype.Component;

import java.io.IOException;

//@WebFilter(urlPatterns = "/admin/**")
//@WebFilter
@Component
@Slf4j
public class CustomCorsFilter  implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//        HttpServletRequest request = (HttpServletRequest)servletRequest;
//        String url = request.getRequestURI();
//        log.info("doFilter >>> {}", url);
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        response.setHeader("X-Frame-Options", "ALLOW-ALL");
        filterChain.doFilter(servletRequest, servletResponse);

    }

}
