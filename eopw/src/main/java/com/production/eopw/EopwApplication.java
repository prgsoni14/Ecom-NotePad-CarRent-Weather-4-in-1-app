package com.production.eopw;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EopwApplication {

	public static void main(String[] args) {
		SpringApplication.run(EopwApplication.class, args);

		System.out.println("The Server(API) is running at 8080");
	
	}

}
