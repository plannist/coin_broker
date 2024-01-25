package com.coin.broker.config;

import com.coin.broker.interceptor.CustomHandleInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfiguration implements WebMvcConfigurer {

    final CustomHandleInterceptor customHandleInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry
            .addInterceptor(customHandleInterceptor)
            .addPathPatterns("/**");
        WebMvcConfigurer.super.addInterceptors(registry);
    }
}
