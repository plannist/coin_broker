package com.coin.broker.admin.controller;

import com.coin.broker.admin.model.AdminMas;
import com.coin.broker.admin.model.MmsFormatMas;
import com.coin.broker.admin.model.WltAddrMng;
import com.coin.broker.admin.service.MmsFormatMasService;
import com.coin.broker.admin.service.WalletService;
import com.coin.broker.front.model.FrontMng;
import com.coin.broker.front.model.TransReqMas;
import com.coin.broker.front.service.FrontMngService;
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

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    final TransReqMasService transReqMasService;

    final MmsFormatMasService mmsFormatMasService;

    final WalletService walletService;

    final FrontMngService frontMngService;

    @GetMapping("/main")
    public ModelAndView main(@AuthenticationPrincipal AdminMas adminMas){
        ModelAndView mv = new ModelAndView("admin/main");


        log.info("adminMas 관리자 접속정보:: >>{}", adminMas);

        return mv;
    }

    @GetMapping("/service-mms")
    public ModelAndView mms(@AuthenticationPrincipal AdminMas adminMas){
        ModelAndView mv = new ModelAndView("admin/mms");


        log.info("service-mms 관리자 접속정보:: >>{}", adminMas);

        return mv;
    }

    @GetMapping("/service-wallet")
    public ModelAndView wallet(){
        return new ModelAndView("admin/wallet");
    }

    @PostMapping("/service-walletList")
    @ResponseBody
    public Response<?> walletList(WltAddrMng param){

        Response<List<WltAddrMng>> res = new Response<>();

        List<WltAddrMng> list = walletService.findAll(param);

        res.setData(list);
        return res;
    }

    @PostMapping("/service-walletUpdate")
    @ResponseBody
    public Response<?> walletUpdate(WltAddrMng param){

        Response<List<WltAddrMng>> res = new Response<>();

        int cnt = 0;
        if("I".equals(param.getType())){
            cnt += walletService.insert(param);
        }else{
            cnt +=  walletService.delete(param);
        }

        if(cnt > 0){
            res.setStatusCode(Response.ResultCode.SUCCESS.getCode());
        }
        return res;
    }


    @GetMapping("/service-front")
    public ModelAndView frontManage(){
        return new ModelAndView("admin/front");
    }

    @PostMapping("/front-save")
    @ResponseBody
    public Response<?> frontSave(FrontMng param){

        Response<Object> res = new Response<>();


        frontMngService.save(param);
        res.setStatusCode(Response.ResultCode.SUCCESS.getCode());

        return res;
    }


    @GetMapping("/basic-info")
    public ModelAndView basicInfo(){
        return new ModelAndView("admin/basic");
    }

    @GetMapping("/business")
    public ModelAndView business(){
        return new ModelAndView("admin/business");
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
        List<MmsFormatMas> mmsFormatMasList = mmsFormatMasService.findMmsFormatList();
        result.setPrcsCd6Cnt(cntInfo.getPrcsCd6Cnt());
        result.setLstRcptDttm(cntInfo.getLstRcptDttm());
        result.setMmsFormatMasList(mmsFormatMasList);
        res.setData(result);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/transReqSave")
    @ResponseBody
    public ResponseEntity<?> transReqSave(TransReqMas param){
        param.setReqAmt(param.getReqAmt().replaceAll(",", ""));
        param.setChargeAmt(param.getChargeAmt().replaceAll(",", ""));
        param.setTotReqAmt(param.getTotReqAmt().replaceAll(",", ""));
        param.setTradePrice(param.getTradePrice().replaceAll(",", ""));
        param.setPhoneNo(param.getPhoneNo().replaceAll("-", ""));

        transReqMasService.insert(param);

        Response<Object> res = new Response<>();
        res.setStatusCode(Response.ResultCode.SUCCESS.getCode());

        return ResponseEntity.ok(res);
    }

    @PostMapping("/transPrcsCdUpdate")
    @ResponseBody
    public ResponseEntity<?> transPrcsCdUpdate(TransReqMas param){

        int vs = transReqMasService.transPrcsCdUpdate(param);

        Response<Object> res = new Response<>();
        res.setStatusCode(Response.ResultCode.SUCCESS.getCode());

        return ResponseEntity.ok(res);
    }

    @PostMapping("/mmsFormatList")
    @ResponseBody
    public ResponseEntity<?> mmsFormatList(){
        Response<Object> res = new Response<>();

        List<MmsFormatMas> list = mmsFormatMasService.findMmsFormatList();

        res.setData(list);
        res.setStatusCode(Response.ResultCode.SUCCESS.getCode());

        return ResponseEntity.ok(res);
    }

    @PostMapping("/mmsFormatSave")
    @ResponseBody
    public ResponseEntity<?> mmsFormatSave(MmsFormatMas param){
        Response<Object> res = new Response<>();

//        mmsFormatMasService.insert(param);
        mmsFormatMasService.update(param);
        res.setStatusCode(Response.ResultCode.SUCCESS.getCode());

        return ResponseEntity.ok(res);
    }





}
