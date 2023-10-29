package lk.ijse.car_rental.service;

import lk.ijse.car_rental.dto.UserDTO;

import java.io.IOException;
import java.util.List;

public interface UserService {
    void saveUser(UserDTO dto);

    List<UserDTO> getAllUsers();

    void updateUser(UserDTO dto);

    void deleteUser(String id);

    String getNextUserID();

    String getImage(String imageName) throws IOException;

    void toggleEditable(String isEditable);

    void deleteImage(String imageName);

    void approveUser(String userId);

    UserDTO findUser(String userId);
}
