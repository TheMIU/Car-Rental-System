package lk.ijse.car_rental.controller;

import lk.ijse.car_rental.dto.UserDTO;
import lk.ijse.car_rental.service.UserService;
import lk.ijse.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService service;

    // save user
    @PostMapping
    public ResponseUtil saveCustomer(@ModelAttribute UserDTO dto) {
        service.saveUser(dto);
        return new ResponseUtil("Ok", "Success", dto);
    }
}
