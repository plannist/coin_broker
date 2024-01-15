package com.coin.broker.front.model;

import com.coin.broker.admin.model.Pagination;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TransReqMas extends Pagination {
    private String          reqno;
    private String          coinType;
    private String          chargeCd;
    private String          reqAmt;
    private String          chargeAmt;
    private String          totReqAmt;
    private String          sendCoin;
    private String          toWalletAddr;
    private String          dstntTag;
    private String          deposNm;
    private String          phoneNo;
    private String          rsnCtnt;
    private String          deviceType;
    private String          refererUrl;
    private String          regDttm;
    private String          modDttm;
    private String          prcsCd;
    private String          tradePrice;

}
