package lk.ijse.car_rental.service;

import lk.ijse.car_rental.dto.BookingDTO;
import java.util.List;

public interface BookingService {
    List<BookingDTO> getAllBookings();

    void approveBooking(String bookId);
}
