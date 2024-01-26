package com.coin.broker.front.mapper;

import com.coin.broker.front.model.CoinChargeMng;
import com.coin.broker.front.model.CoinMas;
import org.springframework.stereotype.Repository;

@Repository
public interface CoinMasMapper {
    CoinMas getCoinInfo(CoinMas param);

    int coinMasUpdate(CoinMas param);

    int chargeMngMerge(CoinChargeMng param);
}
