package lk.ijse.car_rental.service;

import lk.ijse.car_rental.dto.UserDTO;

public interface UserService {
    void saveUser(UserDTO dto);

    String getLastUserID();
}
