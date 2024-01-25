package com.coin.broker.admin.service;

import com.coin.broker.admin.mapper.AdminMapper;
import com.coin.broker.admin.model.AdminMas;
import com.coin.broker.util.Utils;
import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminServiceImpl implements AdminService{

    final AdminMapper adminMapper;

    final BCryptPasswordEncoder encoder;
    @Override
    public void insertAdmin(AdminMas param) {
        adminMapper.insertAdmin(param);
    }

    @Override
    public AdminMas findById(AdminMas param) {
        return adminMapper.findById(param);
    }

    @Override
    public int save(List<AdminMas> list) {
        List<AdminMas> omms = new ArrayList<>();
        list.forEach(e-> {
            if(Utils.isNotEmpty(e.getPassword())){
                String pwd = encoder.encode(e.getPassword());
                e.setPassword(pwd);
                omms.add(e);
            }else if(!e.getId().equals(e.getBeforeId())){
                omms.add(e);
            }
        });

        omms.forEach(adminMapper::update);
        return 0;
    }

    @Override
    public List<AdminMas> findAll() {
        return adminMapper.findAll();
    }
}
