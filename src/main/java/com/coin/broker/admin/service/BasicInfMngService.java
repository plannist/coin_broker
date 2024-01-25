package com.coin.broker.admin.service;

import com.coin.broker.admin.model.BasicInfMng;

public interface BasicInfMngService {

    int save(BasicInfMng param);

    BasicInfMng findOne();
}
