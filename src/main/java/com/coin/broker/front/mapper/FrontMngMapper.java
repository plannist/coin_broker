package com.coin.broker.front.mapper;

import com.coin.broker.front.model.FrontMng;
import org.springframework.stereotype.Repository;

@Repository
public interface FrontMngMapper {
    FrontMng findFrontMngInfo();
}
