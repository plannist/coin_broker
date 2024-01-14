package com.coin.broker.config;

import com.coin.broker.front.model.AdminMas;
import com.coin.broker.front.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Slf4j
@Component
@RequiredArgsConstructor
public class MyAuthenticationProvider implements AuthenticationProvider, Serializable {
    /**
     *
     */
    private static final long serialVersionUID = 1800218287090417439L;


       final BCryptPasswordEncoder encoder;

       final AdminService adminService;


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = authentication.getName();
        String pwd = String.valueOf(authentication.getCredentials());
        String encodePwd = encoder.encode(pwd);
        log.info("email: {}", email);
        log.info("pwd: {}", pwd);

        AdminMas param = new AdminMas();
        param.setId(email);
        AdminMas member = adminService.findById(param);

        if(member == null){
            throw new UsernameNotFoundException("해당 계정이 존재하지않습니다.");
        }
        if(encoder.matches(pwd, member.getPassword() )){
            log.info("login 성공");

            return new UsernamePasswordAuthenticationToken(member, encodePwd, member.getAuthorities());

        }else{
            log.info("login 실패");
            throw new BadCredentialsException("비밀번호가 올바르지 않습니다.");
        }


    }

    @Override
    public boolean supports(Class<?> aClass) {
//        return true;
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(aClass);
    }
}