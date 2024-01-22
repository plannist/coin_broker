package com.coin.broker.admin.service;

import com.coin.broker.admin.model.WltAddrMng;

import java.util.List;

public interface WalletService {
    List<WltAddrMng> findAll(WltAddrMng param);

    int insert(WltAddrMng param);

    int delete(WltAddrMng param);
}
