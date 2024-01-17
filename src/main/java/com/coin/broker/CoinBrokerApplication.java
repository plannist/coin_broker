package com.coin.broker;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@MapperScan(value = "com.coin.broker.**.mapper")
//@ServletComponentScan(basePackages = {"com.coin.broker.filter"})
public class CoinBrokerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoinBrokerApplication.class, args);
	}

}
