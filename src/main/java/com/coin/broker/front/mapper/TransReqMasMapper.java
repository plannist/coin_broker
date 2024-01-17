package com.coin.broker.front.mapper;

import com.coin.broker.front.model.TransReqMas;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransReqMasMapper {
    int insert(TransReqMas param);

    int findRecentReqList(TransReqMas param);

    List<TransReqMas> findAdminTransReqList(TransReqMas param);

    int findAdminTransReqCnt(TransReqMas param);

    int findNewRequest();

    TransReqMas findTransReqDtl(TransReqMas param);

    TransReqMas findCusTransCnt(TransReqMas param);
}
