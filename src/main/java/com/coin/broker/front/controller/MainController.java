package com.coin.broker.front.controller;

import com.coin.broker.admin.model.AdminMas;
import com.coin.broker.admin.service.AdminService;
import com.coin.broker.front.model.*;
import com.coin.broker.front.service.*;
import com.coin.broker.util.Response;
import com.coin.broker.util.Utils;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MainController {

    final FrontMngService frontMngService;

    final TransReqMasService transReqMasService;

    final UpbitService upbitService;

    final CoinMasService coinMasService;

    final AdminService adminService;

    final Environment env;

    final BCryptPasswordEncoder encoder;

    @PostConstruct
    public void init()  {
        String profile = env.getActiveProfiles()[0];
        log.info("================================");
        log.info("======={}=======", profile);
        log.info("================================");

    }

    @GetMapping("/")
    public ModelAndView index(){
        ModelAndView mv = new ModelAndView();
        FrontMng frontMng = frontMngService.findFrontMngInfo();
        if(frontMng != null && "1".equals(frontMng.getMtnYn())){
            mv.setViewName("error");
        }else{
            mv.setViewName("index");
        }
        return mv;
    }

    @PostMapping("/transReq")
    @ResponseBody
    public ResponseEntity<?> transReq(TransReqMas param, HttpServletRequest request){
        Response<?> res = new Response<>();
        param.setReqAmt(param.getReqAmt().replaceAll(",", ""));
        param.setChargeAmt(param.getChargeAmt().replaceAll(",", ""));
        param.setTotReqAmt(param.getTotReqAmt().replaceAll(",", ""));
        param.setPhoneNo(param.getPhoneNo().replaceAll("-", ""));

        int cnt = transReqMasService.findRecentReqList(param);
        if(cnt > 0){
            res.setStatusMessage("이미 처리중인 대행 신청건이 있습니다. 처리중인 신청건이 완료된 후 이용해주세요.");
            res.setStatusCode(Response.ResultCode.FAIL.getCode());
            return ResponseEntity.ok(res);
        }

        String ip = "";
        String firstIp = request.getHeader("X-FORWARDED-FOR");
        String proxyIp = request.getHeader("Proxy-Client-IP");
        String proxyIp2 = request.getHeader("WL-Proxy-Client-IP");
        log.info("firstIp :: >>>> {}", firstIp);
        log.info("proxyIp :: >>>> {}", proxyIp);
        log.info("proxyIp2 :: >>> {}", proxyIp2);

        //proxy 환경일 경우
        if (Utils.isEmpty(firstIp)) {
            ip = proxyIp;
        }

        //웹로직 서버일 경우
        if (Utils.isEmpty(proxyIp)) {
            ip = proxyIp2;
        }

        if (Utils.isEmpty(proxyIp2)) {
            ip = request.getRemoteAddr() ;
        }
        log.info("final ip :: >>> {}", ip);
        param.setClientIp(ip);

        try{
            transReqMasService.insert(param);
            res.setStatusCode(Response.ResultCode.SUCCESS.getCode());
            return ResponseEntity.ok(res);
        }catch(Exception e){
            return ResponseEntity.internalServerError().body(res);
        }

    }

    @GetMapping("/error")
    public ModelAndView error(){

//        ModelAndView mv = new ModelAndView("index");
        ModelAndView mv = new ModelAndView("error");
        log.info("main <<");

        return mv;
    }

    @GetMapping("/map")
    public ResponseEntity<?> map(AdminMas param){

        param.setId("admin2");
        param.setName("테스트관리자");
        param.setAuth("관리자");
        param.setPassword(encoder.encode("qwer1234"));

        adminService.insertAdmin(param);


        return ResponseEntity.ok("1234");
    }

    @GetMapping("/hidden")
    public ModelAndView hiddenPg(@AuthenticationPrincipal AdminMas adminMas){
        log.info("adminMas >>{}", adminMas);

        return new ModelAndView("index");
    }

    @PostMapping("/api/coinPrice")
    @ResponseBody
    public ResponseEntity<?> coinPrice(TransReqMas param){
        Response<List<CoinPrice>> res = new Response<>();
        try {
            List<CoinPrice> list = upbitService.getCoinPrice();
            if("ADMIN".equals(param.getCoinType())){
                int cnt = transReqMasService.findNewRequest();
                //admin 현재 보고있는 요청 건수
                res.setTotalCount(cnt);
            }
//            log.info("Coin Price ::: {}", list);
            res.setData(list);
            res.setStatusCode(Response.ResultCode.SUCCESS.getCode());
        } catch (Exception e) {
            log.error("업비트 TOO MANY REQUEST");
            res.setStatusCode(Response.ResultCode.FAIL.getCode());
        }

        return ResponseEntity.ok(res);
    }

    @PostMapping("/api/getCoinMas")
    @ResponseBody
    public ResponseEntity<?> getCoinMas(CoinMas param){
        Response<CoinMas> res = new Response<>();

        CoinMas coinMas = coinMasService.getCoinInfo(param);

        res.setData(coinMas);
        res.setStatusCode(Response.ResultCode.SUCCESS.getCode());

        return ResponseEntity.ok(res);
    }

    @PostMapping("/api/isOpeningTime")
    @ResponseBody
    public ResponseEntity<?> isOpeningTime(@AuthenticationPrincipal AdminMas admin){
        Response<Object> res = new Response<>();
        LocalTime time = LocalTime.now();
        int hour = time.getHour();
        log.info("hour: >>{}", hour);
        if(Utils.isEmpty(admin)){
            if(hour < 8){
                res.setStatusCode(Response.ResultCode.FAIL.getCode());

            }else{
                res.setStatusCode(Response.ResultCode.SUCCESS.getCode());
            }
        }else{
            res.setStatusCode(Response.ResultCode.SUCCESS.getCode());
        }


        return ResponseEntity.ok(res);

    }
}
