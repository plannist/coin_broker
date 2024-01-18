package com.coin.broker.front.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.coin.broker.front.model.CoinPrice;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class UpbitServiceImpl implements UpbitService{

    @Value("${upbit.access-key}")
    private String accessKey;

    @Value("${upbit.secret-key}")
    private String secretKey;

    private String rootUrl = "https://api.upbit.com";

    private String [] coinCds = {"KRW-BTC", "KRW-ETH", "KRW-XRP"};

    @Override
    public List<CoinPrice> getCoinPrice() throws Exception {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        String jwtToken = JWT.create()
                .withClaim("access_key", accessKey)
                .withClaim("nonce", UUID.randomUUID().toString())
                .sign(algorithm);

        String authenticationToken = "Bearer " + jwtToken;

        List<CoinPrice> list = new ArrayList<>();

        OkHttpClient client = new OkHttpClient();
        for(String cd : coinCds){
            String url = rootUrl + "/v1/ticker?markets="+cd;
            Request request = new Request.Builder()
                    .url(url)
                    .get()
                    .addHeader("accept", "application/json")
                    .build();


            Response res = client.newCall(request).execute();
            String result = res.body().string();

            JsonObject job = JsonParser.parseString(result).getAsJsonArray().get(0).getAsJsonObject();
            String price = job.get("trade_price").getAsString();

            //형식
            price = price.substring(0, price.indexOf("."));

            CoinPrice coinPrice = new CoinPrice();
            coinPrice.setCoinType(cd);
            coinPrice.setAmt(price);
            list.add(coinPrice);


//            Gson gson = new Gson();
//            CoinPrice price = gson.fromJson(res.body().string(), new TypeToken<CoinPrice>(){}.getType());

        }

        return list;
    }
}
