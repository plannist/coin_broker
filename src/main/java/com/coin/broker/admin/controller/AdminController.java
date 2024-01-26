package com.coin.broker.admin.controller;

import com.coin.broker.admin.model.AdminMas;
import com.coin.broker.admin.model.BasicInfMng;
import com.coin.broker.admin.model.MmsFormatMas;
import com.coin.broker.admin.model.WltAddrMng;
import com.coin.broker.admin.service.AdminService;
import com.coin.broker.admin.service.BasicInfMngService;
import com.coin.broker.admin.service.MmsFormatMasService;
import com.coin.broker.admin.service.WalletService;
import com.coin.broker.front.model.CoinChargeMng;
import com.coin.broker.front.model.CoinMas;
import com.coin.broker.front.model.FrontMng;
import com.coin.broker.front.model.TransReqMas;
import com.coin.broker.front.service.CoinMasService;
import com.coin.broker.front.service.FrontMngService;
import com.coin.broker.front.service.TransReqMasService;
import com.coin.broker.util.Response;
import com.coin.broker.util.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    final TransReqMasService transReqMasService;

    final MmsFormatMasService mmsFormatMasService;

    final WalletService walletService;

    final FrontMngService frontMngService;

    final BasicInfMngService basicInfMngService;

    final AdminService adminService;

    final CoinMasService coinMasService;


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

    @PostMapping("/basic-info-find")
    @ResponseBody
    public Response<?> basicInfoFind(@AuthenticationPrincipal AdminMas admin){
        Response<BasicInfMng> res = new Response<>();
        BasicInfMng info = basicInfMngService.findOne();
        List<AdminMas> adminList = adminService.findAll();
        info.setAdminList(adminList);
        res.setData(info);
        return res;
    }

    @PostMapping("/basic-info-save")
    @ResponseBody
    public Response<?> basicInfoSave(@AuthenticationPrincipal AdminMas admin, @Validated BasicInfMng param, BindingResult bindingResult){
        Response<Object> res = new Response<>();
        if(bindingResult.hasErrors()){
            res.setStatusCode(Response.ResultCode.FAIL.getCode());
            return res;
        }


        //TODO: 로그인한 사용자 변경 사항 있을시 로그 아웃처리 필요
        //아이디 변경 혹은 비밀번호 변경 사용자 확인
        List<AdminMas> changeList = param.getAdminList().stream().filter(e-> !e.getId().equals(e.getBeforeId()) || Utils.isNotEmpty(e.getPassword()) ).toList();
        //로그인한 사용자가 변경된 사용자 목록에 있는지
        boolean flag = changeList.stream().anyMatch(e -> e.getBeforeId().equals(admin.getId()));
        log.info("flag: >>{}", flag);
        Map<String, Boolean> map = new HashMap<>();
        map.put("flag", flag);
        res.setData(map);

        int cnt = basicInfMngService.save(param);
        cnt     += adminService.save(param.getAdminList());
        res.setStatusCode(Response.ResultCode.SUCCESS.getCode());


        return res;
    }

    @Deprecated
    @PostMapping("/admin-info-save")
    @ResponseBody
    public Response<?> adminInfoSave(@AuthenticationPrincipal AdminMas admin, BasicInfMng param){
        Response<BasicInfMng> res = new Response<>();

//        int cnt = adminService.save(list);
        res.setStatusCode(Response.ResultCode.SUCCESS.getCode());
        return res;
    }

    @GetMapping("/business")
    public ModelAndView business(){
        return new ModelAndView("admin/business");
    }

    @PostMapping("/business-find")
    @ResponseBody
    public Response<?> businessFind( CoinMas param){
        Response<CoinMas> res = new Response<>();

        CoinMas coinInfo = coinMasService.getCoinInfo(param);
        coinInfo.getChargeMngs().add(new CoinChargeMng());
        res.setData(coinInfo);
        res.setStatusCode(Response.ResultCode.SUCCESS.getCode());

        return res;
    }

    @PostMapping("/business-save")
    @ResponseBody
    public Response<?> businessSave(@RequestBody CoinMas param){
        Response<Object> res = new Response<>();

        int maxAmt = param.getMaxAmt();
        int maxRange = param.getChargeMngs().stream().filter(e-> "F".equals(e.getNewRow())).mapToInt(CoinChargeMng::getRangeIdx).max().getAsInt();
        int newRowRange = param.getChargeMngs().stream().filter(e-> "T".equals(e.getNewRow())).mapToInt(CoinChargeMng :: getRangeIdx).findAny().getAsInt();
        log.info("maxAmt[{}], maxRange[{}], newRowRange[{}]", maxAmt, maxRange, newRowRange);

        //신규 row 생성시 최대 충전금액 비교 validation
        if(newRowRange > 0 && maxAmt != newRowRange){
            res.setStatusMessage("추가된 수수료 까지 금액이 최대충전금액보다 낮습니다.");
            res.setStatusCode(Response.ResultCode.FAIL.getCode());
            return res;
        }

        //신규 row 생성시 마지막 값보다 큰지 비교
        if(newRowRange >0 && newRowRange <= maxRange){
            res.setStatusMessage("추가된 수수료 까지 금액이 기존 최대 까지 금액보다 낮습니다.");
            res.setStatusCode(Response.ResultCode.FAIL.getCode());
            return res;
        }

        //기존 row 수정시 최대 충전금액 비교 validation
        if(newRowRange == 0 && maxAmt != maxRange){
            res.setStatusMessage("최대신청금액과 최대 수수료 까지 금액이 다릅니다.");
            res.setStatusCode(Response.ResultCode.FAIL.getCode());
            return res;
        }

        int cnt = coinMasService.chargeMngAndCoinMasUpdate(param);
        res.setStatusCode(Response.ResultCode.SUCCESS.getCode());


        return res;
    }

    @PostMapping("/business-delete")
    @ResponseBody
    public Response<?> businessDelete(CoinChargeMng param){
        Response<Object> res = new Response<>();
        int cnt = coinMasService.chargeMngDelete(param);
        log.info("cnt: {}",cnt);
        res.setStatusCode(cnt == 2 ? Response.ResultCode.SUCCESS.getCode() : Response.ResultCode.FAIL.getCode());
        return res;
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
        result.setTodayCd6Cnt(cntInfo.getTodayCd6Cnt());
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
