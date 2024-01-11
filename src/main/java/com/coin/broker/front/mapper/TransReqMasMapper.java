package com.coin.broker.front.mapper;

import com.coin.broker.front.model.TransReqMas;
import org.springframework.stereotype.Repository;

@Repository
public interface TransReqMasMapper {
    int insert(TransReqMas param);
}
