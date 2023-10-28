package lk.ijse.car_rental.controller;

import lk.ijse.car_rental.dto.LoginDTO;
import lk.ijse.car_rental.dto.UserDTO;
import lk.ijse.car_rental.service.LoginService;
import lk.ijse.car_rental.service.UserService;
import lk.ijse.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.io.IOException;

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
    public ResponseUtil saveUser(@ModelAttribute UserDTO dto, @ModelAttribute LoginDTO loginDTO) throws Exception {
        boolean b = loginService.save(loginDTO);
        if (b) service.saveUser(dto);
        return new ResponseUtil("Ok", "Save User Success", null);
    }

    // update user
    @PutMapping
    public ResponseUtil updateUser(@RequestBody UserDTO dto) {
        System.out.println(dto);
        service.updateUser(dto);
        return new ResponseUtil("Ok", "Update User Success", dto);
    }

    // delete user
    @DeleteMapping("/{userId}")
    public ResponseUtil deleteUser(@PathVariable String userId) {
        service.deleteUser(userId);
        return new ResponseUtil("Ok", "Delete User Success", userId);
    }

    // toggle editable user
    @PutMapping("/{userId}")
    public ResponseUtil toggleEditable(@PathVariable String userId) {
        service.toggleEditable(userId);
        return new ResponseUtil("Ok", "Changed", null);
    }

    // delete image in server
    @DeleteMapping("delete/{imageName}")
    public ResponseUtil deleteImage(@PathVariable String imageName) {
        System.out.println(imageName);
        service.deleteImage(imageName);
        return new ResponseUtil("Ok", "Delete image done", null);
    }

    // approve user
    @PutMapping("approve/{userId}")
    public ResponseUtil approveUser(@PathVariable String userId) {
        service.approveUser(userId);
        return new ResponseUtil("Ok", userId + " Approved !", null);
    }
}

