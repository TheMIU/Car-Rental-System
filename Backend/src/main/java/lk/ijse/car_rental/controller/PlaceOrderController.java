package lk.ijse.car_rental.controller;

import lk.ijse.car_rental.dto.BookingDTO;
import lk.ijse.car_rental.service.BookingService;
import lk.ijse.car_rental.service.PlaceOrderService;
import lk.ijse.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/place-order")
@CrossOrigin
public class PlaceOrderController {
    @Autowired
    private PlaceOrderService service;

    @PostMapping
    public ResponseUtil purchaseOrder(@RequestBody BookingDTO dto) {
        System.out.println("BookingDetail : "+dto.getBookingDetail());
        System.out.println("User : "+dto.getUser());
        System.out.println("DTO : "+dto);

        service.placeOrder(dto);
        return new ResponseUtil("Ok", "Success", dto);
    }
}
