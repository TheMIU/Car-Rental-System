package lk.ijse.car_rental.controller;

import lk.ijse.car_rental.service.BookingService;
import lk.ijse.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
    public ResponseUtil approveBooking(@PathVariable String bookId) {
        System.out.println(bookId);
        bookingService.approveBooking(bookId);
        return new ResponseUtil("Ok", "Success", null);
    }

    @GetMapping("/next")
    public ResponseUtil getNextBookID() {
        String nextBookId = bookingService.getNextBookId();
        return new ResponseUtil("Ok", "Success", nextBookId);
    }

    @PostMapping("/uploadImg")
    public ResponseUtil uploadImage(@RequestParam("image") MultipartFile image, @RequestParam("imageName") String imageName) throws IOException {
        bookingService.uploadImage(image,imageName);
        return new ResponseUtil("Ok", "upload images success", null);
    }

    @DeleteMapping("deleteImages/{slipName}")
    public ResponseUtil deleteImage(@PathVariable String slipName) {
        System.out.println(slipName);
        bookingService.deleteImages(slipName);
        return new ResponseUtil("Ok", "Delete image done", null);
    }

    // get image (base64) by name
    @GetMapping("/get_image/{slipName}")
    public String getImage(@PathVariable String slipName) throws IOException {
        return bookingService.getImage(slipName);
    }
}
