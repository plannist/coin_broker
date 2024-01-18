package com.coin.broker.config;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.stereotype.Component;


import java.io.IOException;

@Component
@Slf4j
public class LoginFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        String defaultFailerUrl = "/";
        String uri = request.getRequestURI();

        if(!uri.contains("admin")){
            defaultFailerUrl = "/";
        }

        String email = request.getParameter("email");
        String pwd = request.getParameter("pwd");
        String restCd = "5";


        log.debug("login fail email: "+email+", pwd: "+pwd);

        log.error(exception.getLocalizedMessage(), exception);
        if(exception instanceof BadCredentialsException) {
            restCd = "1";// 비밀번호를 잘못 입력했습니다.

        }else if(exception instanceof UsernameNotFoundException) {
            restCd = "2";// 계정이 존재하지 않습니다.
        } else if (exception instanceof DisabledException) {
            restCd = "3"; // 이메일 인증을 해주세요.
        } else if (exception instanceof SessionAuthenticationException) {
            restCd = "4"; // 중복 로그인
        }

//		RequestDispatcher forword = request.getRequestDispatcher(defaultFailerUrl);
        request.setAttribute("restCd", restCd);
//		forword.forward(request, response);
        Cookie cookie = new Cookie("restCd", restCd);
        cookie.setMaxAge(60); //1분
        cookie.setPath(defaultFailerUrl);
//		cookie.setSecure(true);
        response.addCookie(cookie);
        response.sendRedirect(defaultFailerUrl);
    }
}
