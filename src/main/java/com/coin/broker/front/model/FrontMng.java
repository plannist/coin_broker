package com.coin.broker.front.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FrontMng {
    private Integer         idx;

    private Integer         openTime;
    private Integer         closeTime;
    private String          mtnYn;

    private String          mtnMsgYn;
    private String          mtnMsg;
    private String          ntc1Title;
    private String          ntc2Title;
    private String          ntc1Msg;
    private String          ntc2Msg;
    private String          ntc1Yn;
    private String          ntc2Yn;


    private String          regDttm;
    private String          mod_dttm;

    private String          profile;


}
