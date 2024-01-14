package com.coin.broker.front.service;

import com.coin.broker.front.mapper.CoinMasMapper;
import com.coin.broker.front.model.CoinMas;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CoinMasServiceImpl implements CoinMasService{

    final CoinMasMapper coinMasMapper;

    @Override
    public CoinMas getCoinInfo(CoinMas param) {
        return coinMasMapper.getCoinInfo(param);
    }
}
