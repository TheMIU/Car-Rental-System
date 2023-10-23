package lk.ijse.car_rental.repo;

import lk.ijse.car_rental.config.WebRootConfig;
import lk.ijse.car_rental.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {WebRootConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
class UserRepoTest {
    @Autowired
    UserRepo userRepo;

    @Test
    void test() {
        User firstByOrderByUserIdDesc = userRepo.findFirstByOrderByUserIdDesc();
        System.out.println(firstByOrderByUserIdDesc);
    }
}