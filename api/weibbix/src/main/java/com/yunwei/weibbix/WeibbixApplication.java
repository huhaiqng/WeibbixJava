package com.yunwei.weibbix;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages="com.yunwei.weibbix")
@MapperScan(value = "com.yunwei.weibbix.mapper")
@SpringBootApplication
public class WeibbixApplication {

	public static void main(String[] args) {
		SpringApplication.run(WeibbixApplication.class, args);
	}

}

