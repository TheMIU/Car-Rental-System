package lk.ijse.car_rental.service.impl;

import lk.ijse.car_rental.dto.VehicleDTO;
import lk.ijse.car_rental.entity.Vehicle;
import lk.ijse.car_rental.repo.VehicleRepo;
import lk.ijse.car_rental.service.VehicleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@Transactional
public class VehicleServiceImpl implements VehicleService {
    @Autowired
    private VehicleRepo vehicleRepo;

    @Autowired
    private ModelMapper mapper;

    String carImagesFolderPath;

    public VehicleServiceImpl() {
        checkIdUploadFolderCreated();
    }

    @Override
    public void saveVehicle(VehicleDTO dto) {
        vehicleRepo.save(mapper.map(dto, Vehicle.class));
    }

    @Override
    public List<VehicleDTO> getAllVehicles() {
        List<Vehicle> all = vehicleRepo.findAll();
        return mapper.map(all, new TypeToken<ArrayList<VehicleDTO>>() {
        }.getType());
    }

    @Override
    public void updateVehicle(VehicleDTO dto) {
        if (!vehicleRepo.existsById(dto.getVId())) throw new RuntimeException("not exists!");
        System.out.println(mapper.map(dto, Vehicle.class));
        vehicleRepo.save(mapper.map(dto, Vehicle.class));
    }

    @Override
    public void deleteVehicle(String id) {
        vehicleRepo.deleteById(id);
    }

    @Override
    public void uploadImages(MultipartFile frontImage, MultipartFile side1Image, MultipartFile side2Image, MultipartFile backImage, String vId) throws IOException {
        if (frontImage != null)
            frontImage.transferTo(new File(carImagesFolderPath + vId + "_front.jpg"));
        if (side1Image != null)
            side1Image.transferTo(new File(carImagesFolderPath + vId + "_side1.jpg"));
        if (side2Image != null)
            side2Image.transferTo(new File(carImagesFolderPath + vId + "_side2.jpg"));
        if (backImage != null)
            backImage.transferTo(new File(carImagesFolderPath + vId + "_back.jpg"));
    }

    @Override
    public void deleteImages(String vId) {
        new File(carImagesFolderPath + vId + "_front.jpg").delete();
        new File(carImagesFolderPath + vId + "_side1.jpg").delete();
        new File(carImagesFolderPath + vId + "_side2.jpg").delete();
        new File(carImagesFolderPath + vId + "_back.jpg").delete();
    }

    public void checkIdUploadFolderCreated() {
        // get user directory and create folders
        carImagesFolderPath = System.getProperty("user.dir") + File.separator
                + "Car Rental System" + File.separator + "uploads" + File.separator + "carsImages" + File.separator;
        System.out.println("uploadsFolderPath : " + carImagesFolderPath);

        // Create a File object to represent the 'uploads' folder based on the specified path
        File uploadsFolder = new File(carImagesFolderPath);

        // Check if the 'uploads' folder exists
        if (!uploadsFolder.exists()) uploadsFolder.mkdirs();
    }

    @Override
    public String getImage(String imageName) throws IOException {
        Path imagePath = Paths.get(carImagesFolderPath + imageName);

        if (Files.exists(imagePath)) {
            byte[] imageBytes = Files.readAllBytes(imagePath);
            return Base64.getEncoder().encodeToString(imageBytes);
        } else {
            return null;
        }
    }
}
