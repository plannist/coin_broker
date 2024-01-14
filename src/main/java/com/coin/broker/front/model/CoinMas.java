package com.coin.broker.front.model;

import lombok.Data;

import java.util.List;

@Data
public class CoinMas {

    private String coinType;
    private int maxAmt;
    private int minIAmt;
    private int minTAmt;

    List<CoinChargeMng> chargeMngs;

}
