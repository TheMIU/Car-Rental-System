package lk.ijse.car_rental.controller;

import lk.ijse.car_rental.dto.VehicleDTO;
import lk.ijse.car_rental.service.VehicleService;
import lk.ijse.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/vehicle")
public class VehicleController {
    @Autowired
    private VehicleService service;

    // get all
    @GetMapping
    public ResponseUtil getAllVehicles() {
        return new ResponseUtil("Ok", "Get all Success", service.getAllVehicles());
    }

    // save
    @PostMapping
    public ResponseUtil saveVehicle(@ModelAttribute VehicleDTO dto) throws Exception {
        service.saveVehicle(dto);
        return new ResponseUtil("Ok", "Save Success", null);
    }

    // update
    @PutMapping
    public ResponseUtil updateVehicle(@RequestBody VehicleDTO dto) {
        System.out.println(dto);
        service.updateVehicle(dto);
        return new ResponseUtil("Ok", "Update Success", dto);
    }

    // delete
    @DeleteMapping("/{vId}")
    public ResponseUtil deleteVehicle(@PathVariable String vId) {
        service.deleteVehicle(vId);
        return new ResponseUtil("Ok", "Delete Success", vId);
    }
}

