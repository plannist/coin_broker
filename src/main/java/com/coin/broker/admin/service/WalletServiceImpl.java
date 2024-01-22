package com.coin.broker.admin.service;

import com.coin.broker.admin.mapper.WalletMapper;
import com.coin.broker.admin.model.WltAddrMng;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService{

    final WalletMapper walletMapper;

    @Override
    public List<WltAddrMng> findAll(WltAddrMng param) {
        return walletMapper.findAll(param);
    }

    @Override
    public int insert(WltAddrMng param) {
        return walletMapper.insert(param);
    }

    @Override
    public int delete(WltAddrMng param) {
        return walletMapper.delete(param);
    }
}
