package lk.ijse.car_rental.repo;

import lk.ijse.car_rental.entity.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingDetailsRepo extends JpaRepository<BookingDetail,String> {
}
