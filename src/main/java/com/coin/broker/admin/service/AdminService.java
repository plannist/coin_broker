package com.coin.broker.admin.service;

import com.coin.broker.admin.model.AdminMas;

public interface AdminService {
    void insertAdmin(AdminMas param);

    AdminMas findById(AdminMas param);
}
