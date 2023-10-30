package lk.ijse.car_rental.service.impl;

import lk.ijse.car_rental.dto.RateDTO;
import lk.ijse.car_rental.dto.UserDTO;
import lk.ijse.car_rental.entity.Rate;
import lk.ijse.car_rental.entity.User;
import lk.ijse.car_rental.repo.RatesRepo;
import lk.ijse.car_rental.repo.UserRepo;
import lk.ijse.car_rental.service.RatesService;
import lk.ijse.car_rental.service.UserService;
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
public class RatesServiceImpl implements RatesService {
    @Autowired
    private RatesRepo ratesRepo;

    @Autowired
    private ModelMapper mapper;


    @Override
    public void saveRate(RateDTO dto) {
        ratesRepo.save(mapper.map(dto, Rate.class));
    }

    @Override
    public List<RateDTO> getAllRates() {
        List<Rate> all = ratesRepo.findAll();
        return mapper.map(all, new TypeToken<ArrayList<RateDTO>>() {
        }.getType());
    }

    @Override
    public void updateRate(RateDTO dto) {
        if (!ratesRepo.existsById(dto.getRId())) throw new RuntimeException("not exists!");
        ratesRepo.save(mapper.map(dto, Rate.class));
    }

    @Override
    public void deleteRate(String id) {
        ratesRepo.deleteById(id);
    }
}
