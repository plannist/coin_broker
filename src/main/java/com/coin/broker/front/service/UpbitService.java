package com.coin.broker.front.service;

import com.coin.broker.front.model.CoinPrice;

import java.io.IOException;
import java.util.List;

public interface UpbitService {

    public List<CoinPrice> getCoinPrice() throws IOException;
}
