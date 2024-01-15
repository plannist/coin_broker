package com.coin.broker.admin.model;

import lombok.Data;

@Data
public class Pagination {

    private int start; //시작 row  >> 0 ~ [offset 바인딩변수]

    private int length; //block 크기 >> 10, 20, 30, 50, 100 [limit 바인딩변수]

}
