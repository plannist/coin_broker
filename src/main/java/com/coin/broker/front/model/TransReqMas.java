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
    private String          clientIp;

    //admin 표시
    private String          prcsNm;
    private int             prcsCd6Cnt; //거래완료 건수
    private String          lstRcptDttm; //최종거래완료 시각


    /**
     * trans_rcpt_mas 항목
     * */
    private String transactionId;
    private String transCoin;
    private String transDttm;

    /**
     * wlt_addr_mng 항목
     * */
    private String wltAddr;
    private String memo;


    /**
     * nowPrice
     * calcPrice
     * accType inlineRadio1, inlineRadio2
     * mmsFormat
     *
     *   // input에 담긴 데이터를 선택
     *     $('#data-area').select();
     *
     *     //  clipboard에 데이터 복사
     *     var copy = document.execCommand('copy');
     *
     * */
}
