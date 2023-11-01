package lk.ijse.car_rental.controller;

import lk.ijse.car_rental.service.BookingService;
import lk.ijse.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/booking")
@CrossOrigin
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping
    public ResponseUtil getAllOrders() {
        return new ResponseUtil("Ok", "Success", bookingService.getAllBookings());
    }
}
