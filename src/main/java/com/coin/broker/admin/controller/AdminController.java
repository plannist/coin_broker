package com.coin.broker.admin.controller;

import com.coin.broker.admin.model.AdminMas;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/main")
    public ModelAndView main(@AuthenticationPrincipal AdminMas adminMas){
        ModelAndView mv = new ModelAndView("admin/migration");


        log.info("adminMas 관리자 접속정보:: >>{}", adminMas);

        return mv;
    }





}
