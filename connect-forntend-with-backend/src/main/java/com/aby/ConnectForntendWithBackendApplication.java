package com.aby;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ConnectForntendWithBackendApplication {

	public static void main(String[] args) {
		// Load .env file into system properties before starting Spring Boot
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
		dotenv.entries().forEach(e -> System.setProperty(e.getKey(), e.getValue()));
		
		SpringApplication.run(ConnectForntendWithBackendApplication.class, args);
	}

}
