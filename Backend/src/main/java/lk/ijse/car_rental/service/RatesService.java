package lk.ijse.car_rental.service;

import lk.ijse.car_rental.dto.RateDTO;
import java.util.List;

public interface RatesService {
    void saveRate(RateDTO dto);

    List<RateDTO> getAllRates();

    void updateRate(RateDTO dto);

    void deleteRate(String id);
}
