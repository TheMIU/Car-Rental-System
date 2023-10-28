package lk.ijse.car_rental.controller;

import lk.ijse.car_rental.dto.LoginDTO;
import lk.ijse.car_rental.service.LoginService;
import lk.ijse.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private LoginService service;

    // save
    @PostMapping
    public ResponseUtil save(@ModelAttribute LoginDTO dto) throws Exception {
        service.save(dto);
        return new ResponseUtil("Ok", "Save Success", null);
    }

    // check username and password
    @PostMapping("/check")
    public ResponseUtil checkValidUser(@ModelAttribute LoginDTO dto) {
        System.out.println(dto);
        return new ResponseUtil("Ok", "User valid", service.checkValidUser(dto));
    }

    // get all
    @GetMapping
    public ResponseUtil getAll() {
        return new ResponseUtil("Ok", "Get all Success", service.getAll());
    }

    // update
    @PutMapping
    public ResponseUtil update(@ModelAttribute LoginDTO dto) {
        service.update(dto);
        return new ResponseUtil("Ok", "Update Success", dto);
    }

    // delete
    @DeleteMapping
    public ResponseUtil delete(String loginId) {
        service.delete(loginId);
        return new ResponseUtil("Ok", "Delete Success", loginId);
    }
}
