package lk.ijse.car_rental.service.impl;

import lk.ijse.car_rental.config.WebRootConfig;
import lk.ijse.car_rental.dto.UserDTO;
import lk.ijse.car_rental.entity.User;
import lk.ijse.car_rental.repo.UserRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@WebAppConfiguration
@ContextConfiguration(classes = {WebRootConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
class UserServiceImplTest {
    @Autowired
    UserRepo userRepo;

    @Autowired
    ModelMapper mapper;

    @Test
    void getAllUsers() {
        List<User> all = userRepo.findAllOrderedBySubstring();
        Object map = mapper.map(all, new TypeToken<ArrayList<UserDTO>>() {
        }.getType());
        System.out.println(map);
    }

    @Test
    void getNextUserID() {
        String lastUserId = userRepo.findLastRecord();
        System.out.println("Last : " + lastUserId);

        if (lastUserId == null) {
            System.out.println("C1");
        } else {
            String[] lastNum = lastUserId.split("C");
            int lastId = Integer.parseInt(lastNum[1]);
            int newId = lastId + 1;

            System.out.println(Arrays.toString(lastNum));
            System.out.println("New : " + newId);
        }
    }
}