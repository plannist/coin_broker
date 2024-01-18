package com.coin.broker.admin.service;

import com.coin.broker.admin.model.MmsFormatMas;

import java.util.List;

public interface MmsFormatMasService {


    List<MmsFormatMas> findMmsFormatList();

    int insert(MmsFormatMas param);
}
