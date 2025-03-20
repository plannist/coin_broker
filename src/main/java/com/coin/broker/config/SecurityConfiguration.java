package com.coin.broker.config;

import com.coin.broker.filter.CustomCorsFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


import static org.springframework.security.config.Customizer.withDefaults;

//@Configuration
//@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfiguration  {

    final AuthenticationConfiguration config;

    final MyAuthenticationProvider authenticationProvider;

    final LoginSuccessHandler loginSuccessHandler;

    final LoginFailureHandler loginFailureHandler;


    final CustomCorsFilter customCorsFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
            .headers( header -> {
                header.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin);
            })
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> {
                auth
                    .requestMatchers("/", "/error","/map", "/hidden", "/transReq", "/login",
                            "/api/**", "/assets/**").permitAll()
                    .requestMatchers("/admin/**", "/hidden").authenticated()
                    ;
            })
            .formLogin(login -> {
                login
                    .loginPage("/login")
                    .successHandler(loginSuccessHandler)
                    .failureHandler(loginFailureHandler)
                    .usernameParameter("email")
                    .passwordParameter("password")
                    .loginProcessingUrl("/loginProcess")
                    .permitAll()
                ;

            })
            .addFilterBefore(customCorsFilter, AnonymousAuthenticationFilter.class)
            .logout(logout ->{
                logout
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    .logoutSuccessUrl("/")
                    .permitAll();

            })
            .cors(withDefaults())
            .exceptionHandling(e-> {
                log.info("accessDenied ::: {}", e);
                e.accessDeniedPage("/");
            })
        ;

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .requestMatchers("/resources/**", "/favicon.ico");

    }


}
