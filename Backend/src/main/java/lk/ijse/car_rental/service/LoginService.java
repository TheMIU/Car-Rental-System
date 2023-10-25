package lk.ijse.car_rental.service;

import lk.ijse.car_rental.dto.LoginDTO;

import java.util.List;

public interface LoginService {
    void save(LoginDTO dto);

    List<LoginDTO> getAll();

    void update(LoginDTO dto);

    void delete(String id);

    boolean checkValidUser(LoginDTO dto);
}
