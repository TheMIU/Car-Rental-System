package lk.ijse.car_rental.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import java.io.File;

@Configuration
@Import(JPAConfig.class)
@ComponentScan(basePackages = "lk.ijse.car_rental.service")
public class WebRootConfig {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();

        // Set the maximum file size (in bytes)
        resolver.setMaxUploadSize(10 * 1024 * 1024); // 10MB

        // Set the maximum request size (in bytes)
        resolver.setMaxInMemorySize(10240); // 10KB (Optional)

        return resolver;
    }
}
