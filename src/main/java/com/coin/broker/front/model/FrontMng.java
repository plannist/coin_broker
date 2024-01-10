package com.coin.broker.front.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FrontMng {
    private int idx;
    private LocalDateTime mtnStartDttm;
    private LocalDateTime mtnEndDttm;
    private String title;
    private String contents;
    private String mtnYn;
    private LocalDateTime regDttm;

}
