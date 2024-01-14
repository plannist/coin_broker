package com.coin.broker.front.service;

import com.coin.broker.front.model.AdminMas;

public interface AdminService {
    void insertAdmin(AdminMas param);

    AdminMas findById(AdminMas param);
}
