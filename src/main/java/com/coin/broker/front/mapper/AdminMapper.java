package com.coin.broker.front.mapper;

import com.coin.broker.front.model.AdminMas;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminMapper {
    void insertAdmin(AdminMas param);

    AdminMas findById(AdminMas param);
}
