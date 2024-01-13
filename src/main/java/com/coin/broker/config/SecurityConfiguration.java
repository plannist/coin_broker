package com.coin.broker.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.util.stream.Stream;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfiguration  {

    final AuthenticationConfiguration config;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http.authorizeHttpRequests(auth -> {
            auth.requestMatchers("/", "/error", "/hidden", "/transReq", "/api/**", "/image/**", "/css/**", "/js/**", "/lib/**").permitAll();
        })
        .csrf(AbstractHttpConfigurer::disable)
//        .csrf(e -> {
//            e.ignoringRequestMatchers("/", "/hidden");
//        })
        .cors(withDefaults());

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager()
            throws Exception {
        return config.getAuthenticationManager();
    }

}
