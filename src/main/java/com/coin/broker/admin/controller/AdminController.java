package com.coin.broker.admin.controller;

import com.coin.broker.admin.model.AdminMas;
import com.coin.broker.front.model.TransReqMas;
import com.coin.broker.front.service.TransReqMasService;
import com.coin.broker.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    final TransReqMasService transReqMasService;

    @GetMapping("/main")
    public ModelAndView main(@AuthenticationPrincipal AdminMas adminMas){
        ModelAndView mv = new ModelAndView("admin/migration");


        log.info("adminMas 관리자 접속정보:: >>{}", adminMas);

        return mv;
    }

    @PostMapping("/transReqList")
    @ResponseBody
    public Response<?> transReqList(TransReqMas param){

        Response<List<TransReqMas>> res = new Response<>();

        List<TransReqMas> list = transReqMasService.findAdminTransReqList(param);

        int cnt = transReqMasService.findAdminTransReqCnt(param);

        res.setTotalCount(cnt);
        res.setData(list);


        return res;
    }





}