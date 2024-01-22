package com.coin.broker.admin.model;

import lombok.Data;

@Data
public class WltAddrMng {
    private String wltAddr;
    private String memo;
    private String regDttm;

    //삭제 추가 param
    private String type ; //I : insert, D : delete

    //검색 파라미터
    private String          keyword;
    private String          input;

}
