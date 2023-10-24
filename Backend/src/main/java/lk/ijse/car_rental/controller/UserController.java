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
    public ResponseUtil saveUser(@ModelAttribute UserDTO dto) {
        service.saveUser(dto);
        return new ResponseUtil("Ok", "Save User Success", null);
    }

    // get all users
    @GetMapping
    public ResponseUtil getAllUsers() {
        return new ResponseUtil("Ok", "Get all users Success", service.getAllUsers());
    }

    // update user
    @PutMapping
    public ResponseUtil updateUser(@ModelAttribute UserDTO dto) {
        service.updateUser(dto);
        return new ResponseUtil("Ok", "Update User Success", dto);
    }

    // delete user
    @DeleteMapping
    public ResponseUtil deleteUser(String userId) {
        service.deleteUser(userId);
        return new ResponseUtil("Ok", "Delete User Success", userId);
    }
}

