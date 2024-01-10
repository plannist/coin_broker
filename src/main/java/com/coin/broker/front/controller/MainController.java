package com.coin.broker.front.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@Slf4j
public class MainController {

    @GetMapping("/")
    public ModelAndView index(){

//        ModelAndView mv = new ModelAndView("index");
        ModelAndView mv = new ModelAndView("error");
        log.info("main <<");

        return mv;
    }

    @GetMapping("/map")
    public ResponseEntity<?> map(){
        return ResponseEntity.ok("1234");
    }
}
