package com.coin.broker.front.service;

import com.coin.broker.front.mapper.CoinMasMapper;
import com.coin.broker.front.model.CoinMas;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CoinMasServiceImpl implements CoinMasService{

    final CoinMasMapper coinMasMapper;

    @Override
    public CoinMas getCoinInfo(CoinMas param) {
        return coinMasMapper.getCoinInfo(param);
    }

    @Override
    @Transactional
    public int chargeMngAndCoinMasUpdate(CoinMas param) {

        int cnt = coinMasMapper.coinMasUpdate(param);

        //merge 문으로 key 변경사항시 수수료만 업데이트 처리
        param.getChargeMngs().forEach(coinMasMapper ::  chargeMngMerge);

        return cnt;
    }
}
