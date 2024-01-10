package com.coin.broker;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(value = "com.coin.broker.**.mapper")
public class CoinBrokerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoinBrokerApplication.class, args);
	}

}
