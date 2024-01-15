package com.coin.broker.admin.mapper;

import com.coin.broker.admin.model.AdminMas;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminMapper {
    void insertAdmin(AdminMas param);

    AdminMas findById(AdminMas param);
}
