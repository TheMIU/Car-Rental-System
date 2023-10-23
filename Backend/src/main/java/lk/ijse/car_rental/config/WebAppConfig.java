package lk.ijse.car_rental.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "lk.ijse.car_rental.controller")
public class WebAppConfig {
    public WebAppConfig() {
        System.out.println("WebAppConfig");
    }
}