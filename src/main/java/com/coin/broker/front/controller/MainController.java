package com.coin.broker.front.controller;

import com.coin.broker.front.model.FrontMng;
import com.coin.broker.front.service.FrontMngService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MainController {

    final FrontMngService frontMngService;

    @GetMapping("/")
    public ModelAndView index(){
        ModelAndView mv = new ModelAndView();
        FrontMng frontMng = frontMngService.findFrontMngInfo();
        if(frontMng != null){
            mv.setViewName("index");
        }else{
            mv.setViewName("error");
        }

        log.info("main frontMng >>>> {}", frontMng);

        return mv;
    }

    @GetMapping("/error")
    public ModelAndView error(){

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
