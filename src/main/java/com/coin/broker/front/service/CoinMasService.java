package com.coin.broker.front.service;

import com.coin.broker.front.model.CoinChargeMng;
import com.coin.broker.front.model.CoinMas;

public interface CoinMasService {

    public CoinMas getCoinInfo(CoinMas param);

    int chargeMngAndCoinMasUpdate(CoinMas param);

    int chargeMngDelete(CoinChargeMng param);
}
