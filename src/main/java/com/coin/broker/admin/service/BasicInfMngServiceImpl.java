package com.coin.broker.admin.service;

import com.coin.broker.admin.mapper.AdminMapper;
import com.coin.broker.admin.mapper.BasicInfMngMapper;
import com.coin.broker.admin.model.AdminMas;
import com.coin.broker.admin.model.BasicInfMng;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BasicInfMngServiceImpl implements BasicInfMngService{

    final BasicInfMngMapper basicInfMngMapper;

    final AdminMapper adminMapper;

    @Override
    public int save(BasicInfMng param) {
        return basicInfMngMapper.save(param);
    }

    @Override
    public BasicInfMng findOne() {
        return basicInfMngMapper.findOne();
    }
}
