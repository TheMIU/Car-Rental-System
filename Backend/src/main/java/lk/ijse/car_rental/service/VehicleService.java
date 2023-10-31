package lk.ijse.car_rental.service;

import lk.ijse.car_rental.dto.VehicleDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface VehicleService {
    void saveVehicle(VehicleDTO dto);

    List<VehicleDTO> getAllVehicles();

    void updateVehicle(VehicleDTO dto);

    void deleteVehicle(String id);

    void uploadImages(MultipartFile frontImage,
                      MultipartFile side1Image,
                      MultipartFile side2Image,
                      MultipartFile backImage,
                      String vId) throws IOException;

    void deleteImages(String id);

    String getImage(String imageName) throws IOException;
}
