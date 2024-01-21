package com.coin.broker.admin.mapper;

import com.coin.broker.admin.model.MmsFormatMas;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MmsFormatMasMapper {


    List<MmsFormatMas> findMmsFormatList();

    int insert(MmsFormatMas param);

    void update(MmsFormatMas param);
}
