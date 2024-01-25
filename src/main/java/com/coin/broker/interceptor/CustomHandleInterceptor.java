package com.coin.broker.interceptor;

import com.coin.broker.admin.mapper.BasicInfMngMapper;
import com.coin.broker.admin.model.BasicInfMng;
import com.coin.broker.util.Utils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@Component
@RequiredArgsConstructor
public class CustomHandleInterceptor implements HandlerInterceptor {

    final BasicInfMngMapper basicInfMngMapper;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {


        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

        if(Utils.isNotEmpty(modelAndView)){
            BasicInfMng basic =  basicInfMngMapper.findOne();
            modelAndView.addObject("basic", basic);
        }

        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }
}
