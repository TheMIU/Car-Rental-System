package lk.ijse.car_rental.service.impl;

import lk.ijse.car_rental.dto.BookingDTO;
import lk.ijse.car_rental.entity.Booking;
import lk.ijse.car_rental.repo.BookingRepo;
import lk.ijse.car_rental.service.BookingService;
import lk.ijse.car_rental.service.PlaceOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PlaceOrderServiceImpl implements PlaceOrderService {
    @Autowired
    private ModelMapper mapper;

    @Autowired
    private BookingRepo bookingRepo;

    @Override
    public void placeOrder(BookingDTO dto) {
        System.out.println("BookingDetail : " + dto.getBookingDetails());
        System.out.println("User : " + dto.getUser());
        System.out.println("DTO : " + dto);

        // update booking & booking details tables
        bookingRepo.save(mapper.map(dto, Booking.class));

        // set vehicle not available

    }
}
