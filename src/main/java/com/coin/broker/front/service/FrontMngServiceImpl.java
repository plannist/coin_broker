package com.coin.broker.front.service;

import com.coin.broker.front.mapper.FrontMngMapper;
import com.coin.broker.front.model.FrontMng;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FrontMngServiceImpl implements FrontMngService{

    final FrontMngMapper frontMngMapper;
    @Override
    public FrontMng findFrontMngInfo() {
        return frontMngMapper.findFrontMngInfo();
    }
}
