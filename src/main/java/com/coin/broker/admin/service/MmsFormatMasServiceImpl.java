package com.coin.broker.admin.service;

import com.coin.broker.admin.mapper.MmsFormatMasMapper;
import com.coin.broker.admin.model.MmsFormatMas;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MmsFormatMasServiceImpl implements MmsFormatMasService{

    final MmsFormatMasMapper mmsFormatMasMapper;

    @Override
    public List<MmsFormatMas> findMmsFormatList() {
        return mmsFormatMasMapper.findMmsFormatList();
    }

    @Override
    public int insert(MmsFormatMas param) {
        return mmsFormatMasMapper.insert(param);
    }

    @Override
    public void update(MmsFormatMas param) {
        mmsFormatMasMapper.update(param);
    }
}
