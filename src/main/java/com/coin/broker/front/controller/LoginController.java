package com.coin.broker.front.controller;

import com.coin.broker.util.Utils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequiredArgsConstructor
@Slf4j
public class LoginController {

    @GetMapping("/login")
    public ModelAndView login(HttpServletRequest request){
        ModelAndView mv = new ModelAndView("login");
        String referer = request.getHeader("Referer");
        log.info("referer :: >>> {}", referer);

        if(Utils.isNotEmpty(referer)){
            if(referer.toUpperCase().contains("BING")){
                mv.setView(new RedirectView("/"));
                return mv;
            }
        }



        return mv;
    }
}
