package lk.ijse.car_rental.service.impl;

import lk.ijse.car_rental.dto.LoginDTO;
import lk.ijse.car_rental.entity.Login;
import lk.ijse.car_rental.repo.LoginRepo;
import lk.ijse.car_rental.service.LoginService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {
    @Autowired
    private LoginRepo loginRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void save(LoginDTO dto) {
        loginRepo.save(mapper.map(dto, Login.class));
    }

    @Override
    public List<LoginDTO> getAll() {
        List<Login> all = loginRepo.findAllOrderedBySubstring();
        return mapper.map(all, new TypeToken<ArrayList<LoginDTO>>() {
        }.getType());
    }

    @Override
    public void update(LoginDTO dto) {
        if (!loginRepo.existsById(dto.getLoginId())) throw new RuntimeException("not exists!");
        loginRepo.save(mapper.map(dto, Login.class));
    }

    @Override
    public void delete(String id) {
        loginRepo.deleteById(id);
    }

    @Override
    public LoginDTO checkValidUser(LoginDTO dto) {
        boolean loginNameContaining = loginRepo.existsByLoginNameEquals(dto.getLoginName());
        boolean passwordContaining = loginRepo.existsByPasswordEquals(dto.getPassword());

        if (loginNameContaining && passwordContaining) {
            Login loginByLoginName = loginRepo.findLoginByLoginName(dto.getLoginName());
            return mapper.map(loginByLoginName, LoginDTO.class);
        } else {
            return null;
        }
    }
}
