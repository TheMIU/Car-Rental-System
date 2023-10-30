package lk.ijse.car_rental.repo;

import lk.ijse.car_rental.entity.Rate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatesRepo extends JpaRepository<Rate, String> {
}
