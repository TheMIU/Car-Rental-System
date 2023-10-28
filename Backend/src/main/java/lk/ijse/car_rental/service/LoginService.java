package lk.ijse.car_rental.service;

import lk.ijse.car_rental.dto.LoginDTO;

import java.util.List;

public interface LoginService {
    boolean save(LoginDTO dto) throws Exception;

    List<LoginDTO> getAll();

    void update(LoginDTO dto);

    void delete(String id);

    LoginDTO checkValidUser(LoginDTO dto);
}
