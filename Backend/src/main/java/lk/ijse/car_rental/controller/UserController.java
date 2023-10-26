package lk.ijse.car_rental.controller;

import lk.ijse.car_rental.dto.LoginDTO;
import lk.ijse.car_rental.dto.UserDTO;
import lk.ijse.car_rental.service.LoginService;
import lk.ijse.car_rental.service.UserService;
import lk.ijse.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService service;

    @Autowired
    private LoginService loginService;

    // get next user id
    @GetMapping("/next_id")
    public ResponseUtil getNextUserId() {
        return new ResponseUtil("Ok", "Get next user id Success", service.getNextUserID());
    }

    // get all users
    @GetMapping
    public ResponseUtil getAllUsers() {
        return new ResponseUtil("Ok", "Get all users Success", service.getAllUsers());
    }

    // get image (base64) by name
    @GetMapping("/get_image/{imageName}")
    public String getImage(@PathVariable String imageName) throws IOException {
        return service.getImage(imageName);
    }

    // save user
    @PostMapping
    public ResponseUtil saveUser(@ModelAttribute UserDTO dto, @ModelAttribute LoginDTO loginDTO) {
        service.saveUser(dto);
        loginService.save(loginDTO);
        return new ResponseUtil("Ok", "Save User Success", null);
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

