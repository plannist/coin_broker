package com.coin.broker.admin.service;

import com.coin.broker.admin.mapper.BasicInfMngMapper;
import com.coin.broker.admin.model.BasicInfMng;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BasicInfMngServiceImpl implements BasicInfMngService{

    final BasicInfMngMapper mapper;

    @Override
    public int save(BasicInfMng param) {
        return mapper.save(param);
    }
}
