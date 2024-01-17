package com.coin.broker.admin.controller;

import com.coin.broker.admin.model.AdminMas;
import com.coin.broker.front.model.TransReqMas;
import com.coin.broker.front.service.TransReqMasService;
import com.coin.broker.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

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

    @PostMapping("/transReqDtl")
    @ResponseBody
    public ResponseEntity<?>  transReqDtl (TransReqMas param){
        Response<Object> res = new Response<>();
        TransReqMas result = transReqMasService.findTransReqDtl(param);
        TransReqMas cntInfo = transReqMasService.findCusTransCnt(result);
        result.setPrcsCd6Cnt(cntInfo.getPrcsCd6Cnt());
        result.setLstRcptDttm(cntInfo.getLstRcptDttm());
        res.setData(result);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/transReqSave")
    @ResponseBody
    public ResponseEntity<?> transReqSave(TransReqMas param){
        param.setReqAmt(param.getReqAmt().replaceAll(",", ""));
        param.setChargeAmt(param.getChargeAmt().replaceAll(",", ""));
        param.setTotReqAmt(param.getTotReqAmt().replaceAll(",", ""));
        param.setPhoneNo(param.getPhoneNo().replaceAll("-", ""));

        transReqMasService.insert(param);

        Response<Object> res = new Response<>();
        res.setStatusCode(Response.ResultCode.SUCCESS.getCode());

        return ResponseEntity.ok(res);
    }





}
