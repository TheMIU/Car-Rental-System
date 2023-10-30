package lk.ijse.car_rental.service.impl;
import lk.ijse.car_rental.dto.VehicleDTO;
import lk.ijse.car_rental.entity.Vehicle;
import lk.ijse.car_rental.repo.VehicleRepo;
import lk.ijse.car_rental.service.VehicleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class VehicleServiceImpl implements VehicleService {
    @Autowired
    private VehicleRepo vehicleRepo;

    @Autowired
    private ModelMapper mapper;

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
        vehicleRepo.save(mapper.map(dto, Vehicle.class));
    }

    @Override
    public void deleteVehicle(String id) {
        vehicleRepo.deleteById(id);
    }
}
