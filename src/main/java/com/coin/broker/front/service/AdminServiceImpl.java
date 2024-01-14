package com.coin.broker.front.service;

import com.coin.broker.front.mapper.AdminMapper;
import com.coin.broker.front.model.AdminMas;
import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminServiceImpl implements AdminService{

    final AdminMapper adminMapper;
    @Override
    public void insertAdmin(AdminMas param) {
        adminMapper.insertAdmin(param);
    }

    @Override
    public AdminMas findById(AdminMas param) {
        return adminMapper.findById(param);
    }
}
