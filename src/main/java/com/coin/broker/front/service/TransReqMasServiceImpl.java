package com.coin.broker.front.service;

import com.coin.broker.front.mapper.TransReqMasMapper;
import com.coin.broker.front.model.TransReqMas;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransReqMasServiceImpl implements TransReqMasService{

    final TransReqMasMapper transReqMasMapper;
    @Override
    public int insert(TransReqMas param) {
        return transReqMasMapper.insert(param);
    }

    @Override
    public int findRecentReqList(TransReqMas param) {
        return transReqMasMapper.findRecentReqList(param);
    }
}
