package com.coin.broker.front.service;

import com.coin.broker.front.mapper.CoinMasMapper;
import com.coin.broker.front.model.CoinChargeMng;
import com.coin.broker.front.model.CoinMas;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class CoinMasServiceImpl implements CoinMasService{

    final CoinMasMapper coinMasMapper;

    final Environment env;

    @Override
    public CoinMas getCoinInfo(CoinMas param) {
        String profile = env.getActiveProfiles()[0];
        if("dev".equals(profile)){
            return coinMasMapper.getCoinInfo(param);
        }else{
            return coinMasMapper.getCoinInfoTemp(param);
        }

    }

    @Override
    @Transactional
    public int chargeMngAndCoinMasUpdate(CoinMas param) {
        String profile = env.getActiveProfiles()[0];



        if("dev".equals(profile)){
            coinMasMapper.coinMasUpdate(param);
        }else{
            coinMasMapper.coinMasUpdateTemp(param);
        }

        //merge 문으로 key 변경사항시 수수료만 업데이트 처리
        param.getChargeMngs().forEach(e-> {
            if(e.getRangeIdx() > 0){
                if("dev".equals(profile)){
                    coinMasMapper.chargeMngMerge(e);
                }else{
                    coinMasMapper.chargeMngMergeTemp(e);
                }

            }
        });

        return 0;
    }

    @Override
    public int chargeMngDelete(CoinChargeMng param) {
        String profile = env.getActiveProfiles()[0];
        if("dev".equals(profile)){
            return coinMasMapper.chargeMngDelete(param);
        }else{
            return coinMasMapper.chargeMngDeleteTemp(param);
        }
    }
}
