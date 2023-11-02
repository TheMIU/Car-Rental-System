package lk.ijse.car_rental.service.impl;

import lk.ijse.car_rental.dto.BookingDTO;
import lk.ijse.car_rental.entity.Booking;
import lk.ijse.car_rental.repo.BookingRepo;
import lk.ijse.car_rental.service.BookingService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {
    @Autowired
    private ModelMapper mapper;

    @Autowired
    private BookingRepo bookingRepo;

    @Override
    public List<BookingDTO> getAllBookings() {
        List<Booking> all = bookingRepo.findAll();
        return mapper.map(all, new TypeToken<List<BookingDTO>>() {
        }.getType());
    }

    @Override
    public void approveBooking(String bookId) {
        bookingRepo.approveBooking(bookId);
    }

    @Override
    public String getNextBookId() {
        String lastBookId = bookingRepo.findLastRecord();
        System.out.println("Last : " + lastBookId);

        if (lastBookId == null) {
            return "B1";
        } else {
            String[] lastNum = lastBookId.split("B");
            int lastId = Integer.parseInt(lastNum[1]);
            int newId = lastId + 1;

            System.out.println("New : " + newId);

            return "B" + newId;
        }
    }
}
