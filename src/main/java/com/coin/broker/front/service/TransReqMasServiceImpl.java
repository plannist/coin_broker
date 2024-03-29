package com.coin.broker.front.service;

import com.coin.broker.admin.model.MmsFormatMas;
import com.coin.broker.front.mapper.TransReqMasMapper;
import com.coin.broker.front.model.TelegramMessage;
import com.coin.broker.front.model.TransReqMas;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import okio.BufferedSink;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class TransReqMasServiceImpl implements TransReqMasService{

    final TransReqMasMapper transReqMasMapper;
    @Override
    public int insert(TransReqMas param) {
        return transReqMasMapper.insert(param);
    }

    @Override
    public int findRecentReqList(TransReqMas param) {
        return transReqMasMapper.findRecentReqList(param);
    }

    @Override
    public List<TransReqMas> findAdminTransReqList(TransReqMas param) {
        return transReqMasMapper.findAdminTransReqList(param);
    }

    @Override
    public int findAdminTransReqCnt(TransReqMas param) {
        return transReqMasMapper.findAdminTransReqCnt(param);
    }

    @Override
    public int findNewRequest() {
        return transReqMasMapper.findNewRequest();
    }

    @Override
    public TransReqMas findTransReqDtl(TransReqMas param) {
        return transReqMasMapper.findTransReqDtl(param);
    }

    @Override
    public TransReqMas findCusTransCnt(TransReqMas param) {
        return transReqMasMapper.findCusTransCnt(param);
    }

    @Override
    public List<MmsFormatMas> findMmsFormats() {
        return transReqMasMapper.findMmsFormats();
    }

    @Override
    public int transPrcsCdUpdate(TransReqMas param) {
        return transReqMasMapper.transPrcsCdUpdate(param);
    }

    @Override
    public void telegramSendMessage(TransReqMas param)throws Exception {
        String url = "https://api.telegram.org/bot6480356284:AAGKEwpiX4qt4XQD_JvCs6dOzqorX2rPZHk/sendMessage";

        String phoneNo = param.getPhoneNo();
        phoneNo = phoneNo.replaceAll("(\\d{3})(\\d{3,4})(\\d{4})", "$1-$2-$3");

        String coinType = param.getCoinType().substring(param.getCoinType().indexOf("-")+1);

        DecimalFormat df = new DecimalFormat("#,###");
        String reqAmt = df.format(Integer.parseInt(param.getReqAmt()));


        StringBuilder sb = new StringBuilder();
        sb.append("신청자: ".concat(param.getDeposNm())).append("\n");
        sb.append("연락처: ".concat(phoneNo)).append("\n");
        sb.append("신청코인: ".concat(coinType)).append("\n");
        sb.append("신청금액: ".concat(reqAmt)).append("원");

        log.info("sb >> \n{}", sb);

        TelegramMessage telegramMessage = new TelegramMessage();
        telegramMessage.setText(sb.toString());

        Gson gson = new Gson();
        String json = gson.toJson(telegramMessage);

        RequestBody requestBody = RequestBody.create(MediaType.parse("application/json; charset=UTF-8"), json);

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
                .addHeader("accept", "application/json")
                .build();



        Response res = client.newCall(request).execute();
        assert res.body() != null;
        String result = res.body().string();

        log.info("result :: >> {}" , result);

    }
}
