package com.coin.broker.admin.mapper;

import com.coin.broker.admin.model.WltAddrMng;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletMapper {
    List<WltAddrMng> findAll(WltAddrMng param);

    int insert(WltAddrMng param);

    int delete(WltAddrMng param);
}
