package com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
//@SpringBootApplication

@EnableJpaAuditing
@EnableEncryptableProperties
public class HikerStopBackend {

	public static void main(String[] args) {
		SpringApplication.run(HikerStopBackend.class, args);
	}
	
	

}
