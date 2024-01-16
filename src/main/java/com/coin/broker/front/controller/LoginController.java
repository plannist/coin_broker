package com.coin.broker.front.controller;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequiredArgsConstructor
@Slf4j
public class LoginController {

    @GetMapping("/api/income")
    public ModelAndView login(){

        ModelAndView mv = new ModelAndView("login");

        return mv;
    }
}
