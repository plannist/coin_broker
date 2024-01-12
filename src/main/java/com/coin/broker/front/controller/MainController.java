package com.coin.broker.front.controller;

import com.coin.broker.front.model.FrontMng;
import com.coin.broker.front.model.TransReqMas;
import com.coin.broker.front.service.FrontMngService;
import com.coin.broker.front.service.TransReqMasService;
import com.coin.broker.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MainController {

    final FrontMngService frontMngService;

    final TransReqMasService transReqMasService;

    @GetMapping("/")
    public ModelAndView index(){
        ModelAndView mv = new ModelAndView();
        FrontMng frontMng = frontMngService.findFrontMngInfo();
        if(frontMng != null && "1".equals(frontMng.getMtnYn())){
            mv.setViewName("error");
        }else{
            mv.setViewName("index");
        }

        log.info("main frontMng >>>> {}", frontMng);

        return mv;
    }

    @PostMapping("/transReq")
    @ResponseBody
    public ResponseEntity<?> transReq(TransReqMas param){
        Response<?> res = new Response<>();
        param.setReqAmt(param.getReqAmt().replaceAll(",", ""));
        param.setChargeAmt(param.getChargeAmt().replaceAll(",", ""));
        param.setTotReqAmt(param.getTotReqAmt().replaceAll(",", ""));


        int cnt = transReqMasService.insert(param);
        if(cnt > 0)
            res.setStatusCode(Response.ResultCode.SUCCESS.getCode());
        else
            res.setStatusCode(Response.ResultCode.FAIL.getCode());
        return ResponseEntity.ok(res);
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

    @GetMapping("/hidden")
    public ModelAndView hiddenPg(){

        return new ModelAndView("index");
    }
}
