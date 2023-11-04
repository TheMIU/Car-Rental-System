package lk.ijse.car_rental.service;

import lk.ijse.car_rental.dto.BookingDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BookingService {
    List<BookingDTO> getAllBookings();

    void approveBooking(String bookId);

    String getNextBookId();

    void uploadImage(MultipartFile image, String imageName) throws IOException;

    String getImage(String imageName) throws IOException;

    void deleteImages(String imageName);
}


