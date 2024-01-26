package com.coin.broker.front.model;

import lombok.Data;

@Data
public class CoinChargeMng {

    private String coinType;
    private int rangeIdx;
    private int chargeAmt;

    //view-data
    private int firstIdx;
    private int maxId;

    //param data
    private String newRow;
}
