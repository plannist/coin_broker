package com.coin.broker.admin.mapper;

import com.coin.broker.admin.model.BasicInfMng;
import org.springframework.stereotype.Repository;

@Repository
public interface BasicInfMngMapper {
    int save(BasicInfMng param);

    BasicInfMng findOne();
}
