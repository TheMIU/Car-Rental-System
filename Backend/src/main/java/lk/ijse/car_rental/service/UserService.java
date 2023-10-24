package lk.ijse.car_rental.service;

import lk.ijse.car_rental.dto.UserDTO;

import java.util.List;

public interface UserService {
    void saveUser(UserDTO dto);

    List<UserDTO> getAllUsers();

    void updateUser(UserDTO dto);

    void deleteUser(String id);

    String getNextUserID();
}
