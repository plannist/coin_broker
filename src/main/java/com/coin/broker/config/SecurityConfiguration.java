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
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    final MyAuthenticationProvider authenticationProvider;

    final LoginSuccessHandler loginSuccessHandler;

    final LoginFailureHandler loginFailureHandler;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
            .headers( header -> {
                header.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin);
            })
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> {
                auth.requestMatchers("/", "/error","map", "/hidden", "/transReq", "/login",
                        "/api/**", "/image/**", "/css/**",
                        "/js/**", "/lib/**", "/fontwesome/**")
                .permitAll()
                .requestMatchers("/admin/**").authenticated();
            })
            .formLogin(login -> {
                login.loginPage("/login")
                        .successHandler(loginSuccessHandler)
                        .failureHandler(loginFailureHandler)
                        .usernameParameter("email")
                        .passwordParameter("password")
                        .loginProcessingUrl("/loginProcess")
                        .permitAll()
                ;

            })
            .logout(logout ->{
                logout.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        .logoutSuccessUrl("/")
                        .permitAll();

            })



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

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .requestMatchers("/resources/**");

    }


}
