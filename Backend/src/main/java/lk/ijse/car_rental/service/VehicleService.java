package lk.ijse.car_rental.service;

import lk.ijse.car_rental.dto.VehicleDTO;

import java.util.List;

public interface VehicleService {
    void saveVehicle(VehicleDTO dto);

    List<VehicleDTO> getAllVehicles();

    void updateVehicle(VehicleDTO dto);

    void deleteVehicle(String id);
}
