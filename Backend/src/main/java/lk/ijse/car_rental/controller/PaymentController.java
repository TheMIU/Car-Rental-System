package lk.ijse.car_rental.controller;
import lk.ijse.car_rental.dto.PaymentDTO;
import lk.ijse.car_rental.service.PaymentService;
import lk.ijse.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pay")
@CrossOrigin
public class PaymentController {
    @Autowired
    PaymentService service;

    // get all
    @GetMapping
    public ResponseUtil getAllPayments() {
        return new ResponseUtil("Ok", "Get all Success", service.getAllPayments());
    }

    // save
    @PostMapping
    public ResponseUtil savePayment(@ModelAttribute PaymentDTO dto) throws Exception {
        service.savePayment(dto);
        return new ResponseUtil("Ok", "Save Success", null);
    }

    // update
    @PutMapping
    public ResponseUtil updatePayment(@RequestBody PaymentDTO dto) {
        System.out.println(dto);
        service.updatePayment(dto);
        return new ResponseUtil("Ok", "Update Success", null);
    }

    // delete
    @DeleteMapping("/{pid}")
    public ResponseUtil deletePayment(@PathVariable String pid) {
        service.deletePayment(pid);
        return new ResponseUtil("Ok", "Delete Success", pid);
    }

}