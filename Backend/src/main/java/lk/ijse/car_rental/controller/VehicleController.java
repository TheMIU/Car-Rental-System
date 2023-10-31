package lk.ijse.car_rental.controller;

import lk.ijse.car_rental.dto.VehicleDTO;
import lk.ijse.car_rental.service.VehicleService;
import lk.ijse.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

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
    public ResponseUtil saveVehicle(@RequestBody VehicleDTO dto) throws Exception {
        service.saveVehicle(dto);
        return new ResponseUtil("Ok", "Save Success", null);
    }

    // update
    @PutMapping
    public ResponseUtil updateVehicle(@RequestBody VehicleDTO dto) {
        System.out.println(dto);
        service.updateVehicle(dto);
        return new ResponseUtil("Ok", "Update Success", null);
    }

    // delete
    @DeleteMapping("/{vId}")
    public ResponseUtil deleteVehicle(@PathVariable String vId) {
        service.deleteVehicle(vId);
        return new ResponseUtil("Ok", "Delete Success", vId);
    }

    // save car images
    @PostMapping("/uploadImg")
    public ResponseUtil uploadImages(@RequestParam("frontImage") MultipartFile frontImage,
                                     @RequestParam("side1Image") MultipartFile side1Image,
                                     @RequestParam("side2Image") MultipartFile side2Image,
                                     @RequestParam("backImage") MultipartFile backImage,
                                     @RequestParam("vId") String vId) throws IOException {
        service.uploadImages(frontImage, side1Image, side2Image, backImage, vId);

        return new ResponseUtil("Ok", "upload images success", null);
    }

    // delete image in server
    @DeleteMapping("deleteImages/{vId}")
    public ResponseUtil deleteImage(@PathVariable String vId) {
        System.out.println(vId);
        service.deleteImages(vId);
        return new ResponseUtil("Ok", "Delete image done", null);
    }

    // get image (base64) by name
    @GetMapping("/get_image/{imageName}")
    public String getImage(@PathVariable String imageName) throws IOException {
        return service.getImage(imageName);
    }
}

