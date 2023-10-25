package lk.ijse.car_rental.repo;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import lk.ijse.car_rental.config.WebRootConfig;
import lk.ijse.car_rental.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.transaction.Transactional;
import java.util.List;

@WebAppConfiguration
@ContextConfiguration(classes = {WebRootConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
class LoginRepoTest {
    @Autowired
    LoginRepo loginRepo;

    @Test
    void findLoginByLoginNameIsContaining() {
        boolean b = loginRepo.existsByLoginNameEquals("a");
        System.out.println(b);
    }
}