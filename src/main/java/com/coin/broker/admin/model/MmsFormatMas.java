package com.coin.broker.admin.model;

import lombok.Data;

@Data
public class MmsFormatMas {
    private String          prcsCd;
    private String          mmsTitle;
    private String          mmsContents;
    private String          regDttm;
    private String          modDttm;

    /*타이틀 수정가능여부*/
    private String          titleChangeYn;
}
