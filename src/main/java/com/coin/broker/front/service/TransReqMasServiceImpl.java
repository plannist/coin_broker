package com.coin.broker.front.service;

import com.coin.broker.admin.model.MmsFormatMas;
import com.coin.broker.front.mapper.TransReqMasMapper;
import com.coin.broker.front.model.TransReqMas;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public List<TransReqMas> findAdminTransReqList(TransReqMas param) {
        return transReqMasMapper.findAdminTransReqList(param);
    }

    @Override
    public int findAdminTransReqCnt(TransReqMas param) {
        return transReqMasMapper.findAdminTransReqCnt(param);
    }

    @Override
    public int findNewRequest() {
        return transReqMasMapper.findNewRequest();
    }

    @Override
    public TransReqMas findTransReqDtl(TransReqMas param) {
        return transReqMasMapper.findTransReqDtl(param);
    }

    @Override
    public TransReqMas findCusTransCnt(TransReqMas param) {
        return transReqMasMapper.findCusTransCnt(param);
    }

    @Override
    public List<MmsFormatMas> findMmsFormats() {
        return transReqMasMapper.findMmsFormats();
    }
}
