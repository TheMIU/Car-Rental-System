package lk.ijse.car_rental.service.impl;

import lk.ijse.car_rental.dto.UserDTO;
import lk.ijse.car_rental.entity.User;
import lk.ijse.car_rental.repo.UserRepo;
import lk.ijse.car_rental.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveUser(UserDTO dto) {
        dto.setUserId(getLastUserID());
        System.out.println(dto);
        if (userRepo.existsById(dto.getUserId())) throw new RuntimeException("Error, already added!");
        userRepo.save(mapper.map(dto, User.class));
    }

    @Override
    public String getLastUserID() {
        User lastUser = userRepo.findFirstByOrderByUserIdDesc();
        if (lastUser == null) {
            return "C1";
        } else {
            String lastUserId = lastUser.getUserId();
            int lastId = Integer.parseInt(lastUserId.substring(1));
            int newId = lastId + 1;
            System.out.println(newId);
            return "C" + newId;
        }
    }
}
