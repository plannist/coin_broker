package com.coin.broker.front.service;

import com.coin.broker.admin.model.MmsFormatMas;
import com.coin.broker.front.model.TransReqMas;

import java.util.List;

public interface TransReqMasService {
    int insert(TransReqMas param);

    int findRecentReqList(TransReqMas param);

    List<TransReqMas> findAdminTransReqList(TransReqMas param);

    int findAdminTransReqCnt(TransReqMas param);

    int findNewRequest();

    TransReqMas findTransReqDtl(TransReqMas param);

    TransReqMas findCusTransCnt(TransReqMas param);

    List<MmsFormatMas> findMmsFormats();

    int transPrcsCdUpdate(TransReqMas param);
}
