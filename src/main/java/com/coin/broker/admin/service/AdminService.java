package com.coin.broker.admin.service;

import com.coin.broker.admin.model.AdminMas;

import java.util.List;

public interface AdminService {
    void insertAdmin(AdminMas param);

    AdminMas findById(AdminMas param);

    int save(List<AdminMas> list);

    List<AdminMas> findAll();
}
