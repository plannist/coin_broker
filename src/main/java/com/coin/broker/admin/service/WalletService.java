package com.coin.broker.admin.service;

import com.coin.broker.admin.model.WltAddrMng;

import java.util.List;

public interface WalletService {
    List<WltAddrMng> findWalletMemos(WltAddrMng param);
}
