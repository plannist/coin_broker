package com.coin.broker.admin.controller;

import com.coin.broker.util.Response;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;

@Slf4j
@Controller
//server.error.path 가 yml 등록 되어있으면 사용하고 없으면 error.path 는 /error 이다.
@RequestMapping("${server.error.path:${error.path:/error}}")
public class ErrorPageController implements ErrorController{

    @RequestMapping(produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
        String status = String.valueOf(request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE));
        String message = String.valueOf(request.getAttribute(RequestDispatcher.ERROR_MESSAGE));

/*        Enumeration<String> list =  request.getAttributeNames();
        while(list.hasMoreElements()){
            String key = list.nextElement();
            String value = String.valueOf(request.getAttribute(key));

            log.info("key[{}], value:{}", key, value);
        }*/

        log.info("status: {}, message: {}", status, message);
        log.error(message);
        ModelAndView mv = new ModelAndView("error");
        mv.addObject("timestamp", LocalDateTime.now());
        mv.addObject("status", status);
        mv.addObject("path", request.getRequestURI());
        return mv;
    }

    @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Response<?>> errorJson(HttpServletRequest request, HttpServletResponse response){
        log.info("json Error");
        Response<Object> res = new Response<>();
        String status = String.valueOf(request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE));
        String message = String.valueOf(request.getAttribute(RequestDispatcher.ERROR_MESSAGE));
        log.info("status: {}, message: {}", status, message);
        res.setStatusCode(status);
        res.setStatusMessage(message);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
    }
}
