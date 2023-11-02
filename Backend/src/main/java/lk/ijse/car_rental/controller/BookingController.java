package lk.ijse.car_rental.controller;

import lk.ijse.car_rental.service.BookingService;
import lk.ijse.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/approve/{bookId}")
    public ResponseUtil approveBooking(@PathVariable String bookId){
        System.out.println(bookId);
        bookingService.approveBooking(bookId);
        return new ResponseUtil("Ok", "Success", null);
    }

    @GetMapping("/next")
    public  ResponseUtil getNextBookID(){
        String nextBookId =  bookingService.getNextBookId();
        return new ResponseUtil("Ok", "Success", nextBookId);
    }
}
